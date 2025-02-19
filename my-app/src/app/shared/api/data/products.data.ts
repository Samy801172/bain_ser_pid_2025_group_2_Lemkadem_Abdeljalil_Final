// data/products.data.ts
import {Product} from '../../../models/product/product.model';

export const PRODUCTS: Product[] = [
  {
    id_product: 1,
    name: 'Crème hydratante main',
    description: 'Hydratation intense pour des mains douces et protégées. Enrichie en beurre de karité.',
    price: 15.99,
    stock: 50,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1612817288484-6f916006741a'],
    typeId: 2,
    isPromoted: true,
    promotionPrice: 12.99
  },
  {
    id_product: 2,
    name: 'Base protectrice ongles',
    description: 'Protection et soin pour des ongles plus forts. Formule enrichie en calcium.',
    price: 12.99,
    stock: 30,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1632345031435-8727f6897d53'],
    typeId: 2
  },
  {
    id_product: 3,
    name: 'Sérum éclat visage',
    description: 'Pour une peau rayonnante et éclatante. À la vitamine C.',
    price: 29.99,
    stock: 25,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be'],
    typeId: 1,
    isPromoted: true,
    promotionPrice: 24.99
  },
  {
    id_product: 4,
    name: 'Masque hydratant visage',
    description: 'Masque nourrissant BIOpour une peau revitalisée',
    price: 19.99,
    stock: 40,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1596755389378-c31d21fd1273'],
    typeId: 1
  },
  {
    id_product: 5,
    name: 'Huile visage bio',
    description: 'Huile naturelle pour nourrir et protéger votre peau. 100% bio.',
    price: 24.99,
    stock: 35,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19'],
    typeId: 1
  },
  {
    id_product: 6,
    name: 'Crème corps nourrissante',
    description: 'Crème riche et nourrissante pour le corps. À l\'huile d\'argan.',
    price: 22.99,
    stock: 45,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b'],
    typeId: 3
  },
  {
    id_product: 7,
    name: 'Gommage corps exfoliant',
    description: 'Gommage doux pour une peau lisse et douce. Aux particules de bambou.',
    price: 18.99,
    stock: 30,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b'],
    typeId: 3
  },
  {
    id_product: 8,
    name: 'Rouge à lèvres mat',
    description: 'Rouge à lèvres longue tenue. Fini mat.',
    price: 16.99,
    stock: 60,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa'],
    typeId: 4,
    isPromoted: true,
    promotionPrice: 13.99
  },
  {
    id_product: 9,
    name: 'Palette fards à paupières',
    description: 'Palette de 12 couleurs mates et irisées.',
    price: 34.99,
    stock: 25,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796'],
    typeId: 4
  },
  {
    id_product: 10,
    name: 'Eau de parfum Fleur de Printemps',
    description: 'Fragrance florale et fraîche. Notes de jasmin et de rose.',
    price: 49.99,
    stock: 20,
    active: true,
    imageUrls: ['https://images.unsplash.com/photo-1541643600914-78b084683601'],
    typeId: 5
  }
];

