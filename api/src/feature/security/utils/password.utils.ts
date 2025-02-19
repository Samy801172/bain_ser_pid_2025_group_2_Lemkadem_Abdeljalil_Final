/**
 * Utilitaires pour la gestion des mots de passe
 */

import * as bcrypt from 'bcrypt';

/**
 * Chiffre un mot de passe en clair
 * @param plaintextPassword - Mot de passe en clair à chiffrer
 * @returns Mot de passe chiffré (hash)
 */
export const encryptPassword = async (plaintextPassword: string): Promise<string> =>
  await bcrypt.hash(plaintextPassword, 10);

/**
 * Compare un mot de passe en clair avec un hash
 * @param plaintextPassword - Mot de passe en clair à vérifier
 * @param hash - Hash du mot de passe stocké
 * @returns true si le mot de passe correspond, false sinon
 */
export const comparePassword = async (plaintextPassword: string, hash: string):
  Promise<boolean> => await bcrypt.compare(plaintextPassword, hash)