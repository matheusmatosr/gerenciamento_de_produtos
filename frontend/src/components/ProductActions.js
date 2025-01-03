import React from 'react';
import { Button } from 'primereact/button';

export default function ActionButtons({ onEdit, onDelete }) {
    return (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" onClick={onEdit} />
            <Button icon="pi pi-trash" className="p-button-danger" onClick={onDelete} />
        </div>
    );
}
