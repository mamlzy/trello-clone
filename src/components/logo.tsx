import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import LogoSvg from 'public/logo.svg';

import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
});

export function Logo() {
  return (
    <Link href='/'>
      <div className='hidden items-center gap-x-2 transition hover:opacity-75 md:flex'>
        <Image
          src={LogoSvg}
          alt='Logo'
          width='0'
          height='0'
          sizes='100vw'
          className='size-[30px]'
          quality={100}
        />
        <p className={cn('text-lg text-neutral-700', headingFont.className)}>
          Tasktify
        </p>
      </div>
    </Link>
  );
}
