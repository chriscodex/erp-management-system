import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({ children }) {
  return (
    <>
      <AppSidebar />
      {children}
    </>
  );
}
