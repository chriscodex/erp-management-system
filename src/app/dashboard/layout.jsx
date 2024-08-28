import { Sidebar } from '../components/Sidebar';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
