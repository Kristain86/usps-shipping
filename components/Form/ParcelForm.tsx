import Input from '@/components/Input/Input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from './Form';

interface ParcelFormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const ParcelForm = ({ register, errors }: ParcelFormProps) => {
  return (
    <div className='space-y-4'>
      <h4 className='text-lg font-medium'>Parcel Information</h4>
      <div className='grid grid-cols-1 gap-6'>
        <div className='space-y-4'>
          <h5 className='font-medium'>Item Details</h5>
          <Input
            label='Description'
            placeholder='e.g. "Laptop"'
            {...register('parcel.items.0.description')}
            error={errors.parcel?.items?.[0]?.description?.message}
          />
          <div className='grid grid-cols-2 gap-4'>
            <Input
              label='Quantity'
              type='number'
              {...register('parcel.items.0.quantity', { valueAsNumber: true })}
              error={errors.parcel?.items?.[0]?.quantity?.message}
            />
            <Input
              label='Price (USD)'
              type='number'
              step='0.01'
              {...register('parcel.items.0.price.amount', { valueAsNumber: true })}
              error={errors.parcel?.items?.[0]?.price?.amount?.message}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Input label='SKU' {...register('parcel.items.0.sku')} error={errors.parcel?.items?.[0]?.sku?.message} />
            <Input
              label='HS Code'
              {...register('parcel.items.0.hs_code')}
              error={errors.parcel?.items?.[0]?.hs_code?.message}
            />
          </div>
          <Input
            label='Item ID'
            {...register('parcel.items.0.item_id')}
            error={errors.parcel?.items?.[0]?.item_id?.message}
          />
        </div>
        <div className='space-y-4'>
          <div>
            <Input
              label='Box Type'
              value="Custom"
              disabled
            />
          </div>
          <Input
            label='Weight (kg)'
            type='number'
            step='0.1'
            {...register('parcel.weight.value', { valueAsNumber: true })}
            error={errors.parcel?.weight?.value?.message}
          />
          <div className='grid grid-cols-3 gap-4'>
            <Input
              label='Width (cm)'
              type='number'
              step='0.1'
              {...register('parcel.dimension.width', { valueAsNumber: true })}
              error={errors.parcel?.dimension?.width?.message}
            />
            <Input
              label='Height (cm)'
              type='number'
              step='0.1'
              {...register('parcel.dimension.height', { valueAsNumber: true })}
              error={errors.parcel?.dimension?.height?.message}
            />
            <Input
              label='Depth (cm)'
              type='number'
              step='0.1'
              {...register('parcel.dimension.depth', { valueAsNumber: true })}
              error={errors.parcel?.dimension?.depth?.message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelForm;
