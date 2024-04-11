import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function startCase(input: string): string {
  // Replace underscores, hyphens, and other non-alphanumeric characters with spaces
  const stringWithSpaces = input.replace(/[_-]+/g, ' ');

  // Split the modified string into words
  const words = stringWithSpaces.split(/\s+/);

  // Capitalize the first letter of each word and convert the rest to lowercase
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the capitalized words back into a string
  const result = capitalizedWords.join(' ');

  return result;
}
