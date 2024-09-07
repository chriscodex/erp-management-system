import { Sidebar } from '@/app/components/Sidebar/Sidebar.jsx';
 
export default function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <div className="ml-[350px] p-2">{children}</div>
    </div>
  );
}