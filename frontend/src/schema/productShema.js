import * as z from 'zod';

export const productSchema = z.object({
    name: z.string().nonempty('Name is required'),
    price: z.number().positive('Price must be positive'),
    quantity: z.number().int().min(0, 'Quantity must be at least 0'),
});
