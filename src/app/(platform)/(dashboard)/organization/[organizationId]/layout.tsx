import { Metadata } from 'next';
import { auth } from '@clerk/nextjs';

import { startCase } from '@/lib/utils';
import { OrgControl } from './_componenets/org-control';

export async function generateMetadata(): Promise<Metadata> {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || 'Organization'),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}
