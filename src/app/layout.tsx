import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* 渲染 Navbar */}
        <Navbar />
        {/* 渲染页面的子内容 */}
        {children}
      </body>
    </html>
  );
}
