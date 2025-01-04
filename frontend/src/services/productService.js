const API_URL = "http://localhost:3000/produtos";

export const fetchProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const createProduct = async (product) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: product.nome,
      preco: product.preco,
      quantidade: product.quantidade
    }),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete product");
};
