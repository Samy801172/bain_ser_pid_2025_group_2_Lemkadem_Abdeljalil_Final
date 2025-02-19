// data/products.constant.ts
import {Product} from '../models/product/product.model';

export const ProductsConstant: Product[] = [
  {
    id_product: 1,
    name: 'Paracétamol 500mg',
    description: 'Antalgique et antipyrétique pour le soulagement des douleurs légères à modérées',
    price: 4.99,
    stock: 100,
    active: true,
    type: {
      id_type: 1,
      name: 'MEDICAMENT',
      description: 'Médicaments sans ordonnance',
      icon: '💊',
      prescription_required: false
    },
    prescription_required: false,
    imageUrls: ['https://images.unsplash.com/photo-1612817288484-6f916006741a'],
    quantity: 1,
    dosage: '500mg',
    manufacturer: 'Laboratoire Pharma',
    form: 'comprimés',
    pack_size: 16,
    reference_code: 'PARA500',
    ingredients: ['Paracétamol'],
    isPromoted: false
  },
  {
    id_product: 2,
    name: 'Ibuprofène 400mg',
    description: 'Anti-inflammatoire non stéroïdien utilisé pour réduire la douleur, la fièvre et inflammation',
    price: 7.99,
    stock: 80,
    active: true,
    type: {
      id_type: 1,
      name: 'MEDICAMENT',
      description: 'Médicaments sans ordonnance',
      icon: '💊',
      prescription_required: false
    },
    prescription_required: false,
    imageUrls: ['https://images.unsplash.com/photo-1632345031435-8727f6897d53'],
    quantity: 1,
    dosage: '400mg',
    manufacturer: 'Laboratoire Pharma',
    form: 'comprimés',
    pack_size: 20,
    reference_code: 'IBU400',
    reimbursement_rate: 65,
    ingredients: ['Ibuprofène'],
    isPromoted: false
  },
  {
    id_product: 3,
    name: 'Antibiotique Amoxicilline 500mg',
    description: 'Antibiotique utilisé pour traiter diverses infections bactériennes',
    price: 15.99,
    stock: 50,
    active: true,
    type: {
      id_type: 2,
      name: 'MEDICAMENT',
      description: 'Médicaments sur ordonnance',
      icon: '💊',
      prescription_required: true
    },
    prescription_required: true,
    imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be'],
    quantity: 1,
    dosage: '500mg',
    manufacturer: 'Laboratoire MedPharma',
    form: 'gélules',
    pack_size: 12,
    reference_code: 'AMOX500',
    reimbursement_rate: 65,
    ingredients: ['Amoxicilline'],
    isPromoted: false
  }
];
