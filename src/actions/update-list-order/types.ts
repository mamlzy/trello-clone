import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';
import { updateListOrderSchema } from './schema';

export type InputType = z.infer<typeof updateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
