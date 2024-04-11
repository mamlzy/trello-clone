'use client';

import Image from 'next/image';
import { useOrganization } from '@clerk/nextjs';
import { CreditCardIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

export function Info() {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className='flex items-center gap-x-4'>
      <Image
        src={organization?.imageUrl!}
        alt='Organization'
        width='0'
        height='0'
        sizes='100vw'
        className='size-[60px] object-cover'
        quality={100}
      />
      <div className='space-y-1'>
        <p className='text-xl font-semibold'>{organization?.name}</p>
        <div className='flex items-center text-xs text-muted-foreground'>
          <CreditCardIcon className='mr-1 size-3' /> Free
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
Info.Skeleton = function SkeletonInfo() {
  return (
    <div className='flex items-center gap-x-4'>
      <Skeleton className='size-[60px]' />
      <div className='space-y-2'>
        <Skeleton className='h-10 w-[200px]' />
        <div className='flex items-center'>
          <Skeleton className='mr-2 size-4' />
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </div>
    </div>
  );
};
