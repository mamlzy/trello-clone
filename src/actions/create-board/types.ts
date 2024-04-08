import { Board } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';
import { createBoardSchema } from './schema';

export type InputType = z.infer<typeof createBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
