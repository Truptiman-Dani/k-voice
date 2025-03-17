import React from 'react';
import Navbar from './Navbar';  // Make sure Navbar is imported
import Footer from './Footer';  // Make sure Footer is imported

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 160px)', paddingBottom: '20px' }}>
        {children}  {/* This is where the page content will be injected */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
