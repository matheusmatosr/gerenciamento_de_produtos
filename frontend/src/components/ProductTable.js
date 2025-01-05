import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

export default function ProductTable({ products, actionTemplate }) {
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const header = (
    <div className="flex justify-center items-center gap-2">
      <span className="text-xl text-900 font-bold">Meus produtos</span>
    </div>
  );

  const footer = `Total de produtos: ${products ? products.length : 0}`;

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const renderSearch = () => {
    return (
      <div className="flex justify-start mb-4 mt-4 px-4">
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Pesquisar produtos"
          className="p-inputtext-sm bg-gray-100 w-[250px] h-[30px] text-black ml-1"
        />
      </div>
    );
  };

  return (
    <div className="overflow-y-auto rounded shadow-lg">
      {renderSearch()}
      <DataTable
        value={products}
        responsiveLayout="scroll"
        header={header}
        footer={footer}
        paginator
        rows={4}
        globalFilter={globalFilterValue}
      >
        <Column field="nome" header="Nome" sortable style={{ color: '#A0AEC0' }} />
        <Column field="preco" header="Preço" sortable style={{ color: '#A0AEC0' }} />
        <Column field="quantidade" header="Quantidade" sortable style={{ color: '#A0AEC0' }} />
        <Column body={actionTemplate} header="Ações" style={{ color: '#A0AEC0' }} />
      </DataTable>
    </div>
  );
}
