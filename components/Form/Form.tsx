'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addressSchema, parcelSchema } from './schemas';
import { useState } from 'react';
import AddressForm from './AddressForm';
import ParcelForm from './ParcelForm';
import { createLabel } from '@/actions/create-label';
import { Resolver } from 'react-hook-form';
import { cn } from '@/utils/cn';

const formSchema = z.object({
  ship_from: addressSchema,
  ship_to: addressSchema,
  parcel: parcelSchema,
});

export type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [labelUrl, setLabelUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema) as Resolver<FormData>,
    mode: 'onChange',
    defaultValues: {
      ship_from: {
        contact_name: 'John Doe',
        company_name: 'Amazon',
        country: 'USA',
        street1: '230 W 200 S LBBY',
        city: 'Salt Lake City',
        state: 'UT',
        postal_code: '84101',
        phone: '19835553752',
        email: 'test@test.com',
      },
      ship_to: {
        contact_name: 'Bill Gates',
        company_name: 'Microsoft',
        country: 'USA',
        phone: '19835553752',
        email: 'test2shipping@test.com',
      },
      parcel: {
        box_type: 'custom',
        dimension: {
          unit: 'cm',
          width: 10,
          height: 10,
          depth: 10,
        },
        weight: {
          unit: 'kg',
          value: 20,
        },
        items: [
          {
            description: '',
            quantity: 1,
            price: {
              currency: 'USD',
              amount: 20,
            },
            item_id: '12',
            origin_country: 'USA',
            weight: {
              unit: 'kg',
              value: 0,
            },
            sku: '1234567890',
            hs_code: '1234567890',
          },
        ],
      },
    },
  });

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    setError(null);
    setLabelUrl(null);

    try {
      const response = await createLabel(data);

      if (response.data?.files?.label?.url) {
        setLabelUrl(response.data.files.label.url);
      } else {
        setError('Please review your data and try again');
      }
    } catch (error: unknown) {
      console.log('Error in createLabel:', error);
      setError('Please review your data and try again');
    } finally {
      setIsLoading(false);
      reset();
    }
  });

  const handleNext = async () => {
    const fieldsToValidate = {
      1: ['ship_from'],
      2: ['ship_to'],
      3: ['parcel'],
    }[currentStep];

    const isValid = await trigger(fieldsToValidate as Array<keyof FormData>);

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className='bg-primary-blue'>
      <div className='rounded-none lg:rounded-tl-[32px] lg:rounded-bl-[32px] bg-white px-8 py-12 flex justify-center relative overflow-y-auto h-dvh'>
        <div
          className={cn(
            'max-w-2xl mx-auto flex-shrink-0 w-full transition-opacity duration-300',
            isLoading && 'opacity-10'
          )}>
          <h3 className='text-3xl font-semibold mb-2'>FedEx Shipping</h3>
          <p className='text-gray-600 mb-10'>Print FedEx shipping labels with ease</p>

          {!labelUrl && (
            <div className='flex items-center justify-center mb-10 pointer-events-none'>
              <div className='flex items-center'>
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= 1 ? 'bg-primary-purple text-white' : 'bg-gray-200'
                  }`}>
                  1
                </span>
                <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary-purple' : 'bg-gray-200'}`} />
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= 2 ? 'bg-primary-purple text-white' : 'bg-gray-200'
                  }`}>
                  2
                </span>
                <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-primary-purple' : 'bg-gray-200'}`} />
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= 3 ? 'bg-primary-purple text-white' : 'bg-gray-200'
                  }`}>
                  3
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-md'>
              <p className='text-red-600 whitespace-pre-line'>{error}</p>
            </div>
          )}

          {labelUrl ? (
            <div className=''>
              <p className='mt-20 mb-2 text-primary-purple text-4xl font-semibold'>Label created successfully!</p>
              <div className='flex items-center gap-4 mt-4'>
                <a
                  href={labelUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-primary-purple/90'>
                  Print Label
                </a>

                <button
                  type='button'
                  onClick={() => {
                    setLabelUrl(null);
                    setCurrentStep(1);
                    reset();
                  }}
                  className='px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-primary-purple/90 cursor-pointer'>
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className='space-y-6'>
              {/* Sender Information */}
              {currentStep === 1 && (
                <AddressForm title='Ship From' prefix='ship_from' register={register} errors={errors} />
              )}

              {/* Recipient Information */}
              {currentStep === 2 && (
                <AddressForm title='Ship To' prefix='ship_to' register={register} errors={errors} />
              )}

              {/* Parcel Information */}
              {currentStep === 3 && <ParcelForm register={register} errors={errors} />}

              <div className='flex justify-between mt-8 pb-8'>
                {currentStep > 1 && (
                  <button
                    type='button'
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className='px-4 py-2 text-primary-purple border border-primary-purple rounded-md hover:bg-primary-purple/10 cursor-pointer'
                    disabled={isLoading}>
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type='button'
                    onClick={handleNext}
                    className='px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-primary-purple/90 ml-auto cursor-pointer'
                    disabled={isLoading}>
                    Next
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-primary-purple/90 ml-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                    disabled={isLoading}>
                    {isLoading ? 'Creating Label...' : 'Create Label'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
        {isLoading && (
          <div className='fixed top-1/2 lg:left-[65vw] -translate-y-1/2'>
            <Image src='/images/delivery-truck.gif' alt='Loading' width={260} height={260} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
