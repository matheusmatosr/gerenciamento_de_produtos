"use client"
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Mocked Data
const initialProducts = [
    { id: 1, name: 'Product 1', price: 10.5, quantity: 5 },
    { id: 2, name: 'Product 2', price: 20.0, quantity: 10 },
    { id: 3, name: 'Product 3', price: 15.75, quantity: 8 },
];

const schema = z.object({
    name: z.string().nonempty('Name is required'),
    price: z.number().positive('Price must be positive'),
    quantity: z.number().int().min(0, 'Quantity must be at least 0'),
});

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
        resolver: zodResolver(schema),
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
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p))
            );
        } else {
            setProducts((prevProducts) => [
                ...prevProducts,
                { id: Date.now(), ...data },
            ]);
        }
        setDialogVisible(false);
    };

    const deleteProduct = (productId) => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    };

    const actionTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" onClick={() => openEditProductForm(rowData)} />
            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteProduct(rowData.id)} />
        </div>
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Product Management</h1>
            <Button label="Add Product" icon="pi pi-plus" onClick={openNewProductForm} className="mb-4" />
            <DataTable value={products} responsiveLayout="scroll">
                <Column field="name" header="Name" sortable></Column>
                <Column field="price" header="Price" sortable></Column>
                <Column field="quantity" header="Quantity" sortable></Column>
                <Column body={actionTemplate} header="Actions"></Column>
            </DataTable>

            <Dialog
                visible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
                header={editingProduct ? 'Edit Product' : 'Add Product'}
                footer={
                    <div>
                        <Button label="Cancel" onClick={() => setDialogVisible(false)} className="p-button-text" />
                        <Button label="Save" onClick={handleSubmit(saveProduct)} />
                    </div>
                }
            >
                <form>
                    <div className="field mb-3">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" {...register('name')} />
                        {errors.name && <small className="p-error">{errors.name.message}</small>}
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="price">Price</label>
                        <InputNumber
                            id="price"
                            {...register('price', { valueAsNumber: true })}
                            mode="decimal"
                            minFractionDigits={2}
                        />
                        {errors.price && <small className="p-error">{errors.price.message}</small>}
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber
                            id="quantity"
                            {...register('quantity', { valueAsNumber: true })}
                            mode="decimal"
                            minFractionDigits={0}
                        />
                        {errors.quantity && <small className="p-error">{errors.quantity.message}</small>}
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
