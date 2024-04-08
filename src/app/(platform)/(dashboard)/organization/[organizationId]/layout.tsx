import { OrgControl } from './_componenets/org-control';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}
