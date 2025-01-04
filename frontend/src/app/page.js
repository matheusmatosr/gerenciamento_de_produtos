"use client";

import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import ProductDialog from "@/components/ProductDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schema/productShema";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
       console.error(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openNewProductForm = () => {
    setEditingProduct(null);
    reset({ nome: '', preco: 0, quantidade: 0 });
    setDialogVisible(true);
  };

  const openEditProductForm = (product) => {
    setEditingProduct(product);
    reset(product); 
    setDialogVisible(true);
  };

  const saveProduct = async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p))
        );
      } else {
        const newProduct = await createProduct(data);
        setProducts((prev) => [...prev, newProduct]);
      }
      setDialogVisible(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        onClick={() => openEditProductForm(rowData)}
      >
        Editar
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => deleteProductHandler(rowData.id)}
      >
        Deletar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestão de Produto</h1>
        <button
          onClick={openNewProductForm}
          className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 mb-4"
        >
          Adicionar Produto
        </button>
        <ProductTable products={products} actionTemplate={actionTemplate} />
        <ProductDialog
          isVisible={isDialogVisible}
          onHide={() => setDialogVisible(false)}
          onSave={saveProduct}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          editingProduct={editingProduct}
          setValue={setValue}
        />
      </div>
    </div>
  );
}
