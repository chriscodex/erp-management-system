import { Sidebar } from '../components/Sidebar';

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
