import { deleteBoard } from '@/actions/delete-board';

import { FormDelete } from './form-delete';

type Props = {
  id: string;
  title: string;
};

export function Board({ id, title }: Props) {
  const deleteBoardWithId = deleteBoard.bind(null, id);

  return (
    <form action={deleteBoardWithId} className='flex items-center gap-x-2'>
      <p>Board name: {title}</p>
      <FormDelete />
    </form>
  );
}
