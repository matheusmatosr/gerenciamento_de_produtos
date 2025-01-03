import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export default function ProductDialog({
    isVisible,
    onHide,
    onSave,
    register,
    errors,
    handleSubmit,
    editingProduct,
}) {
    return (
        <Dialog
            visible={isVisible}
            onHide={onHide}
            header={editingProduct ? 'Edit Product' : 'Add Product'}
            className="rounded-lg shadow-lg bg-gray-800 text-white"
            footer={
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onHide}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit(onSave)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                        Save
                    </button>
                </div>
            }
        >
            <form className="space-y-4">
                <div className="field">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <InputText
                        id="name"
                        {...register('name')}
                        className="w-full rounded border-gray-700 bg-gray-700 text-white"
                    />
                    {errors.name && (
                        <small className="block text-red-400 mt-1">{errors.name.message}</small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                    <InputNumber
                        id="price"
                        {...register('price', { valueAsNumber: true })}
                        mode="decimal"
                        className="w-full rounded border-gray-700 bg-gray-700 text-white"
                    />
                    {errors.price && (
                        <small className="block text-red-400 mt-1">{errors.price.message}</small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                    <InputNumber
                        id="quantity"
                        {...register('quantity', { valueAsNumber: true })}
                        className="w-full rounded border-gray-700 bg-gray-700 text-white"
                    />
                    {errors.quantity && (
                        <small className="block text-red-400 mt-1">{errors.quantity.message}</small>
                    )}
                </div>
            </form>
        </Dialog>
    );
}
