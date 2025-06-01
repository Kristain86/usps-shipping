import Input from '@/components/Input/Input';
import { USStateSelect } from '@/components/Select/Select';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from './Form';

interface AddressFormProps {
  title: string;
  prefix: 'ship_from' | 'ship_to';
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const AddressForm = ({ title, prefix, register, errors }: AddressFormProps) => {
  return (
    <div className='space-y-4'>
      <h4 className='text-xl font-semibold'>{title}</h4>

      <div className='grid grid-cols-2 gap-4'>
        <Input
          label='Contact Name'
          {...register(`${prefix}.contact_name`)}
          error={errors[prefix]?.contact_name?.message}
        />
        <Input
          label='Company Name'
          {...register(`${prefix}.company_name`)}
          error={errors[prefix]?.company_name?.message}
        />
      </div>

      <Input label='Street Address' {...register(`${prefix}.street1`)} error={errors[prefix]?.street1?.message} />
      <div className='grid grid-cols-2 gap-4'>
        <Input label='City' {...register(`${prefix}.city`)} error={errors[prefix]?.city?.message} />
        <USStateSelect<FormData> name={`${prefix}.state`} register={register} error={errors[prefix]?.state?.message} />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Input
          label='Postal Code'
          {...register(`${prefix}.postal_code`)}
          error={errors[prefix]?.postal_code?.message}
        />
        <div className='flex flex-col gap-2'>
          <Input type='text' value='USA' label='Country' disabled />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Input label='Phone' {...register(`${prefix}.phone`)} error={errors[prefix]?.phone?.message} />
        <Input label='Email' type='email' {...register(`${prefix}.email`)} error={errors[prefix]?.email?.message} />
      </div>
    </div>
  );
};

export default AddressForm;
