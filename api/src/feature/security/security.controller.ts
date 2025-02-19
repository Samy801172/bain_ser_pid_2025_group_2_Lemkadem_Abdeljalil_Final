import { Body, Controller, Delete, Get, Logger, Param, Post, UseGuards, UnauthorizedException, Query, Headers, UseInterceptors, Response, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { SecurityService } from "./service";
import { Credential, RefreshTokenPayload, SignInPayload, SignupPayload, Token } from './data';
import { Public, User } from "@common/config";
import { JwtGuard } from '@feature/security/guard';
import { ConflictException } from "@nestjs/common";
import { GOOGLE_CONFIG } from './config/google.config';
import { GoogleAuthGuard } from '@feature/security/guard/google-auth.guard';
import { GoogleAuthInterceptor } from '@feature/security/interceptor/google-auth.interceptor';
import { Response as ExpressResponse } from 'express';

// Interface pour la réponse de la vérification d'email
interface CheckEmailResponse {
  exists: boolean;
}

@ApiBearerAuth('access-token') // Spécifie que l'API utilise le jeton d'accès (Bearer token)
@ApiTags('Account') // Définit la catégorie "Account" pour Swagger
@Controller('account') // Remettre à 'account' au lieu de 'auth'
export class SecurityController {

  private readonly logger = new Logger(SecurityController.name); // Création d'un logger spécifique à ce contrôleur
  constructor(private readonly service: SecurityService) {} // Injection du service de sécurité

  /**
   * Route de connexion standard
   */
  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  public async signIn(@Body() payload: SignInPayload): Promise<Token> {
    try {
      this.logger.debug('Tentative de connexion pour:', payload.mail);
      const token = await this.service.signIn(payload, false);
      this.logger.debug('Connexion réussie pour:', payload.mail);
      return token;
    } catch (error) {
      this.logger.error('Erreur de connexion:', error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Identifiants invalides');
      }
      throw error;
    }
  }

  // Route pour la connexion d'un administrateur (public)
  @Public()
  @Post('admin-signin') 
  @ApiOperation({ summary: 'Connexion administrateur' }) // Opération de connexion administrateur
  @ApiResponse({ status: 201, description: 'Administrateur connecté avec succès' }) // Réponse en cas de succès
  @ApiResponse({ status: 401, description: 'Identifiants invalides' }) // Réponse en cas d'identifiants invalides
  public async adminSignIn(@Body() payload: SignInPayload): Promise<Token> {
    try {
      this.logger.debug('AdminSignIn payload:', payload); // Journalisation du payload
      // Vérifier si l'utilisateur est un administrateur
      const credential = await this.service.findByEmail(payload.mail);
      if (!credential?.isAdmin) {
        throw new UnauthorizedException('Accès réservé aux administrateurs'); // Si ce n'est pas un admin, erreur
      }
      
      const token = await this.service.signIn(payload, true); // Connexion pour l'admin
      this.logger.debug('AdminSignIn successful:', token); // Journalisation du succès
      return token; // Retourne le token généré
    } catch (error) {
      this.logger.error('AdminSignIn error:', error); // Journalisation des erreurs
      throw error; // Propagation de l'erreur
    }
  }

  // Route pour l'inscription d'un utilisateur (public)
  @Public()
  @Post('signup') 
  @ApiOperation({ summary: 'Inscription utilisateur' }) // Opération d'inscription utilisateur
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' }) // Réponse en cas de succès
  @ApiResponse({ status: 409, description: 'User already exists.' }) // Réponse en cas de conflit (utilisateur déjà existant)
  public async signUp(@Body() payload: SignupPayload): Promise<Credential> {
    this.logger.debug(`SignUp payload: ${JSON.stringify(payload)}`); // Journalisation du payload
    try {
      const credential = await this.service.signup(payload, false); // Tentative d'inscription
      if (!credential) {
        throw new ConflictException('Erreur lors de l\'inscription. Utilisateur déjà existant.'); // Gestion du cas d'utilisateur existant
      }
      this.logger.debug(`SignUp successful: ${JSON.stringify(credential)}`); // Journalisation de l'inscription réussie
      return credential; // Retourne les informations du credential
    } catch (error) {
      this.logger.error(`SignUp error: ${error.message}`); // Journalisation des erreurs
      throw error; // Propagation de l'erreur
    }
  }

  // Route pour l'inscription d'un administrateur (public)
  @Public()
  @Post('admin-signup') 
  @ApiOperation({ summary: 'Inscription administrateur' }) // Opération d'inscription administrateur
  @ApiResponse({ status: 201, description: 'Administrateur créé avec succès' }) // Réponse en cas de succès
  @ApiResponse({ status: 409, description: 'User already exists.' }) // Réponse en cas de conflit
  public async adminSignUp(@Body() payload: SignupPayload): Promise<Credential> {
    return this.service.signup(payload, true); // Appel du service pour inscrire un administrateur
  }

  // Route pour rafraîchir le token (public)
  @Public()
  @Post('refresh') 
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.', type: Token }) // Réponse en cas de succès
  public refresh(@Body() payload: RefreshTokenPayload): Promise<Token> {
    return this.service.refresh(payload); // Appel du service pour rafraîchir le token
  }

  // Route protégée pour obtenir les informations de l'utilisateur
  @Get('me') 
  @ApiResponse({ status: 200, description: 'User details.', type: Credential }) // Réponse avec les détails de l'utilisateur
  public me(@User() user: Credential): Credential {
    return user; // Retourne les informations de l'utilisateur connecté
  }

  // Route protégée pour supprimer un utilisateur
  @UseGuards(JwtGuard) // Protection de la route avec JwtGuard
  @Delete('delete/:id') 
  @ApiResponse({ status: 200, description: 'User deleted successfully.' }) // Réponse en cas de succès
  @ApiResponse({ status: 404, description: 'User not found.' }) // Réponse en cas d'utilisateur introuvable
  public delete(@Param('id') credential_id: string): Promise<void> {
    return this.service.delete(credential_id); // Appel du service pour supprimer l'utilisateur
  }

  // Route publique pour vérifier si un email est déjà utilisé
  @Public()
  @Get('check-email/:email')  // Changé de POST à GET pour récupérer une ressource
  @ApiResponse({ status: 200, description: 'Check if user exists' }) // Réponse indiquant si l'email est déjà utilisé
  public async checkEmail(@Param('email') email: string): Promise<{ exists: boolean }> {
    try {
      const user = await this.service.findByEmail(email); // Vérification si l'email existe dans la base
      return { exists: !!user }; // Retourne true si l'utilisateur existe, sinon false
    } catch (error) {
      this.logger.error(`CheckEmail error: ${error.message}`); // Journalisation des erreurs
      throw error; // Propagation de l'erreur
    }
  }

  @Public()
  @Post('google-signin')
  @ApiOperation({ summary: 'Connexion avec Google' })
  async googleSignIn(@Body() googleData: {
    googleId: string;
    email: string;
    name: string;
  }): Promise<Token> {
    return this.service.googleSignIn(googleData);
  }

  /**
   * Route pour obtenir l'URL de connexion Google
   */
  @Public()
  @Get('google/url')
  @ApiOperation({ summary: 'Obtenir l\'URL de connexion Google' })
  getGoogleAuthURL(): { url: string } {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: GOOGLE_CONFIG.callbackURL,
      client_id: GOOGLE_CONFIG.clientId,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' '),
      app_name: GOOGLE_CONFIG.appName
    };
    
    this.logger.debug('URL Google générée:', `${rootUrl}?${new URLSearchParams(options)}`);
    return { url: `${rootUrl}?${new URLSearchParams(options)}` };
  }

  @Public()
  @Get('google/callback')
  @ApiOperation({ summary: 'Callback Google' })
  async handleGoogleCallback(
    @Query('code') code: string,
    @Res() response: ExpressResponse
  ): Promise<void> {
    try {
      this.logger.debug('Code reçu:', code);
      const token = await this.service.handleGoogleCallback(code);
      this.logger.debug('Token généré:', token);

      // Redirection vers le frontend avec TOUTES les informations nécessaires
      const redirectUrl = new URL('/auth/callback', GOOGLE_CONFIG.frontendURL);
      redirectUrl.searchParams.append('token', token.token);
      redirectUrl.searchParams.append('refreshToken', token.refreshToken);
      redirectUrl.searchParams.append('clientId', token.clientId?.toString() || '');
      redirectUrl.searchParams.append('credentialId', token.credential.credential_id);
      redirectUrl.searchParams.append('isAdmin', token.credential.isAdmin.toString());
      redirectUrl.searchParams.append('email', token.credential.mail);
      
      this.logger.debug('Redirection vers:', redirectUrl.toString());
      response.redirect(redirectUrl.toString());
    } catch (error) {
      this.logger.error('Erreur callback Google:', error);
      response.redirect(`${GOOGLE_CONFIG.frontendURL}/login?error=auth_failed`);
    }
  }
}
