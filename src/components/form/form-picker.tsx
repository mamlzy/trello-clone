import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon, Loader2Icon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { defaultImages } from '@/constants/images';
import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { FormErrors } from './form-errors';

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export function FormPicker({ id, errors }: Props) {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Record<string, any>[];
          setImages(newImages);
          return;
        }

        console.log('Failed to get images from Unsplash');
      } catch (err) {
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    <div className='flex items-center justify-center p-6'>
      <Loader2Icon className='size-6 animate-spin text-sky-700' />
    </div>;
  }

  return (
    <div className='relative'>
      <div className='mb-2 grid grid-cols-3 gap-2'>
        {images.map((image) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            key={image.id}
            className={cn(
              'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
              pending && 'cursor-auto opacity-50 hover:opacity-50'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt='Unsplash image'
              width='0'
              height='0'
              sizes='100vw'
              className='size-full rounded-sm object-cover'
              quality={100}
            />
            {selectedImageId === image.id && (
              <div className='absolute inset-y-0 flex w-full items-center justify-center bg-black/30'>
                <CheckIcon className='size-4 text-white' />
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  );
}
