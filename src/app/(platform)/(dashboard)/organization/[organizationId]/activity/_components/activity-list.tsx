import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/db';
import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';

export async function ActivityList() {
  const { orgId } = auth();

  if (!orgId) redirect('/select-org');

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <ol className='mt-4 space-y-4'>
      <p className='hidden text-center text-xs text-muted-foreground last:block'>
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
}

// eslint-disable-next-line react/function-component-definition
ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className='mt-4 space-y-4'>
      <Skeleton className='h-14 w-4/5' />
      <Skeleton className='h-14 w-1/2' />
      <Skeleton className='h-14 w-[70%]' />
      <Skeleton className='h-14 w-4/5' />
      <Skeleton className='h-14 w-3/4' />
    </ol>
  );
};
