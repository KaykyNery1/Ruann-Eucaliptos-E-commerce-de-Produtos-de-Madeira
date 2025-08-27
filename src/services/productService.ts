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
  let firestoreUnsubscribe: (() => void) | null = null;
  
  // Wait for auth state to be determined
  const authUnsubscribe = onAuthStateChanged(auth, (user) => {
    // Clean up previous Firestore subscription if it exists
    if (firestoreUnsubscribe) {
      firestoreUnsubscribe();
    }
    
    const q = query(collection(db, COLLECTION_NAME), orderBy('nome'));
    firestoreUnsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as FirebaseProduct));
        callback(products);
      },
      (error) => {
        console.error('Error in products subscription:', error);
        // Return empty array if permission denied
        if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
          callback([]);
        } else {
          // For other errors, still call callback with empty array to prevent crashes
          callback([]);
        }
      }
    );
  });
  
  // Return a function that unsubscribes from both auth and firestore
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