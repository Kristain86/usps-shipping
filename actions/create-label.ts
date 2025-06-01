'use server';

import { FormData } from '@/components/Form/Form';

export async function createLabel(formData: FormData) {
  const apiKey = process.env.POSTMEN_API_KEY!;
  const shipperAccount = process.env.SHIPPER_ACCOUNT_ID!;

  const response = await fetch('https://sandbox-api.aftership.com/postmen/v3/labels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'as-api-key': apiKey,
    },
    body: JSON.stringify({
      return_shipment: false,
      is_document: false,
      service_type: 'fedex_ground',
      paper_size: '4x6',
      shipper_account: {
        id: shipperAccount,
      },
      references: ['reference1'],
      shipment: {
        ship_from: {
          contact_name: formData.ship_from.contact_name,
          company_name: formData.ship_from.company_name,
          street1: formData.ship_from.street1,
          city: formData.ship_from.city,
          state: formData.ship_from.state,
          postal_code: formData.ship_from.postal_code,
          country: formData.ship_from.country,
          phone: formData.ship_from.phone,
          email: formData.ship_from.email,
        },
        ship_to: {
          contact_name: formData.ship_to.contact_name,
          company_name: formData.ship_to.company_name,
          street1: formData.ship_to.street1,
          city: formData.ship_to.city,
          state: formData.ship_to.state,
          postal_code: formData.ship_to.postal_code,
          country: formData.ship_to.country,
          phone: formData.ship_to.phone,
          email: formData.ship_to.email,
        },
        parcels: [
          {
            box_type: formData.parcel.box_type,
            dimension: {
              width: formData.parcel.dimension.width,
              height: formData.parcel.dimension.height,
              depth: formData.parcel.dimension.depth,
              unit: formData.parcel.dimension.unit,
            },
            items: formData.parcel.items.map(item => ({
              description: item.description,
              quantity: item.quantity,
              price: {
                currency: item.price.currency,
                amount: item.price.amount,
              },
              item_id: item.item_id,
              origin_country: item.origin_country,
              weight: {
                unit: item.weight.unit,
                value: item.weight.value,
              },
              sku: item.sku,
              hs_code: item.hs_code,
            })),
            weight: {
              unit: formData.parcel.weight.unit,
              value: formData.parcel.weight.value,
            },
          },
        ],
      },
      custom_fields: {
        ship_code: '01',
      },
      print_options: {
        qr_code: {
          enabled: false,
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Postmen API error:', error);
    throw new Error(error.meta?.message || 'Failed to create label');
  }

  const data = await response.json();

  return data;
}
