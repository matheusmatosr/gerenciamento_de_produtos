"use client";

import React, { useState } from 'react';
import ProductTable from '@/components/ProductTable';
import ProductDialog from '@/components/ProductDialog';
import { initialProducts } from '@/mock/products';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/schema/productShema';

export default function ProductManagement() {
    const [products, setProducts] = useState(initialProducts);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    });

    const openNewProductForm = () => {
        setEditingProduct(null);
        reset();
        setDialogVisible(true);
    };

    const openEditProductForm = (product) => {
        setEditingProduct(product);
        reset(product);
        setDialogVisible(true);
    };

    const saveProduct = (data) => {
        if (editingProduct) {
            setProducts((prev) =>
                prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p))
            );
        } else {
            setProducts((prev) => [...prev, { id: Date.now(), ...data }]);
        }
        setDialogVisible(false);
    };

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const actionTemplate = (rowData) => (
        <div className="flex gap-2">
            <button 
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => openEditProductForm(rowData)}>
                Edit
            </button>
            <button 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteProduct(rowData.id)}>
                Delete
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Management</h1>
                <button 
                    onClick={openNewProductForm}
                    className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 mb-4">
                    Add Product
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
                />
            </div>
        </div>
    );
}
