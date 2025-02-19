// data/types.data.ts
import { Type } from '../../../models/type/type.model';

export const TYPES: Type[] = [
  {
    id_type: 1,
    name: 'Médicaments sans ordonnance',
    description: 'Médicaments disponibles en vente libre',
    icon: 'medication',
    prescription_required: false
  },
  {
    id_type: 2,
    name: 'Médicaments sur ordonnance',
    description: 'Médicaments nécessitant une prescription médicale',
    icon: 'description',
    prescription_required: true
  },
  {
    id_type: 3,
    name: 'Matériel médical',
    description: 'Équipements et fournitures médicales',
    icon: 'medical_services',
    prescription_required: false
  },
  {
    id_type: 4,
    name: 'Compléments alimentaires',
    description: 'Vitamines, minéraux et suppléments nutritionnels',
    icon: 'vitamin',
    prescription_required: false
  },
  {
    id_type: 5,
    name: 'Hygiène et soins',
    description: 'Produits d\'hygiène et de soins quotidiens',
    icon: 'sanitizer',
    prescription_required: false
  },
  {
    id_type: 6,
    name: 'Premiers secours',
    description: 'Matériel de premiers soins et pansements',
    icon: 'healing',
    prescription_required: false
  },
  {
    id_type: 7,
    name: 'Préparations magistrales',
    description: 'Médicaments préparés sur mesure',
    icon: 'science',
    prescription_required: true
  },
  {
    id_type: 8,
    name: 'Orthopédie',
    description: 'Supports, attelles et matériel orthopédique',
    icon: 'accessibility_new',
    prescription_required: false
  },
  {
    id_type: 9,
    name: 'Maternité et bébé',
    description: 'Produits pour les jeunes mamans et les bébés',
    icon: 'child_care',
    prescription_required: false
  },
  {
    id_type: 10,
    name: 'Maintien à domicile',
    description: 'Équipements pour le soin à domicile',
    icon: 'home',
    prescription_required: false
  }
];
