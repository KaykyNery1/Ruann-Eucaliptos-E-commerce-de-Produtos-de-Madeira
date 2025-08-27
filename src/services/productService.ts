import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;

// Initialize Supabase client if environment variables are available
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export interface Product {
  id: string;
  nome: string;
  preco: number;
  peso: string;
  descricao: string;
  imagem_url?: string;
  ativo?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Fallback products for when Supabase is not available
const FALLBACK_PRODUCTS: Product[] = [
  // Arame Farpado
  {
    id: 'arame-farpado-100',
    nome: 'Arame farpado 100 MT',
    preco: 125.00,
    peso: '100 metros',
    descricao: 'Arame farpado galvanizado de alta qualidade para cercamento rural.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-farpado-250',
    nome: 'Arame farpado 250 MT',
    preco: 250.00,
    peso: '250 metros',
    descricao: 'Arame farpado galvanizado de alta qualidade para cercamento rural.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-farpado-500',
    nome: 'Arame farpado 500 MT',
    preco: 400.00,
    peso: '500 metros',
    descricao: 'Arame farpado galvanizado de alta qualidade para cercamento rural.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Arame Oval Liso
  {
    id: 'arame-oval-liso-500',
    nome: 'Arame oval liso 15/17 500 MT',
    preco: 500.00,
    peso: '500 metros',
    descricao: 'Arame oval liso galvanizado 15/17 para cercamento.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-oval-liso-1000-14',
    nome: 'Arame oval liso 1000 MT 14/16 700KGF',
    preco: 630.00,
    peso: '1000 metros',
    descricao: 'Arame oval liso galvanizado 14/16 com resistência de 700KGF.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-oval-liso-1000-15',
    nome: 'Arame oval liso 1000 MT 15/17 700KGF',
    preco: 730.00,
    peso: '1000 metros',
    descricao: 'Arame oval liso galvanizado 15/17 com resistência de 700KGF.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Arame Galvanizado
  {
    id: 'arame-galvanizado-14',
    nome: 'Arame galvanizado 14 Bwg 1kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Arame galvanizado 14 BWG para uso geral.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-galvanizado-16',
    nome: 'Arame galvanizado 16 Bwg',
    preco: 28.50,
    peso: '1kg',
    descricao: 'Arame galvanizado 16 BWG para uso geral.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Arame Recozido
  {
    id: 'arame-recozido-12',
    nome: 'Arame recozido 12 – 2,77MM aprox 5kg',
    preco: 85.00,
    peso: '5kg',
    descricao: 'Arame recozido calibre 12 com 2,77mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-recozido-14',
    nome: 'Arame recozido 14 – 2,11MM aprox 1kg',
    preco: 16.50,
    peso: '1kg',
    descricao: 'Arame recozido calibre 14 com 2,11mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-recozido-16',
    nome: 'Arame recozido 16 – 0,65MM aprox 1kg',
    preco: 17.00,
    peso: '1kg',
    descricao: 'Arame recozido calibre 16 com 0,65mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'arame-recozido-18',
    nome: 'Arame recozido 18 – 1,24MM aprox 1kg',
    preco: 18.00,
    peso: '1kg',
    descricao: 'Arame recozido calibre 18 com 1,24mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Telas Hexagonais
  {
    id: 'tela-hex-pinteiro-1x24',
    nome: 'Tela hex pinteiro 1x24x1,00x50MT F24',
    preco: 280.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para pinteiro 1x24 com 1,00m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'tela-hex-pinteiro-150',
    nome: 'Tela hex pinteiro 1,50Mx50M F24',
    preco: 385.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para pinteiro com 1,50m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'tela-hex-galinheiro-150',
    nome: 'Tela hex galinheiro 1,5Mx50M F23',
    preco: 305.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para galinheiro com 1,5m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'tela-hex-galinheiro-180',
    nome: 'Tela hex galinheiro 1,80Mx50M F23',
    preco: 310.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para galinheiro com 1,80m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'tela-hex-mangueiro-080',
    nome: 'Tela hex mangueirão F18 x 0,80x50MT',
    preco: 330.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F18 com 0,80m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'tela-hex-mangueiro-120',
    nome: 'Tela hex mangueirão 1,20Mx50M F18',
    preco: 500.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F18 com 1,20m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'tela-hex-mangueiro-150',
    nome: 'Tela hex mangueirão 1,5Mx50M F18',
    preco: 600.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F18 com 1,5m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'tela-hex-mangueiro-180',
    nome: 'Tela hex mangueirão 1,80x50M F16',
    preco: 1000.00,
    peso: '50 metros',
    descricao: 'Tela hexagonal para mangueirão F16 com 1,80m de altura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Grampo
  {
    id: 'grampo-polido',
    nome: 'Grampo polido p/cerca 1x9 3,75MM',
    preco: 25.00,
    peso: '1kg',
    descricao: 'Grampo polido para cerca 1x9 com 3,75mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Pregos
  {
    id: 'prego-cabeca-15',
    nome: 'Prego c/ cabeça 15/15MM kg',
    preco: 21.99,
    peso: '1kg',
    descricao: 'Prego com cabeça 15/15mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-cabeca-17-21',
    nome: 'Prego c/ cabeça 17/21MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 17/21mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-cabeca-17-27',
    nome: 'Prego c/ cabeça 17/27MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 17/27mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-cabeca-18-30',
    nome: 'Prego c/ cabeça 18/30MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 18/30mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-cabeca-19-36',
    nome: 'Prego c/ cabeça 19/36MM kg',
    preco: 24.00,
    peso: '1kg',
    descricao: 'Prego com cabeça 19/36mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-22-42',
    nome: 'Prego 22/42 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 22/42mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-22-48',
    nome: 'Prego 22/48 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 22/48mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-24-60',
    nome: 'Prego 24/60 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 24/60mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-25-72',
    nome: 'Prego 25/72 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 25/72mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'prego-26-72',
    nome: 'Prego 26/72 kg',
    preco: 30.00,
    peso: '1kg',
    descricao: 'Prego 26/72mm vendido por quilograma.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Vernizes
  {
    id: 'verniz-copal-bril',
    nome: 'Verniz copal bril 3,6LT INC',
    preco: 130.00,
    peso: '3,6 litros',
    descricao: 'Verniz copal brilhante 3,6 litros cor incolor.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'verniz-extrarapido-imbuia',
    nome: 'Verniz extrarrápido bril 3,6LT imbuia',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor imbuia.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'verniz-extrarapido-mogno',
    nome: 'Verniz extrarrápido bril 3,6LT mogno',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor mogno.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'verniz-extrarapido-nogueira',
    nome: 'Verniz extrarrápido bril 3,6LT nogueira',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor nogueira.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'verniz-extrarapido-cedro',
    nome: 'Verniz extrarrápido bril 3,6LT cedro',
    preco: 180.00,
    peso: '3,6 litros',
    descricao: 'Verniz extrarrápido brilhante 3,6 litros cor cedro.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'verniz-stain-inc',
    nome: 'Verniz stain INC 3,6LT',
    preco: 210.00,
    peso: '3,6 litros',
    descricao: 'Verniz stain 3,6 litros cor incolor.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'verniz-osmocolor-stain',
    nome: 'Verniz osmocolor stain 3,6LT',
    preco: 300.00,
    peso: '3,6 litros',
    descricao: 'Verniz osmocolor stain 3,6 litros de alta qualidade.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Dobradiças
  {
    id: 'dobradica-ferradura-n1',
    nome: 'Dobradiça galvanizada ferradura N1"',
    preco: 25.00,
    peso: '1 unidade',
    descricao: 'Dobradiça galvanizada tipo ferradura número 1 polegada.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'dobradica-ferradura-n2',
    nome: 'Dobradiça galvanizada ferradura N2"',
    preco: 30.00,
    peso: '1 unidade',
    descricao: 'Dobradiça galvanizada tipo ferradura número 2 polegadas.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'dobradica-ferradura-n3',
    nome: 'Dobradiça galvanizada ferradura N3"',
    preco: 35.00,
    peso: '1 unidade',
    descricao: 'Dobradiça galvanizada tipo ferradura número 3 polegadas.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Madeirite Cola Branca
  {
    id: 'madeirite-branca-05mm',
    nome: 'Madeirite cola branca 2,20x1,10 05MM',
    preco: 40.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 5mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-branca-08mm',
    nome: 'Madeirite cola branca 2,20x1,10 08MM',
    preco: 55.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 8mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-branca-10mm',
    nome: 'Madeirite cola branca 2,20x1,10 10MM',
    preco: 85.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 10mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-branca-12mm',
    nome: 'Madeirite cola branca 2,20x1,10 12MM',
    preco: 95.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 12mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-branca-14mm',
    nome: 'Madeirite cola branca 2,20x1,10 14MM',
    preco: 115.00,
    peso: '1 chapa',
    descricao: 'Madeirite cola branca 2,20x1,10m com 14mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  // Madeirite Plastificado
  {
    id: 'madeirite-plastificado-10mm',
    nome: 'Madeirite plastificado 2,20x1,10 10MM',
    preco: 105.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 10mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-plastificado-12mm',
    nome: 'Madeirite plastificado 2,20x1,10 12MM',
    preco: 125.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 12mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-plastificado-14mm',
    nome: 'Madeirite plastificado 2,20x1,10 14MM',
    preco: 140.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 14mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-plastificado-17mm',
    nome: 'Madeirite plastificado 2,20x1,10 17MM',
    preco: 160.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 17mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  },
  {
    id: 'madeirite-plastificado-19mm',
    nome: 'Madeirite plastificado 2,20x1,10 19MM',
    preco: 180.00,
    peso: '1 chapa',
    descricao: 'Madeirite plastificado 2,20x1,10m com 19mm de espessura.',
    imagem_url: 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
    ativo: true
  }
];

// Event listeners for real-time updates
const productUpdateListeners: ((products: Product[]) => void)[] = [];

// Notify all listeners when products change
const notifyProductUpdate = (products: Product[]) => {
  productUpdateListeners.forEach(listener => listener(products));
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  if (!supabase) {
    console.log('Supabase not configured, using fallback products');
    return FALLBACK_PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('ativo', true)
      .order('nome');

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return FALLBACK_PRODUCTS;
    }

    return data || FALLBACK_PRODUCTS;
  } catch (error) {
    console.error('Error fetching products:', error);
    return FALLBACK_PRODUCTS;
  }
};

// Subscribe to products changes with real-time updates
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  // Add callback to listeners
  productUpdateListeners.push(callback);

  if (!supabase) {
    console.log('Supabase not configured, using fallback products');
    callback(FALLBACK_PRODUCTS);
    return () => {
      const index = productUpdateListeners.indexOf(callback);
      if (index > -1) {
        productUpdateListeners.splice(index, 1);
      }
    };
  }

  // Initial fetch
  getProducts().then(callback);

  // Set up real-time subscription
  const subscription = supabase
    .channel('products_changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'products' 
      }, 
      async () => {
        // Refetch products when any change occurs
        const products = await getProducts();
        notifyProductUpdate(products);
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    const index = productUpdateListeners.indexOf(callback);
    if (index > -1) {
      productUpdateListeners.splice(index, 1);
    }
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  };
};

// Add new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  if (!supabase) {
    console.log('Supabase not configured, cannot add product');
    throw new Error('Database not configured');
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        ...product,
        imagem_url: product.imagem_url || 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
        ativo: true
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }

    console.log('Product added successfully:', data);
    return data.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id'>>): Promise<void> => {
  if (!supabase) {
    console.log('Supabase not configured, cannot update product');
    throw new Error('Database not configured');
  }

  try {
    const { error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    console.log('Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product (soft delete by setting ativo = false)
export const deleteProduct = async (id: string): Promise<void> => {
  if (!supabase) {
    console.log('Supabase not configured, cannot delete product');
    throw new Error('Database not configured');
  }

  try {
    const { error } = await supabase
      .from('products')
      .update({ ativo: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }

    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Toggle product active status
export const toggleProductStatus = async (id: string, ativo: boolean): Promise<void> => {
  if (!supabase) {
    console.log('Supabase not configured, cannot toggle product status');
    throw new Error('Database not configured');
  }

  try {
    const { error } = await supabase
      .from('products')
      .update({ ativo, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error toggling product status:', error);
      throw error;
    }

    console.log('Product status toggled successfully');
  } catch (error) {
    console.error('Error toggling product status:', error);
    throw error;
  }
};