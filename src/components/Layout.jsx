import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="page py-8 animate-fadeIn">{children}</main>
    </div>
  );
}
