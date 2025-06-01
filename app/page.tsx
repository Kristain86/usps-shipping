import Image from 'next/image';
import Form from '@/components/Form/Form';

export default function Home() {
  return (
    <main className='h-dvh grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] overflow-hidden'>
      <div className='bg-primary-blue relative'>
        <Image
          width={600}
          height={600}
          src='/images/truck.webp'
          alt='Truck'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-x-[-1] hidden lg:block'
        />
      </div>
      <Form />
    </main>
  );
}
