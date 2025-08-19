import React, { useState } from "react"

// Definição dos produtos
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Poste de Eucalipto", category: "Madeira", price: 20 },
  { id: 2, name: "Telha Ecológica", category: "Telhas", price: 40 },
  { id: 3, name: "Tábua", category: "Madeira", price: 10 },
  { id: 4, name: "Telas", category: "Telhas", price: 15 },
  { id: 5, name: "Verniz", category: "Verniz", price: 25 },
  { id: 6, name: "Cano", category: "Acessórios", price: 12 },
  { id: 7, name: "Arame", category: "Acessórios", price: 5 },
  { id: 8, name: "Produto 1", category: "Madeira", price: 18 },
  { id: 9, name: "Produto 2", category: "Telhas", price: 30 },
  { id: 10, name: "Produto 3", category: "Verniz", price: 22 },
  { id: 11, name: "Produto 4", category: "Madeira", price: 17 },
  { id: 12, name: "Produto 5", category: "Acessórios", price: 8 },
  { id: 13, name: "Produto 6", category: "Madeira", price: 19 },
  { id: 14, name: "Produto 7", category: "Telhas", price: 35 },
  { id: 15, name: "Produto 8", category: "Verniz", price: 28 },
  { id: 16, name: "Produto 9", category: "Acessórios", price: 7 },
  { id: 17, name: "Produto 10", category: "Madeira", price: 21 },
  { id: 18, name: "Produto 11", category: "Telhas", price: 32 },
  { id: 19, name: "Produto 12", category: "Verniz", price: 26 },
];

interface CartItem extends Product {
  quantity: number;
}

const Products: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Filtra produtos por categoria
  const filteredProducts = products.filter(
    (p) => filterCategory === "All" || p.category === filterCategory
  );

  // Adiciona item ao carrinho
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Calcula quantidade total de itens no carrinho
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Simula checkout via WhatsApp
  const checkout = () => {
    const name = prompt("Enter your name:");
    const address = prompt("Enter your address:");
    if (!name || !address) return;

    let message = `Hello, my name is ${name}.\nAddress: ${address}\nOrder:\n`;
    cart.forEach((item) => {
      message += `- ${item.quantity} x ${item.name} - $${item.price * item.quantity}\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `Total: $${total}`;

    const whatsappUrl = `https://wa.me/SEUNUMERODALOJA?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      {/* Navbar com carrinho minimalista */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        <button
          style={{ position: "relative", background: "black", color: "white", border: "none", padding: "0.5rem", borderRadius: "4px" }}
          onClick={checkout}
        >
          🛒
          {totalQuantity > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "red",
                borderRadius: "50%",
                color: "white",
                width: "18px",
                height: "18px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalQuantity}
            </span>
          )}
        </button>
      </div>

      {/* Filtro de categoria */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by category: </label>
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="All">All</option>
          <option value="Madeira">Madeira</option>
          <option value="Telhas">Telhas</option>
          <option value="Verniz">Verniz</option>
          <option value="Acessórios">Acessórios</option>
        </select>
      </div>

      {/* Lista de produtos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "4px" }}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
