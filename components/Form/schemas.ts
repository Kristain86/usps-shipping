import { z } from "zod";

const isValidUSZipCode = (zip: string) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
};

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC'
] as const;

export const addressSchema = z.object({
  contact_name: z.string().min(1, "Contact name is required"),
  company_name: z.string().min(1, "Company name is required"),
  street1: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string()
    .min(1, "State is required")
    .refine((val) => US_STATES.includes(val.toUpperCase() as typeof US_STATES[number]), {
      message: "Please enter a valid US state code (e.g., CA, NY, TX)",
    })
    .transform((val) => val.toUpperCase()),
  postal_code: z.string()
    .min(1, "Postal code is required")
    .refine((val) => isValidUSZipCode(val), {
      message: "Invalid US ZIP code format (should be XXXXX or XXXXX-XXXX)",
    }),
  country: z.string()
    .min(1, "Country is required")
    .refine((val) => val === "USA", {
      message: "Only USA addresses are allowed",
    }),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
});

export const itemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0, "Quantity is required"),
  price: z.object({
    currency: z.string().min(1, "Currency is required"),
    amount: z.number().min(0, "Amount is required"),
  }),
  item_id: z.string().min(1, "Item ID is required"),
  origin_country: z.string().min(1, "Origin country is required"),
  weight: z.object({
    unit: z.string().min(1, "Weight unit is required"),
    value: z.number().min(0, "Weight value is required"),
  }),
  sku: z.string().min(1, "SKU is required"),
  hs_code: z.string().min(1, "HS Code is required"),
});

export const parcelSchema = z.object({
  box_type: z.string().min(1, "Box type is required"),
  dimension: z.object({
    width: z.number().min(0, "Width is required"),
    height: z.number().min(0, "Height is required"),
    depth: z.number().min(0, "Depth is required"),
    unit: z.string().min(1, "Dimension unit is required"),
  }),
  weight: z.object({
    unit: z.string().min(1, "Weight unit is required"),
    value: z.number().min(0, "Weight value is required"),
  }),
  items: z.array(itemSchema).min(1, "At least one item is required"),
});
