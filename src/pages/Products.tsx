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
    image: "https://http2.mlstatic.com/D_NQ_NP_821250-MLB84187996111_042025-O-osmocolor-montana-transparente-36l-acabamento-acetinado.webp",
    category: "verniz",
    description: "Verniz Osmocolor Stain 3,6 litros",
    rating: 4.8
  },
  {
    id: 11,
    name: "VERNIZ EXTRA RAPIDO BRIL 900ML",
    price: 34.99,
    image: "https://images-offstore.map.azionedge.net/compressed/35d727d664149f1e56b5571315f5821b.webp",
    category: "verniz",
    description: "Verniz extra rápido brilhante 900ml",
    rating: 4.5
  },
  {
    id: 12,
    name: "VERNIZ EXTRA RAPIDO BRIL 3,6LT",
    price: 114.99,
    image: "https://http2.mlstatic.com/D_Q_NP_2X_831334-MLB89825122700_082025-E-vernize-alto-brilho-36l-extra-rapido-protege-e-realca.webp",
    category: "verniz",
    description: "Verniz extra rápido brilhante 3,6 litros",
    rating: 4.7
  },
  {
    id: 13,
    name: "VERNIZ STAIN INC 900ML",
    price: 44.99,
    image: "https://i0.wp.com/lojasaquitem.com/wp-content/uploads/2023/01/stain900.jpg?fit=350%2C350&ssl=1",
    category: "verniz",
    description: "Verniz Stain incolor 900ml",
    rating: 4.6
  },
  {
    id: 14,
    name: "VERNIZ STAIN INC 3,6LT",
    price: 159.99,
    image: "https://images.tcdn.com.br/img/img_prod/861603/verniz_stain_acetinado_3_6l_incolor_iquine_99469_1_b1b4838019fda5c82563678f3da0d7bf.jpg",
    category: "verniz",
    description: "Verniz Stain incolor 3,6 litros",
    rating: 4.8
  },
  // Ferramentas
  {
    id: 15,
    name: "CAVADEIRA ART 1,45MT C/CABO",
    price: 94.99,
    image: "https://http2.mlstatic.com/D_NQ_NP_881414-MLB49546877901_042022-O-cavadeira-articulada-tramontina-cabo-madeira-145-mt.webp",
    category: "ferramentas",
    description: "Cavadeira articulada 1,45m com cabo",
    rating: 4.7
  },
  {
    id: 16,
    name: "CAVADEIRA ART 1,20MT C/CABO",
    price: 74.99,
    image: "https://http2.mlstatic.com/D_NQ_NP_881414-MLB49546877901_042022-O-cavadeira-articulada-tramontina-cabo-madeira-145-mt.webp",
    category: "ferramentas",
    description: "Cavadeira articulada 1,20m com cabo",
    rating: 4.6
  },
  // Arames
  {
    id: 17,
    name: "ARAME RECONZIDO 12.2.77 MM APROX. 5KG",
    price: 84.99,
    image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg",
    category: "arames",
    description: "Arame recozido 12 - 2.77mm aproximadamente 5kg",
    rating: 4.5
  },
  {
    id: 18,
    name: "ARAME RECONZIDO 14.2.11 MM 1KG",
    price: 15.99,
    image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg",
    category: "arames",
    description: "Arame recozido 14 - 2.11mm - 1kg",
    rating: 4.4
  },
  {
    id: 19,
    name: "ARAME RECONZIDO 18.1.24 MM 1KG",
    price: 17.49,
    image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg",
    category: "arames",
    description: "Arame recozido 18 - 1.24mm - 1kg",
    rating: 4.3
  },
  {
    id: 20,
    name: "ARAME RECONZIDO 16.1.65 MM 1KG",
    price: 16.99,
    image: "https://http2.mlstatic.com/D_668166-MLB82097102369_012025-O.jpg",
    category: "arames",
    description: "Arame recozido 16 - 1.65mm - 1kg",
    rating: 4.4
  },
  {
    id: 21,
    name: "CHAVE P/ESTICADOR TP BOBS 1X1 UN",
    price: 9.99,
    image: "https://images-offstore.map.azionedge.net/compressed/2a55ee276b9798f5b056e78a9ab4e8b6.webp",
    category: "ferramentas",
    description: "Chave para esticador tipo bobs 1x1 - unidade",
    rating: 4.2
  },
  {
    id: 22,
    name: "Catraca p/cerca UN",
    price: 14.99,
    image: "https://images-offstore.map.azionedge.net/compressed/4ff19b841ff892e44de2e29eeb98b384.webp",
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