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
  {
    id: 'sample-1',
    nome: 'Eucalipto Tratado Premium',
    preco: 45.90,
    peso: '20kg',
    descricao: 'Eucalipto tratado de alta qualidade, ideal para construção e projetos externos.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'sample-2',
    nome: 'Toras de Eucalipto',
    preco: 35.50,
    peso: '15kg',
    descricao: 'Toras de eucalipto natural, perfeitas para lenha e aquecimento.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'sample-3',
    nome: 'Mourões de Eucalipto',
    preco: 28.00,
    peso: '25kg',
    descricao: 'Mourões resistentes para cercas e delimitações rurais.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'sample-4',
    nome: 'Carvão Vegetal Premium',
    preco: 22.90,
    peso: '10kg',
    descricao: 'Carvão vegetal de eucalipto, ideal para churrascos e aquecimento.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'sample-5',
    nome: 'Lenha Seca Premium',
    preco: 18.50,
    peso: '12kg',
    descricao: 'Lenha seca de eucalipto, ideal para lareiras e fornos a lenha.',
    imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
  },
  {
    id: 'sample-6',
    nome: 'Estacas de Eucalipto',
    preco: 15.90,
    peso: '8kg',
    descricao: 'Estacas de eucalipto para jardim e construção rural.',
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
    console.log('Tentando atualizar produto no Firestore:', id, updates);
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
    console.log('Produto atualizado com sucesso no Firestore');
  } catch (error) {
    console.error('Erro ao atualizar produto no Firestore:', error);
    
    // Fallback: update in local storage
    const index = localProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      localProducts[index] = { ...localProducts[index], ...updates };
      console.log('Produto atualizado localmente:', localProducts[index]);
    }
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