import { Sidebar } from '@/app/components/Sidebar/Sidebar.jsx';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="ml-[350px] p-2">{children}</div>
      </body>
    </html>
  );
}
