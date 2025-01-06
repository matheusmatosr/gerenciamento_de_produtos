"use client";

import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import ProductDialog from "@/components/ProductDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productZod } from "@/validators/productZod";

import {
  loadProducts,
  openNewProductForm,
  openEditProductForm,
  saveProduct,
  deleteProductHandler,
} from "@/utils/productManagementUtils";

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
    resolver: zodResolver(productZod),
  });

  useEffect(() => {
    loadProducts(setProducts);
  }, []);

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        onClick={() => openEditProductForm(rowData, reset, setDialogVisible, setEditingProduct)} // Adicionando o setEditingProduct
      >
        Editar
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => deleteProductHandler(rowData.id, setProducts)}
      >
        Deletar
      </button>
    </div>
  );  

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-8">
      <div className="max-w-7xl w-full mx-auto bg-white shadow rounded-lg p-[20px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center underline">
          Gestão de Produtos
        </h1>
        <button
          onClick={() => openNewProductForm(reset, setDialogVisible, setEditingProduct)}
          className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 mb-4 ml-auto block"
        >
          Adicionar Produto
        </button>
        <ProductTable products={products} actionTemplate={actionTemplate} />
        <ProductDialog
          isVisible={isDialogVisible}
          onHide={() => setDialogVisible(false)}
          onSave={(data) => saveProduct(editingProduct, data, setProducts, setDialogVisible)}
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
