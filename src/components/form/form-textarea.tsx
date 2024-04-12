'use client';

import { forwardRef, KeyboardEventHandler } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormErrors } from './form-errors';

type Props = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
};

export const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      onBlur,
      onClick,
      onKeyDown,
      className,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className='w-full space-y-2'>
        <div className='w-full space-y-1'>
          {label && (
            <Label
              htmlFor={id}
              className='text-xs font-semibold text-neutral-700'
            >
              {label}
            </Label>
          )}
          <Textarea
            ref={ref}
            id={id}
            name={id}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            disabled={disabled || pending}
            required={required}
            className={cn(
              'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);
