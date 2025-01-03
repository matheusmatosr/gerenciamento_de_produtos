import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ProductTable({ products, actionTemplate }) {
    return (
        <DataTable
            value={products}
            responsiveLayout="scroll"
            className="bg-gray-800 text-white rounded shadow-lg"
            headerStyle={{ backgroundColor: '#2D3748', color: '#fff' }}
            footerStyle={{ backgroundColor: '#2D3748', color: '#fff' }}
        >
            <Column field="name" header="Name" sortable headerStyle={{ color: '#A0AEC0' }}></Column>
            <Column field="price" header="Price" sortable headerStyle={{ color: '#A0AEC0' }}></Column>
            <Column field="quantity" header="Quantity" sortable headerStyle={{ color: '#A0AEC0' }}></Column>
            <Column body={actionTemplate} header="Actions" headerStyle={{ color: '#A0AEC0' }}></Column>
        </DataTable>
    );
}
