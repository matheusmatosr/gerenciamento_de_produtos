import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ProductTable({ products, actionTemplate }) {
    return (
        <DataTable
            value={products}
            responsiveLayout="scroll"
            className="bg-gray-800 text-white rounded shadow-lg"
            style={{ backgroundColor: '#2D3748', color: '#fff' }}
        >
            <Column field="nome" header="Nome" sortable style={{ color: '#A0AEC0' }}></Column>
            <Column field="preco" header="Preço" sortable style={{ color: '#A0AEC0' }}></Column>
            <Column field="quantidade" header="Quantidade" sortable style={{ color: '#A0AEC0' }}></Column>
            <Column body={actionTemplate} header="Ações" style={{ color: '#A0AEC0' }}></Column>
        </DataTable>
    );
}
