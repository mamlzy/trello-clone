'use client';

import Link from 'next/link';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { NavItem, Organization } from './nav-item';

type Props = {
  storageKey?: string;
};

export function Sidebar({ storageKey = 't-sidebar-state' }: Props) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: true,
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className='mb-2 flex items-center justify-between'>
          <Skeleton className='h-10 w-1/2' />
          <Skeleton className='size-10' />
        </div>
        <div className='space-y-2'>
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='mb-1 flex items-center text-xs font-medium'>
        <span className='pl-4'>Workspaces</span>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          asChild
          className='ml-auto'
        >
          <Link href='/select-org'>
            <Plus className='size-4' />
          </Link>
        </Button>
      </div>
      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
}
