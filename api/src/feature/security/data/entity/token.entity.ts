import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, ManyToOne } from 'typeorm';
import { ulid } from 'ulid';
import { Credential } from "@feature/security/data";

@Entity('token')  // Nom explicite de la table
export class Token {
  @PrimaryColumn('varchar', { length: 26 })
  token_id: string = ulid();

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  refreshToken: string;

  @OneToOne(() => Credential, { eager: true })
  @JoinColumn({ name: 'credential_id' })
  credential: Credential;

  @Column({ name: 'credential_id' })
  credentialId: string;

  @Column({ nullable: true }) // Ajoutez l'option nullable si ce champ n'est pas obligatoire
  clientId?: number;

  @Column({ default: false })  // Ajout de la colonne isAdmin
  isAdmin: boolean;
}
