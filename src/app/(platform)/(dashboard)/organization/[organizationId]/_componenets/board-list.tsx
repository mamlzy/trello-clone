import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { HelpCircleIcon, User2Icon } from 'lucide-react';

import { MAX_FREE_BOARDS } from '@/constants/boards';
import { db } from '@/lib/db';
import { getAvailableCount } from '@/lib/org-limit';
import { FormPopover } from '@/components/form/form-popover';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';

export async function BoardList() {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-org');

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const availableCount = await getAvailableCount();

  return (
    <div className='space-y-4'>
      <div className='flex items-center text-lg font-semibold text-neutral-700'>
        <User2Icon className='mr-2 size-6' />
        Your Boards
      </div>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className='group relative aspect-video size-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2'
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className='transation absolute inset-0 bg-black/30 group-hover:bg-black/40' />
            <p className='relative font-semibold text-white'>{board.title}</p>
          </Link>
        ))}
        <FormPopover side='right' sideOffset={10}>
          <div
            role='button'
            className='relative flex aspect-video size-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs'>{`${MAX_FREE_BOARDS - availableCount} remaining`}</span>
            <Hint
              sideOffset={40}
              description='Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace'
            >
              <HelpCircleIcon className='absolute bottom-2 right-2 size-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
      <Skeleton className='aspect-video size-full p-2' />
    </div>
  );
};
