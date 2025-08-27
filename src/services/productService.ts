import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface FirebaseProduct {
  id: string;
  nome: string;
  preco: number;
  peso: string;
  descricao: string;
  createdAt?: any;
  updatedAt?: any;
}

const COLLECTION_NAME = 'produtos';

// Get all products
export const getProducts = async (): Promise<FirebaseProduct[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('nome'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseProduct));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Subscribe to products changes
export const subscribeToProducts = (callback: (products: FirebaseProduct[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('nome'));
  return onSnapshot(q, (querySnapshot) => {
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseProduct));
    callback(products);
  });
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