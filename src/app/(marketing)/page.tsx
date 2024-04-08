import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';
import { MedalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
});

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div
        className={cn(
          'flex flex-col items-center justify-center',
          headingFont.className
        )}
      >
        {/* Badge */}
        <div className='mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm'>
          <MedalIcon className='mr-2 size-6' />
          No 1 task management
        </div>
        <h1 className='mb-6 text-center text-3xl text-neutral-800 md:text-6xl'>
          Tasktify helps team move
        </h1>
        <div className='w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 text-3xl text-white md:text-6xl'>
          work forward.
        </div>
      </div>
      <div
        className={cn(
          'mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        rises to the home office, the way your team works is unique - accomplish
        it all with Tasktify.
      </div>
      <Button size='lg' asChild className='mt-6'>
        <Link href='/sign-up'>Get Tasktify for free</Link>
      </Button>
    </div>
  );
}
