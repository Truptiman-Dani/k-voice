// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1' }}>
      <p>&copy; {new Date().getFullYear()} RAG Agent. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
