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

// Get all products
export const getProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    // Wait for auth state to be determined
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
          // Return empty array if permission denied
          if (error.code === 'permission-denied') {
            resolve([]);
          } else {
            reject(error);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array if permission denied
    if (error.code === 'permission-denied') {
      return [];
    }
    throw error;
  }
};

// Subscribe to products changes
export const subscribeToProducts = (callback: (products: FirebaseProduct[]) => void) => {
  // For now, return some sample products to test the interface
  const sampleProducts: FirebaseProduct[] = [
    {
      id: '1',
      nome: 'Eucalipto Tratado Premium',
      preco: 45.90,
      peso: '20kg',
      descricao: 'Eucalipto tratado de alta qualidade, ideal para construção e projetos externos.',
      imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
    },
    {
      id: '2',
      nome: 'Toras de Eucalipto',
      preco: 35.50,
      peso: '15kg',
      descricao: 'Toras de eucalipto natural, perfeitas para lenha e aquecimento.',
      imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
    },
    {
      id: '3',
      nome: 'Mourões de Eucalipto',
      preco: 28.00,
      peso: '25kg',
      descricao: 'Mourões resistentes para cercas e delimitações rurais.',
      imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
    },
    {
      id: '4',
      nome: 'Carvão Vegetal Premium',
      preco: 22.90,
      peso: '10kg',
      descricao: 'Carvão vegetal de eucalipto, ideal para churrascos e aquecimento.',
      imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
    },
    {
      id: '5',
      nome: 'Lenha Seca Premium',
      preco: 18.50,
      peso: '12kg',
      descricao: 'Lenha seca de eucalipto, ideal para lareiras e fornos a lenha.',
      imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
    },
    {
      id: '6',
      nome: 'Estacas de Eucalipto',
      preco: 15.90,
      peso: '8kg',
      descricao: 'Estacas de eucalipto para jardim e construção rural.',
      imagemUrl: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp'
    }
  ];

  // Call callback immediately with sample data
  callback(sampleProducts);

  // Return empty unsubscribe function
  return () => {};
};

// Add new product
export const addProduct = async (product: Omit<FirebaseProduct, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, updates: Partial<Omit<FirebaseProduct, 'id'>>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};