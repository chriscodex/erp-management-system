import { Sidebar } from '@/app/components/Sidebar/Sidebar.jsx';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className='pl-[350px]'>{children}</div>
      </body>
    </html>
  );
}
