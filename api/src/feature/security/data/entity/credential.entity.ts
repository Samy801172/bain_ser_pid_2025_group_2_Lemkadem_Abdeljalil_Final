import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { ulid } from 'ulid';
import { Client } from 'model/Client/client.entity';

@Entity()
export class Credential {
  @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
  credential_id: string;
  @Column({nullable: false, unique: true})
  username: string;
  @Column({nullable: true})
  password: string;
  @Column({nullable: false, unique: true})
  mail: string;
  @Column({nullable: true, unique: false})
  facebookHash: string;
  @Column({nullable: true, unique: false})
  googleHash: string;
  @Column({default:true})
  isAdmin:boolean;
  @Column({default: true})
  active: boolean;
  @CreateDateColumn()
  created: Date;
  @UpdateDateColumn()
  updated: Date;
  @Column({ nullable: true })
  googleId: string;
  @Column({ nullable: true })
  googleEmail: string;
  @Column({ default: false })
  isGoogleAccount: boolean;
  @OneToOne(() => Client, client => client.credential)
  client: Client;
}
