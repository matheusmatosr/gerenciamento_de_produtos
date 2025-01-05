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
    setValue,
}) {
    const handleInputChange = (field, value) => {
        setValue(field, value, { shouldValidate: true });
    };

    return (
        <Dialog
            visible={isVisible}
            onHide={onHide}
            header={editingProduct?.nome ? `Editar Produto: ${editingProduct.nome}` : 'Adicionar Produto'}
            className="rounded-lg shadow-lg bg-gray-800 text-white"
            style={{ width: '90vw', maxWidth: '600px' }}
            footer={
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onHide}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit(onSave)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                        Salvar
                    </button>
                </div>
            }
        >
            <form className="space-y-6">
                <div className="field">
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                    </label>
                    <InputText
                        id="nome"
                        {...register('nome')}
                        className="w-full rounded border border-gray-400 bg-gray-200 text-black py-2 px-3 focus:ring focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.nome && (
                        <small className="block text-red-400 mt-1">{errors.nome.message}</small>
                    )}
                </div>
                <div className="flex gap-4">
                    <div className="field flex-1">
                        <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                            Preço
                        </label>
                        <InputNumber
                            id="preco"
                            value={editingProduct?.preco || ''}
                            onValueChange={(e) => handleInputChange('preco', e.value, { shouldValidate: true })}
                            mode="decimal"
                            inputClassName="w-full rounded border border-gray-400 bg-gray-200 text-black py-2 px-3 focus:ring focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.preco && (
                            <small className="block text-red-400 mt-1">Informe somente números</small>
                        )}
                    </div>
                    <div className="field flex-1">
                        <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantidade
                        </label>
                        <InputNumber
                            id="quantidade"
                            value={editingProduct?.quantidade || ''}
                            onValueChange={(e) => handleInputChange('quantidade', e.value)}
                            inputClassName="w-full rounded border border-gray-400 bg-gray-200 text-black py-2 px-3 focus:ring focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.quantidade && (
                            <small className="block text-red-400 mt-1">Informe somente números</small>
                        )}
                    </div>
                </div>
            </form>
        </Dialog>
    );
}
