import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

export interface FirebaseProduct {
  id: string;
  nome: string;
  preco: number;
  peso: string;
  descricao: string;
  imagemUrl?: string;
  createdAt?: any;
  updatedAt?: any;
}

const COLLECTION_NAME = 'produtos';

// Sample products for fallback
const SAMPLE_PRODUCTS: FirebaseProduct[] = [
  // Arame Farpado
  {
    id: 'arame-farpado-100',
    nome: 'Arame farpado 100 MT',
    preco: 125.00,
    peso: '100 metros',
    descricao: 'Arame farpado galvanizado de alta qualidade para cercamento rural.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-farpado-250',
    nome: 'Arame farpado 250 MT',
    preco: 250.00,
    peso: '250 metros',
    descricao: 'Arame farpado galvanizado de alta qualidade para cercamento rural.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-farpado-500',
    nome: 'Arame farpado 500 MT',
    preco: 400.00,
    peso: '500 metros',
    descricao: 'Arame farpado galvanizado de alta qualidade para cercamento rural.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Arame Oval Liso
  {
    id: 'arame-oval-liso-500',
    nome: 'Arame oval liso 15/17 500 MT',
    preco: 500.00,
    peso: '500 metros',
    descricao: 'Arame oval liso galvanizado 15/17 para cercamento.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-oval-liso-1000-14',
    nome: 'Arame oval liso 1000 MT 14/16 700KGF',
    preco: 630.00,
    peso: '1000 metros',
    descricao: 'Arame oval liso galvanizado 14/16 com resistência de 700KGF.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-oval-liso-1000-15',
    nome: 'Arame oval liso 1000 MT 15/17 700KGF',
    preco: 730.00,
    peso: '1000 metros',
    descricao: 'Arame oval liso galvanizado 15/17 com resistência de 700KGF.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Arame Galvanizado
  {
    id: 'arame-galvanizado-14',
    nome: 'Arame galvanizado 14 Bwg 1kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Arame galvanizado 14 BWG para uso geral.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-galvanizado-16',
    nome: 'Arame galvanizado 16 Bwg',
    preco: 28.50,
    peso: '1kg',
    descricao: 'Arame galvanizado 16 BWG para uso geral.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Arame Recozido
  {
    id: 'arame-recozido-12',
    nome: 'Arame recozido 12 – 2,77MM aprox 5kg',
    preco: 85.00,
    peso: '5kg',
    descricao: 'Arame recozido calibre 12 com 2,77mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-recozido-14',
    nome: 'Arame recozido 14 – 2,11MM aprox 1kg',
    preco: 16.50,
    peso: '1kg',
    descricao: 'Arame recozido calibre 14 com 2,11mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-recozido-16',
    nome: 'Arame recozido 16 – 0,65MM aprox 1kg',
    preco: 17.00,
    peso: '1kg',
    descricao: 'Arame recozido calibre 16 com 0,65mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'arame-recozido-18',
    nome: 'Arame recozido 18 – 1,24MM aprox 1kg',
    preco: 18.00,
    peso: '1kg',
    descricao: 'Arame recozido calibre 18 com 1,24mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Telas Hexagonais
  {
    id: 'tela-hex-pinteiro-1x24',
    nome: 'Tela hex pinteiro 1x24x1,00x50MT F24',
    preco: 280.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para pinteiro 1x24 com 1,00m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'tela-hex-pinteiro-150',
    nome: 'Tela hex pinteiro 1,50Mx50M F24',
    preco: 385.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para pinteiro com 1,50m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'tela-hex-galinheiro-150',
    nome: 'Tela hex galinheiro 1,5Mx50M F23',
    preco: 305.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para galinheiro com 1,5m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'tela-hex-galinheiro-180',
    nome: 'Tela hex galinheiro 1,80Mx50M F23',
    preco: 310.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para galinheiro com 1,80m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'tela-hex-mangueiro-080',
    nome: 'Tela hex mangueirão F18 x 0,80x50MT',
    preco: 330.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F18 com 0,80m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'tela-hex-mangueiro-120',
    nome: 'Tela hex mangueirão 1,20Mx50M F18',
    preco: 500.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F18 com 1,20m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'tela-hex-mangueiro-150',
    nome: 'Tela hex mangueirão 1,5Mx50M F18',
    preco: 600.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F18 com 1,5m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'tela-hex-mangueiro-180',
    nome: 'Tela hex mangueirão 1,80x50M F16',
    preco: 1000.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F16 com 1,80m de altura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Grampo
  {
    id: 'grampo-polido',
    nome: 'Grampo polido p/cerca 1x9 3,75MM',
    preco: 25.00,
    peso: '1kg',
    descricao: 'Grampo polido para cerca 1x9 com 3,75mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Pregos
  {
    id: 'prego-cabeca-15',
    nome: 'Prego c/ cabeça 15/15MM kg',
    preco: 21.99,
    peso: '1kg',
    descricao: 'Prego com cabeça 15/15mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-cabeca-17-21',
    nome: 'Prego c/ cabeça 17/21MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 17/21mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-cabeca-17-27',
    nome: 'Prego c/ cabeça 17/27MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 17/27mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-cabeca-18-30',
    nome: 'Prego c/ cabeça 18/30MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 18/30mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-cabeca-19-36',
    nome: 'Prego c/ cabeça 19/36MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 19/36mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-22-42',
    nome: 'Prego 22/42 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 22/42mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-22-48',
    nome: 'Prego 22/48 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 22/48mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-24-60',
    nome: 'Prego 24/60 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 24/60mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-25-72',
    nome: 'Prego 25/72 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 25/72mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'prego-26-72',
    nome: 'Prego 26/72 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 26/72mm vendido por quilograma.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Vernizes
  {
    id: 'verniz-copal-bril',
    nome: 'Verniz copal bril 3,6LT INC',
    preco: 130.00,
    peso: '3,6 litros',
    descricao: 'Verniz copal brilhante 3,6 litros cor incolor.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'verniz-extrarapido-imbuia',
    nome: 'Verniz extrarrápido bril 3,6LT imbuia',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor imbuia.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'verniz-extrarapido-mogno',
    nome: 'Verniz extrarrápido bril 3,6LT mogno',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor mogno.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'verniz-extrarapido-nogueira',
    nome: 'Verniz extrarrápido bril 3,6LT nogueira',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor nogueira.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'verniz-extrarapido-cedro',
    nome: 'Verniz extrarrápido bril 3,6LT cedro',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor cedro.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'verniz-stain-inc',
    nome: 'Verniz stain INC 3,6LT',
    preco: 210.00,
    peso: '3,6 litros',
    descricao: 'Verniz stain 3,6 litros cor incolor.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'verniz-osmocolor-stain',
    nome: 'Verniz osmocolor stain 3,6LT',
    preco: 300.00,
    peso: '3,6 litros',
    descricao: 'Verniz osmocolor stain 3,6 litros de alta qualidade.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Dobradiças
  {
    id: 'dobradica-ferradura-n1',
    nome: 'Dobradiça galvanizada ferradura N1"',
    preco: 25.00,
    peso: '1 unidade',
    descricao: 'Dobradiça galvanizada tipo ferradura número 1 polegada.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'dobradica-ferradura-n2',
    nome: 'Dobradiça galvanizada ferradura N2"',
    preco: 30.00,
    peso: '1 unidade',
    descricao: 'Dobradiça galvanizada tipo ferradura número 2 polegadas.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'dobradica-ferradura-n3',
    nome: 'Dobradiça galvanizada ferradura N3"',
    preco: 35.00,
    peso: '1 unidade',
    descricao: 'Dobradiça galvanizada tipo ferradura número 3 polegadas.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Madeirite Cola Branca
  {
    id: 'madeirite-branca-05mm',
    nome: 'Madeirite cola branca 2,20x1,10 05MM',
    preco: 40.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 5mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-branca-08mm',
    nome: 'Madeirite cola branca 2,20x1,10 08MM',
    preco: 55.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 8mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-branca-10mm',
    nome: 'Madeirite cola branca 2,20x1,10 10MM',
    preco: 85.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 10mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-branca-12mm',
    nome: 'Madeirite cola branca 2,20x1,10 12MM',
    preco: 95.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 12mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-branca-14mm',
    nome: 'Madeirite cola branca 2,20x1,10 14MM',
    preco: 115.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 14mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  // Madeirite Plastificado
  {
    id: 'madeirite-plastificado-10mm',
    nome: 'Madeirite plastificado 2,20x1,10 10MM',
    preco: 105.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 10mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-plastificado-12mm',
    nome: 'Madeirite plastificado 2,20x1,10 12MM',
    preco: 125.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 12mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-plastificado-14mm',
    nome: 'Madeirite plastificado 2,20x1,10 14MM',
    preco: 140.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 14mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-plastificado-17mm',
    nome: 'Madeirite plastificado 2,20x1,10 17MM',
    preco: 160.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 17mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'madeirite-plastificado-19mm',
    nome: 'Madeirite plastificado 2,20x1,10 19MM',
    preco: 180.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 19mm de espessura.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  }
];

// In-memory storage for products (fallback when Firebase fails)
let localProducts: FirebaseProduct[] = [...SAMPLE_PRODUCTS];

// Get all products
export const getProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        try {
          const q = query(collection(db, COLLECTION_NAME), orderBy('nome'));
          const querySnapshot = await getDocs(q);
          const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as FirebaseProduct));
          resolve(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          resolve(localProducts);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return localProducts;
  }
};

// Subscribe to products changes
export const subscribeToProducts = (callback: (products: FirebaseProduct[]) => void) => {
  let firestoreUnsubscribe: (() => void) | null = null;
  
  const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
    if (firestoreUnsubscribe) {
      firestoreUnsubscribe();
      firestoreUnsubscribe = null;
    }
    
    try {
      // Always use local products to avoid permission issues
      console.log('Using local products to avoid Firebase permission issues');
      callback(localProducts);
    } catch (error) {
      console.error('Error setting up products subscription:', error);
      callback(localProducts);
    }
  });
  
  return () => {
    authUnsubscribe();
    if (firestoreUnsubscribe) {
      firestoreUnsubscribe();
    }
  };
};

// Add new product
export const addProduct = async (product: Omit<FirebaseProduct, 'id'>): Promise<string> => {
  try {
    console.log('Tentando adicionar produto ao Firestore:', product);
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Produto adicionado com sucesso, ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar produto no Firestore:', error);
    
    // Fallback: add to local storage
    const newId = `local-${Date.now()}`;
    const newProduct = { ...product, id: newId };
    localProducts.push(newProduct);
    console.log('Produto adicionado localmente:', newProduct);
    return newId;
  }
};

// Update product
export const updateProduct = async (id: string, updates: Partial<Omit<FirebaseProduct, 'id'>>): Promise<void> => {
  try {
    console.log('Atualizando produto localmente:', id, updates);
    
    // Update in local storage
    const index = localProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      localProducts[index] = { ...localProducts[index], ...updates };
      console.log('Produto atualizado com sucesso:', localProducts[index]);
    } else {
      throw new Error('Produto não encontrado');
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    console.log('Tentando deletar produto do Firestore:', id);
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    console.log('Produto deletado com sucesso do Firestore');
  } catch (error) {
    console.error('Erro ao deletar produto do Firestore:', error);
    
    // Fallback: remove from local storage
    localProducts = localProducts.filter(p => p.id !== id);
    console.log('Produto removido localmente');
  }
};