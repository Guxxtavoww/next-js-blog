import React from 'react';

import Footer from '../../components/ui/footer';

export default function Layout({ children }: WithChildren) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
