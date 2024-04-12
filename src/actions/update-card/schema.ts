import { z } from 'zod';

export const updateCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description is required',
    })
    .min(3, { message: 'Description is too short' })
    .optional(),
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, {
      message: 'Title is too short',
    })
    .optional(),
});
