import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TokenService } from './token.service';
import { Credential, RefreshTokenPayload, SignInPayload, SignupPayload, Token } from "@feature/security/data";
import { CredentialDeleteException, SignupException, UserAlreadyExistException, UserNotFoundException } from "@feature/security/security.exception";
import { Builder } from 'builder-pattern';
import { isNil } from 'lodash';
import { ulid } from 'ulid';
import { comparePassword, encryptPassword } from '../utils';
import { Client } from 'model/Client/client.entity'
import { GOOGLE_CONFIG } from '../config/google.config';
import axios from 'axios';
import { GoogleUser } from '../data/interface/google-user.interface';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);

  constructor(
    @InjectRepository(Credential)
    private readonly repository: Repository<Credential>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly tokenService: TokenService,
  ) {}

  // Part detail
  async detail(id: string): Promise<Credential> {
    const result: Credential = await this.repository.findOne({ where: { credential_id: id } });

    if (!isNil(result)) {
      return result;
    }
    throw new UserNotFoundException();
  }

  // Part signIn
  async signIn(payload: SignInPayload, isAdmin: boolean): Promise<Token> {
    try {
      this.logger.debug('Début de signIn avec payload:', {
        email: payload.mail,
        isAdmin
      });

      // Recherche de l'utilisateur
      const credential = await this.repository.findOneBy({ mail: payload.mail });
      
      if (!credential) {
        this.logger.debug('Utilisateur non trouvé:', payload.mail);
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      // Vérification du mot de passe
      const isValid = await comparePassword(payload.password, credential.password);
      if (!isValid) {
        this.logger.debug('Mot de passe invalide pour:', payload.mail);
        throw new UnauthorizedException('Mot de passe incorrect');
      }

      this.logger.debug('Authentification réussie pour:', payload.mail);

      // Vérification admin si nécessaire
      if (isAdmin && !credential.isAdmin) {
        this.logger.debug('Tentative d\'accès admin non autorisée pour:', payload.mail);
        throw new UnauthorizedException('Accès réservé aux administrateurs');
      }

      // Recherche du client associé
      const client = !credential.isAdmin ? 
        await this.clientRepository.findOne({
          where: { credentialId: credential.credential_id }
        }) : null;

      this.logger.debug('Client trouvé:', client);

      // Génération du token
      const token = await this.tokenService.getTokens(credential);
      
      return {
        ...token,
        clientId: client?.clientId,
        isAdmin: credential.isAdmin
      };
    } catch (error) {
      this.logger.error('Erreur dans signIn:', {
        error: error.message,
        stack: error.stack,
        email: payload.mail
      });
      throw error;
    }
  }

  // Ajout d'une méthode de validation des identifiants
  private async validateCredentials(
    email: string,
    password: string,
    isAdmin: boolean
  ): Promise<Credential> {
    const user = await this.repository.findOneBy({ mail: email });

    if (!user || user.isAdmin !== isAdmin || !(await comparePassword(password, user.password))) {
      throw new UserNotFoundException('Identifiants invalides');
    }

    if (!user.active) {
      throw new UserNotFoundException('Compte désactivé');
    }

    return user;
  }

  async checkUserRole(userId: string, requiredRole: 'admin' | 'client'): Promise<boolean> {
    try {
      const user = await this.detail(userId);
      return requiredRole === 'admin' ? user.isAdmin : !user.isAdmin;
    } catch (error) {
      this.logger.error(`Error checking user role:`, error);
      return false;
    }
  }

  async signup(payload: SignupPayload, isAdmin: boolean = false): Promise<Credential> {
    try {
      // Créer l'objet Credential
      const credential = Builder<Credential>()
        .credential_id(ulid())
        .username(payload.username)
        .password(await encryptPassword(payload.password))
        .mail(payload.mail)
        .isAdmin(isAdmin)
        .active(true)
        .build();

      // Sauvegarder l'objet Credential
      const savedCredential = await this.repository.save(credential);

      // Créer le client si ce n'est pas un admin
      if (!isAdmin) {
        const client = this.clientRepository.create({
          firstName: payload.username,
          lastName: '',
          address: '',
          credential: savedCredential as DeepPartial<Credential>, // Utiliser DeepPartial<Credential>
        });

        await this.clientRepository.save(client);
      }

      return savedCredential;
    } catch (error) {
      if (error instanceof UserAlreadyExistException) {
        throw error; // Relancer l'exception si c'est une UserAlreadyExistException
      }
      this.logger.error(`Error during signup: ${error.message}`);
      throw new SignupException('Erreur lors de la création du compte');
    }
  }

  // Part refresh
  async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
    return this.tokenService.refresh(payload);
  }

  // Part Delete
  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);
      await this.tokenService.deleteFor(detail);
      await this.repository.remove(detail);
    } catch (e) {
      throw new CredentialDeleteException();
    }
  }
  // **Trouver un utilisateur par email**
  async findByEmail(email: string): Promise<Credential | null> {
    return this.repository.findOneBy({ mail: email });
  }

  async googleSignIn(googleData: {
    googleId: string;
    email: string;
    name: string;
  }): Promise<Token> {
    try {
      // Chercher un utilisateur existant avec cet email Google
      let credential = await this.repository.findOne({
        where: [
          { googleEmail: googleData.email },
          { mail: googleData.email }
        ]
      });

      if (!credential) {
        // Créer un nouveau compte si l'utilisateur n'existe pas
        credential = this.repository.create({
          credential_id: ulid(),
          username: googleData.name,
          mail: googleData.email,
          googleId: googleData.googleId,
          googleEmail: googleData.email,
          isGoogleAccount: true,
          active: true
        });
        await this.repository.save(credential);

        // Créer un client associé
        const client = this.clientRepository.create({
          firstName: googleData.name,
          lastName: '',
          address: '',
          credential: credential
        });
        await this.clientRepository.save(client);
      }

      // Générer et retourner le token
      return this.tokenService.getTokens(credential);
    } catch (error) {
      this.logger.error('Google SignIn error:', error);
      throw new UnauthorizedException('Erreur lors de la connexion Google');
    }
  }

  /**
   * Gère le callback de l'authentification Google
   * @param code Code d'autorisation Google
   */
  async handleGoogleCallback(code: string): Promise<Token> {
    try {
      this.logger.debug('Début handleGoogleCallback avec code:', code);

      if (!code) {
        this.logger.error('Code Google manquant');
        throw new UnauthorizedException('Code Google manquant');
      }

      this.logger.debug('Récupération des tokens Google...');
      const googleTokens = await this.getGoogleTokens(code);
      this.logger.debug('Tokens Google reçus:', googleTokens);
      
      if (!googleTokens.id_token || !googleTokens.access_token) {
        this.logger.error('Tokens Google invalides:', googleTokens);
        throw new UnauthorizedException('Tokens Google invalides');
      }

      this.logger.debug('Récupération des informations utilisateur...');
      const googleUser = await this.getGoogleUser(googleTokens.id_token, googleTokens.access_token);
      this.logger.debug('Informations Google reçues:', googleUser);

      this.logger.debug('Création/Mise à jour utilisateur...');
      let credential = await this.repository.findOne({
        where: [
          { googleEmail: googleUser.email },
          { mail: googleUser.email }
        ],
        relations: ['client']
      });

      if (credential) {
        // Mise à jour des infos Google
        credential.googleId = googleUser.id;
        credential.googleEmail = googleUser.email;
        credential.isGoogleAccount = true;
        await this.repository.save(credential);

        // Créer le client s'il n'existe pas
        if (!credential.client) {
          const client = await this.clientRepository.save({
            firstName: googleUser.firstName,
            lastName: googleUser.lastName || '',
            email: googleUser.email,
            address: '',
            phone: '',
            active: true,
            credential: credential
          });
          credential.client = client;
        }
      } else {
        // Créer un nouveau credential et client
        credential = await this.repository.save({
          credential_id: ulid(),
          username: googleUser.firstName,
          mail: googleUser.email,
          googleId: googleUser.id,
          googleEmail: googleUser.email,
          isGoogleAccount: true,
          active: true
        });

        const client = await this.clientRepository.save({
          firstName: googleUser.firstName,
          lastName: googleUser.lastName || '',
          email: googleUser.email,
          address: '',
          phone: '',
          active: true,
          credential: credential
        });
        credential.client = client;
      }

      // Génération des tokens JWT
      const authTokens = await this.tokenService.getTokens(credential);
      
      return {
        ...authTokens,
        credential,
        clientId: credential.client?.clientId,
        isAdmin: credential.isAdmin
      };
    } catch (error) {
      this.logger.error('Erreur handleGoogleCallback:', error);
      throw error;
    }
  }

  /**
   * Récupère les tokens Google en échangeant le code d'autorisation
   */
  private async getGoogleTokens(code: string) {
    try {
      const url = 'https://oauth2.googleapis.com/token';
      const params = {
        code,
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        redirect_uri: GOOGLE_CONFIG.callbackURL,
        grant_type: 'authorization_code'
      };

      this.logger.debug('Appel getGoogleTokens avec params:', params);
      const response = await axios.post(url, null, { params });
      this.logger.debug('Réponse getGoogleTokens:', response.data);
      return response.data;
    } catch (error) {
      this.logger.error('Erreur getGoogleTokens:', {
        message: error.message,
        response: error.response?.data
      });
      throw error;
    }
  }

  /**
   * Récupère les informations de l'utilisateur Google
   */
  private async getGoogleUser(idToken: string, accessToken: string): Promise<GoogleUser> {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      }
    );

    const { id, email, given_name, family_name, picture } = response.data;
    return {
      id,
      email,
      firstName: given_name,
      lastName: family_name,
      picture,
      accessToken
    };
  }
}
