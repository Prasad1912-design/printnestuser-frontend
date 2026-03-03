import React from 'react'

import Header from '../Components_BL/Header';
import Footer from '../Components_BL/Footer';

export default function BeforeLoginLayout({children, open}) {
  return (
 <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header open={open}  />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer always at bottom */}
      <Footer />

   </div>
  )
}
