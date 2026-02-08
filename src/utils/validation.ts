import { z } from 'zod';

// Validate hostel name - must be Began Hostel variant
const validateHostel = (value: string): boolean => {
  const normalized = value.toLowerCase().trim();
  return (
    normalized.includes('began') ||
    normalized.includes('begum')
  );
};

export const orderFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  hostel: z
    .string()
    .trim()
    .min(1, 'Hostel name is required')
    .refine(validateHostel, {
      message: 'Sorry! Delivery is EXCLUSIVELY for Began Hostel residents.',
    }),
  room: z
    .string()
    .trim()
    .min(1, 'Room number is required')
    .max(10, 'Room number must be less than 10 characters'),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
