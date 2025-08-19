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
    image: "https://padovani.vtexassets.com/arquivos/ids/194392-800-800?v=638435150235330000&width=800&height=800&aspect=true",
    category: "verniz",
    description: "Verniz Cetol Deck Ultra Protetor 3,6 litros",
    rating: 4.9
  },
  {
    id: 10,
    name: "VERNIZ OSMOCOLOR STAIN 3,6LT",
    price: 299.99,
    image: "data:image/jpeg;base64,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",
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