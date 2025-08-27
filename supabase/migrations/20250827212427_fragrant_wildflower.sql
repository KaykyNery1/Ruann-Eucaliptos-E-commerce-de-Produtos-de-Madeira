/*
  # Criar tabela de produtos

  1. Nova Tabela
    - `products`
      - `id` (uuid, primary key)
      - `nome` (text, nome do produto)
      - `preco` (decimal, preço do produto)
      - `peso` (text, peso/unidade)
      - `descricao` (text, descrição do produto)
      - `imagem_url` (text, URL da imagem)
      - `ativo` (boolean, se o produto está ativo)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - Enable RLS na tabela `products`
    - Política para leitura pública (todos podem ver produtos ativos)
    - Política para admin criar/editar/deletar produtos
*/

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  preco decimal(10,2) NOT NULL,
  peso text NOT NULL,
  descricao text NOT NULL,
  imagem_url text DEFAULT 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp',
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (todos podem ver produtos ativos)
CREATE POLICY "Produtos ativos são visíveis para todos"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (ativo = true);

-- Política para admin gerenciar produtos
CREATE POLICY "Admin pode gerenciar todos os produtos"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'ruanneucaliptos@gmail.com');

-- Inserir produtos iniciais
INSERT INTO products (nome, preco, peso, descricao) VALUES
-- Arame Farpado
('Arame farpado 100 MT', 125.00, '100 metros', 'Arame farpado galvanizado de alta qualidade para cercamento rural.'),
('Arame farpado 250 MT', 250.00, '250 metros', 'Arame farpado galvanizado de alta qualidade para cercamento rural.'),
('Arame farpado 500 MT', 400.00, '500 metros', 'Arame farpado galvanizado de alta qualidade para cercamento rural.'),

-- Arame Oval Liso
('Arame oval liso 15/17 500 MT', 500.00, '500 metros', 'Arame oval liso galvanizado 15/17 para cercamento.'),
('Arame oval liso 1000 MT 14/16 700KGF', 630.00, '1000 metros', 'Arame oval liso galvanizado 14/16 com resistência de 700KGF.'),
('Arame oval liso 1000 MT 15/17 700KGF', 730.00, '1000 metros', 'Arame oval liso galvanizado 15/17 com resistência de 700KGF.'),

-- Arame Galvanizado
('Arame galvanizado 14 Bwg 1kg', 30.00, '1kg', 'Arame galvanizado 14 BWG para uso geral.'),
('Arame galvanizado 16 Bwg', 28.50, '1kg', 'Arame galvanizado 16 BWG para uso geral.'),

-- Arame Recozido
('Arame recozido 12 – 2,77MM aprox 5kg', 85.00, '5kg', 'Arame recozido calibre 12 com 2,77mm de espessura.'),
('Arame recozido 14 – 2,11MM aprox 1kg', 16.50, '1kg', 'Arame recozido calibre 14 com 2,11mm de espessura.'),
('Arame recozido 16 – 0,65MM aprox 1kg', 17.00, '1kg', 'Arame recozido calibre 16 com 0,65mm de espessura.'),
('Arame recozido 18 – 1,24MM aprox 1kg', 18.00, '1kg', 'Arame recozido calibre 18 com 1,24mm de espessura.'),

-- Telas Hexagonais
('Tela hex pinteiro 1x24x1,00x50MT F24', 280.00, '50 metros', 'Tela hexagonal para pinteiro 1x24 com 1,00m de altura.'),
('Tela hex pinteiro 1,50Mx50M F24', 385.00, '50 metros', 'Tela hexagonal para pinteiro com 1,50m de altura.'),
('Tela hex galinheiro 1,5Mx50M F23', 305.00, '50 metros', 'Tela hexagonal para galinheiro com 1,5m de altura.'),
('Tela hex galinheiro 1,80Mx50M F23', 310.00, '50 metros', 'Tela hexagonal para galinheiro com 1,80m de altura.'),
('Tela hex mangueirão F18 x 0,80x50MT', 330.00, '50 metros', 'Tela hexagonal para mangueirão F18 com 0,80m de altura.'),
('Tela hex mangueirão 1,20Mx50M F18', 500.00, '50 metros', 'Tela hexagonal para mangueirão F18 com 1,20m de altura.'),
('Tela hex mangueirão 1,5Mx50M F18', 600.00, '50 metros', 'Tela hexagonal para mangueirão F18 com 1,5m de altura.'),
('Tela hex mangueirão 1,80x50M F16', 1000.00, '50 metros', 'Tela hexagonal para mangueirão F16 com 1,80m de altura.'),

-- Grampo
('Grampo polido p/cerca 1x9 3,75MM', 25.00, '1kg', 'Grampo polido para cerca 1x9 com 3,75mm de espessura.'),

-- Pregos
('Prego c/ cabeça 15/15MM kg', 21.99, '1kg', 'Prego com cabeça 15/15mm vendido por quilograma.'),
('Prego c/ cabeça 17/21MM kg', 24.00, '1kg', 'Prego com cabeça 17/21mm vendido por quilograma.'),
('Prego c/ cabeça 17/27MM kg', 24.00, '1kg', 'Prego com cabeça 17/27mm vendido por quilograma.'),
('Prego c/ cabeça 18/30MM kg', 24.00, '1kg', 'Prego com cabeça 18/30mm vendido por quilograma.'),
('Prego c/ cabeça 19/36MM kg', 24.00, '1kg', 'Prego com cabeça 19/36mm vendido por quilograma.'),
('Prego 22/42 kg', 30.00, '1kg', 'Prego 22/42mm vendido por quilograma.'),
('Prego 22/48 kg', 30.00, '1kg', 'Prego 22/48mm vendido por quilograma.'),
('Prego 24/60 kg', 30.00, '1kg', 'Prego 24/60mm vendido por quilograma.'),
('Prego 25/72 kg', 30.00, '1kg', 'Prego 25/72mm vendido por quilograma.'),
('Prego 26/72 kg', 30.00, '1kg', 'Prego 26/72mm vendido por quilograma.'),

-- Vernizes
('Verniz copal bril 3,6LT INC', 130.00, '3,6 litros', 'Verniz copal brilhante 3,6 litros cor incolor.'),
('Verniz extrarrápido bril 3,6LT imbuia', 180.00, '3,6 litros', 'Verniz extrarrápido brilhante 3,6 litros cor imbuia.'),
('Verniz extrarrápido bril 3,6LT mogno', 180.00, '3,6 litros', 'Verniz extrarrápido brilhante 3,6 litros cor mogno.'),
('Verniz extrarrápido bril 3,6LT nogueira', 180.00, '3,6 litros', 'Verniz extrarrápido brilhante 3,6 litros cor nogueira.'),
('Verniz extrarrápido bril 3,6LT cedro', 180.00, '3,6 litros', 'Verniz extrarrápido brilhante 3,6 litros cor cedro.'),
('Verniz stain INC 3,6LT', 210.00, '3,6 litros', 'Verniz stain 3,6 litros cor incolor.'),
('Verniz osmocolor stain 3,6LT', 300.00, '3,6 litros', 'Verniz osmocolor stain 3,6 litros de alta qualidade.'),

-- Dobradiças
('Dobradiça galvanizada ferradura N1"', 25.00, '1 unidade', 'Dobradiça galvanizada tipo ferradura número 1 polegada.'),
('Dobradiça galvanizada ferradura N2"', 30.00, '1 unidade', 'Dobradiça galvanizada tipo ferradura número 2 polegadas.'),
('Dobradiça galvanizada ferradura N3"', 35.00, '1 unidade', 'Dobradiça galvanizada tipo ferradura número 3 polegadas.'),

-- Madeirite Cola Branca
('Madeirite cola branca 2,20x1,10 05MM', 40.00, '1 chapa', 'Madeirite cola branca 2,20x1,10m com 5mm de espessura.'),
('Madeirite cola branca 2,20x1,10 08MM', 55.00, '1 chapa', 'Madeirite cola branca 2,20x1,10m com 8mm de espessura.'),
('Madeirite cola branca 2,20x1,10 10MM', 85.00, '1 chapa', 'Madeirite cola branca 2,20x1,10m com 10mm de espessura.'),
('Madeirite cola branca 2,20x1,10 12MM', 95.00, '1 chapa', 'Madeirite cola branca 2,20x1,10m com 12mm de espessura.'),
('Madeirite cola branca 2,20x1,10 14MM', 115.00, '1 chapa', 'Madeirite cola branca 2,20x1,10m com 14mm de espessura.'),

-- Madeirite Plastificado
('Madeirite plastificado 2,20x1,10 10MM', 105.00, '1 chapa', 'Madeirite plastificado 2,20x1,10m com 10mm de espessura.'),
('Madeirite plastificado 2,20x1,10 12MM', 125.00, '1 chapa', 'Madeirite plastificado 2,20x1,10m com 12mm de espessura.'),
('Madeirite plastificado 2,20x1,10 14MM', 140.00, '1 chapa', 'Madeirite plastificado 2,20x1,10m com 14mm de espessura.'),
('Madeirite plastificado 2,20x1,10 17MM', 160.00, '1 chapa', 'Madeirite plastificado 2,20x1,10m com 17mm de espessura.'),
('Madeirite plastificado 2,20x1,10 19MM', 180.00, '1 chapa', 'Madeirite plastificado 2,20x1,10m com 19mm de espessura.');