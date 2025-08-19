import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

const products: Product[] = [
  // Madeira
  {
    id: 1,
    name: "TÁBUA DE PINUS 2x30",
    price: 10.33,
    image: "https://dcdn-us.mitiendanube.com/stores/001/205/048/products/tabua-pinus-30cm-x-3mts-loja-fisica-madeira-88d72d69df1a22137717107038361352-1024-1024.jpeg",
    category: "madeira",
    description: "Tábua de pinus 2x30 - preço por metro",
    rating: 4.8
  },
  {
    id: 2,
    name: "SARRAFO DE PINUS",
    price: 1.99,
    image: "https://ilhabela.tudoem.com.br/assets/img/anuncio/sarrafo_de_pinus_10cm_2.webp",
    category: "madeira",
    description: "Sarrafo de pinus - preço por metro",
    rating: 4.7
  },
  {
    id: 3,
    name: "TABUA 02/15 3 MT",
    price: 16.50,
    image: "https://cesconstrucao.com.br/media/catalog/product/i/m/image_2786.jpg",
    category: "madeira",
    description: "Tábua 02/15 com 3 metros de comprimento",
    rating: 4.6
  },
  {
    id: 4,
    name: "TABUA 02/10 3 MT",
    price: 12.00,
    image: "https://cesconstrucao.com.br/media/catalog/product/i/m/image_2786.jpg",
    category: "madeira",
    description: "Tábua 02/10 com 3 metros de comprimento",
    rating: 4.5
  },
  {
    id: 5,
    name: "TABUA 02/25 3MTS",
    price: 27.00,
    image: "https://cesconstrucao.com.br/media/catalog/product/i/m/image_2786.jpg",
    category: "madeira",
    description: "Tábua 02/25 com 3 metros de comprimento",
    rating: 4.7
  },
  {
    id: 6,
    name: "TABUA 02/30 3MT",
    price: 31.00,
    image: "https://cesconstrucao.com.br/media/catalog/product/i/m/image_2786.jpg",
    category: "madeira",
    description: "Tábua 02/30 com 3 metros de comprimento",
    rating: 4.8
  },
  // Madeirite
  {
    id: 7,
    name: "Maderite plastificado",
    price: 117.90,
    image: "https://tijolodefabricape.meucatalogofacil.com/_core/_uploads//2023/07/0024190723348ejk6dbe.jpg",
    category: "madeirite",
    description: "Madeirite plastificado de alta qualidade",
    rating: 4.9
  },
  // Telhas
  {
    id: 8,
    name: "TELHA ECOLOGICA INOVA RECYCLE UN",
    price: 99.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTACMjh5GoFOT_k6LJsrGTOYvA4uf-Tx1vjrw&s",
    category: "telhas",
    description: "Telha ecológica Inova Recycle - unidade",
    rating: 4.6
  },
  // Verniz
  {
    id: 9,
    name: "VERNIZ CETOL DECK ULTRA PROTEOR 3,6LT",
    price: 449.99,
    image: "data:image/jpeg;base64,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",
    category: "verniz",
    description: "Verniz Cetol Deck Ultra Protetor 3,6 litros",
    rating: 4.9
  },
  {
    id: 10,
    name: "VERNIZ OSMOCOLOR STAIN 3,6LT",
    price: 299.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "verniz",
    description: "Verniz Osmocolor Stain 3,6 litros",
    rating: 4.8
  },
  {
    id: 11,
    name: "VERNIZ EXTRA RAPIDO BRIL 900ML",
    price: 34.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "verniz",
    description: "Verniz extra rápido brilhante 900ml",
    rating: 4.5
  },
  {
    id: 12,
    name: "VERNIZ EXTRA RAPIDO BRIL 3,6LT",
    price: 114.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "verniz",
    description: "Verniz extra rápido brilhante 3,6 litros",
    rating: 4.7
  },
  {
    id: 13,
    name: "VERNIZ STAIN INC 900ML",
    price: 44.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "verniz",
    description: "Verniz Stain incolor 900ml",
    rating: 4.6
  },
  {
    id: 14,
    name: "VERNIZ STAIN INC 3,6LT",
    price: 159.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "verniz",
    description: "Verniz Stain incolor 3,6 litros",
    rating: 4.8
  },
  // Ferramentas
  {
    id: 15,
    name: "CAVADEIRA ART 1,45MT C/CABO",
    price: 94.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferramentas",
    description: "Cavadeira articulada 1,45m com cabo",
    rating: 4.7
  },
  {
    id: 16,
    name: "CAVADEIRA ART 1,20MT C/CABO",
    price: 74.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferramentas",
    description: "Cavadeira articulada 1,20m com cabo",
    rating: 4.6
  },
  // Arames
  {
    id: 17,
    name: "ARAME RECONZIDO 12.2.77 MM APROX. 5KG",
    price: 84.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "arames",
    description: "Arame recozido 12 - 2.77mm aproximadamente 5kg",
    rating: 4.5
  },
  {
    id: 18,
    name: "ARAME RECONZIDO 14.2.11 MM 1KG",
    price: 15.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "arames",
    description: "Arame recozido 14 - 2.11mm - 1kg",
    rating: 4.4
  },
  {
    id: 19,
    name: "ARAME RECONZIDO 18.1.24 MM 1KG",
    price: 17.49,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "arames",
    description: "Arame recozido 18 - 1.24mm - 1kg",
    rating: 4.3
  },
  {
    id: 20,
    name: "ARAME RECONZIDO 16.1.65 MM 1KG",
    price: 16.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "arames",
    description: "Arame recozido 16 - 1.65mm - 1kg",
    rating: 4.4
  },
  {
    id: 21,
    name: "CHAVE P/ESTICADOR TP BOBS 1X1 UN",
    price: 9.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferramentas",
    description: "Chave para esticador tipo bobs 1x1 - unidade",
    rating: 4.2
  },
  {
    id: 22,
    name: "Catraca p/cerca UN",
    price: 14.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferramentas",
    description: "Catraca para cerca - unidade",
    rating: 4.3
  },
  {
    id: 23,
    name: "ESPICHADEIRA P/ ARAME LISO C/CORRENTE",
    price: 219.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferramentas",
    description: "Espichadeira para arame liso com corrente",
    rating: 4.8
  },
  // Dobradiças
  {
    id: 24,
    name: "Dobradiça N1 UN",
    price: 24.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Dobradiça número 1 - unidade",
    rating: 4.5
  },
  {
    id: 25,
    name: "Dobradiça N3 UN",
    price: 34.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Dobradiça número 3 - unidade",
    rating: 4.7
  },
  {
    id: 26,
    name: "Dobradiça N2 UN",
    price: 29.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Dobradiça número 2 - unidade",
    rating: 4.6
  },
  {
    id: 27,
    name: "Dobradiça N0 UN",
    price: 19.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Dobradiça número 0 - unidade",
    rating: 4.4
  },
  // Pregos
  {
    id: 28,
    name: "Prego 26x72 1kg",
    price: 27.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 26x72 - 1kg",
    rating: 4.5
  },
  {
    id: 29,
    name: "Prego 24x60 1kg",
    price: 27.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 24x60 - 1kg",
    rating: 4.5
  },
  {
    id: 30,
    name: "Prego 22x48 1kg",
    price: 27.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 22x48 - 1kg",
    rating: 4.5
  },
  {
    id: 31,
    name: "Prego 22x42 1kg",
    price: 27.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 22x42 - 1kg",
    rating: 4.5
  },
  {
    id: 32,
    name: "Prego 19x36 1kg",
    price: 19.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 19x36 - 1kg",
    rating: 4.4
  },
  {
    id: 33,
    name: "Prego 18x30 1 kg",
    price: 19.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 18x30 - 1kg",
    rating: 4.4
  },
  {
    id: 34,
    name: "Prego 17x27 1kg",
    price: 19.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 17x27 - 1kg",
    rating: 4.4
  },
  {
    id: 35,
    name: "Prego 17x21 1kg",
    price: 19.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 17x21 - 1kg",
    rating: 4.4
  },
  {
    id: 36,
    name: "Prego 15x15 1kg",
    price: 17.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Prego 15x15 - 1kg",
    rating: 4.3
  },
  {
    id: 37,
    name: "Grampo polido p/ cerca 1,X9 3,75 MM",
    price: 19.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ferragens",
    description: "Grampo polido para cerca 1x9 - 3,75mm",
    rating: 4.4
  },
  // Telas
  {
    id: 38,
    name: "TELA HEXAGONAL MANGUEIRÃO 1.50MT X 50MT",
    price: 600.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "telas",
    description: "Tela hexagonal mangueirão 1,50m x 50m",
    rating: 4.8
  },
  {
    id: 39,
    name: "TELA HEX PINTEIRO",
    price: 280.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "telas",
    description: "Tela hexagonal pinteiro",
    rating: 4.6
  },
  {
    id: 40,
    name: "TELA HEX GALINHEIRO",
    price: 320.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "telas",
    description: "Tela hexagonal galinheiro",
    rating: 4.7
  },
  // Tubos
  {
    id: 41,
    name: "TUBO KRONA SOLD 25MM",
    price: 20.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo Krona soldável 25mm",
    rating: 4.4
  },
  {
    id: 42,
    name: "TUBO ESG 40MM KRONA",
    price: 44.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo esgoto 40mm Krona",
    rating: 4.5
  },
  {
    id: 43,
    name: "TUBO ESGOTO CLASSE B - 75MM 6MTS",
    price: 34.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo esgoto classe B 75mm - 6 metros",
    rating: 4.6
  },
  {
    id: 44,
    name: "TUBO ESG 100MM KRONA",
    price: 65.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo esgoto 100mm Krona",
    rating: 4.7
  },
  {
    id: 45,
    name: "TUBO DE ESGOTO 50MM NBR CLASSE - B",
    price: 31.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo de esgoto 50mm NBR classe B",
    rating: 4.5
  },
  {
    id: 46,
    name: "TUBO DE ESGOTO 40MM NBR CLASSE - B",
    price: 22.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo de esgoto 40mm NBR classe B",
    rating: 4.4
  },
  {
    id: 47,
    name: "TUBO DE ESGOTO 200 NBR CLASSE -B",
    price: 270.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo de esgoto 200mm NBR classe B",
    rating: 4.8
  },
  {
    id: 48,
    name: "TUBO DE ESGOTO 150 NBR CLASSE -B",
    price: 126.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo de esgoto 150mm NBR classe B",
    rating: 4.7
  },
  {
    id: 49,
    name: "TUBO DE ESGOTO 100 NBR CLASSE - B (6 METROS)",
    price: 34.90,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "tubos",
    description: "Tubo de esgoto 100mm NBR classe B - 6 metros",
    rating: 4.6
  },
  // Postes
  {
    id: 50,
    name: "POSTE 14/16 5 MT",
    price: 260.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 14/16 - 5 metros",
    rating: 4.9
  },
  {
    id: 51,
    name: "POSTE 14/16 4 MT",
    price: 170.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 14/16 - 4 metros",
    rating: 4.8
  },
  {
    id: 52,
    name: "POSTE 12/14 7 MT",
    price: 230.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 12/14 - 7 metros",
    rating: 4.9
  },
  {
    id: 53,
    name: "POSTE 12/14 6 MT",
    price: 180.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 12/14 - 6 metros",
    rating: 4.8
  },
  {
    id: 54,
    name: "POSTE 12/14 5 MT",
    price: 160.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 12/14 - 5 metros",
    rating: 4.7
  },
  {
    id: 55,
    name: "POSTE 12/14 4 MT",
    price: 130.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 12/14 - 4 metros",
    rating: 4.6
  },
  {
    id: 56,
    name: "POSTE 10/12 7MT",
    price: 180.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 10/12 - 7 metros",
    rating: 4.8
  },
  {
    id: 57,
    name: "POSTE 10/12 6MT",
    price: 149.99,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 10/12 - 6 metros",
    rating: 4.7
  },
  {
    id: 58,
    name: "POSTE 10/12 5 MT",
    price: 125.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 10/12 - 5 metros",
    rating: 4.6
  },
  {
    id: 59,
    name: "POSTE 10/12 4 MT",
    price: 100.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 10/12 - 4 metros",
    rating: 4.5
  },
  {
    id: 60,
    name: "POSTE 08/10 8 MT",
    price: 230.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 08/10 - 8 metros",
    rating: 4.9
  },
  {
    id: 61,
    name: "POSTE 08/10 7 MT",
    price: 125.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 08/10 - 7 metros",
    rating: 4.7
  },
  {
    id: 62,
    name: "POSTE 08/10 5 MT",
    price: 95.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 08/10 - 5 metros",
    rating: 4.6
  },
  {
    id: 63,
    name: "POSTE 08/10 4 MT",
    price: 75.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 08/10 - 4 metros",
    rating: 4.5
  },
  {
    id: 64,
    name: "POSTE 06/08 7 MT",
    price: 120.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 06/08 - 7 metros",
    rating: 4.7
  },
  {
    id: 65,
    name: "POSTE 06/08 6 MT eucalipto tratado",
    price: 65.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 06/08 eucalipto tratado - 6 metros",
    rating: 4.6
  },
  {
    id: 66,
    name: "Poste de Eucalipto Tratado 6/8 – 4.00m",
    price: 55.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste de eucalipto tratado 6/8 - 4 metros",
    rating: 4.5
  },
  {
    id: 67,
    name: "Poste de Eucalipto Tratado 4/6 – 6.00m",
    price: 75.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste de eucalipto tratado 4/6 - 6 metros",
    rating: 4.6
  },
  {
    id: 68,
    name: "Poste de Eucalipto Tratado 4/6 – 5.00m",
    price: 65.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste de eucalipto tratado 4/6 - 5 metros",
    rating: 4.5
  },
  {
    id: 69,
    name: "Poste 04/06 eucalipto tratado 4mt",
    price: 45.00,
    image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "postes",
    description: "Poste 04/06 eucalipto tratado - 4 metros",
    rating: 4.4
  }
];

const categories = [
  { value: '', label: 'Todas as Categorias' },
  { value: 'madeira', label: 'Madeira' },
  { value: 'madeirite', label: 'Madeirite' },
  { value: 'telhas', label: 'Telhas' },
  { value: 'verniz', label: 'Verniz' },
  { value: 'ferramentas', label: 'Ferramentas' },
  { value: 'arames', label: 'Arames' },
  { value: 'ferragens', label: 'Ferragens' },
  { value: 'telas', label: 'Telas' },
  { value: 'tubos', label: 'Tubos' },
  { value: 'postes', label: 'Postes' },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { currentUser } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const productSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(productSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
  };

  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra nossa linha completa de produtos de eucalipto de alta qualidade
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="font-medium text-gray-900">{suggestion.name}</div>
                      <div className="text-sm text-gray-500">R$ {suggestion.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` para "${searchTerm}"`}
            {selectedCategory && ` na categoria "${categories.find(c => c.value === selectedCategory)?.label}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros ou termo de busca
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}