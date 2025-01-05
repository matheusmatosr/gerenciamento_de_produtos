import { fetchProducts, createProduct, updateProduct, deleteProduct } from "@/services/productService";

export const loadProducts = async (setProducts) => {
  try {
    const data = await fetchProducts();
    setProducts(data);
  } catch (error) {
    console.error(error.message);
  }
};

export const openNewProductForm = (reset, setDialogVisible, setEditingProduct) => {
  reset({ nome: '' }); 
  setEditingProduct(null); 
  setDialogVisible(true);  
};

export const openEditProductForm = (product, reset, setDialogVisible, setEditingProduct) => {
  reset(product);
  setEditingProduct(product);
  setDialogVisible(true);
};

export const saveProduct = async (editingProduct, data, setProducts, setDialogVisible) => {
  try {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p))
      );
      alert("Produto editado com sucesso!");
    } else {
      const newProduct = await createProduct(data);
      setProducts((prev) => [...prev, newProduct]);
      alert("Produto adicionado com sucesso!");
    }
    setDialogVisible(false);
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteProductHandler = async (id, setProducts) => {
  try {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    alert("Produto deletado com sucesso!");
  } catch (error) {
    console.error(error.message);
  }
};
