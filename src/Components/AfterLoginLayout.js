  import React from 'react'
  import Header_AL from './header_al';
  import Footer_AL from './footer_al';
  import ContextLayout from '../Context/CreateContext';

  export default function AfterLoginLayout({ children, logout}) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header_AL logout={logout} />

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer always at bottom */}
        <Footer_AL logout = {logout} />

          <a 
    href="https://wa.me/918793621912?text=Hello%20Print%20Nest%20Team,%20I%20am%20interested%20in%20placing%20an%20order.%20Could%20you%20please%20assist%20me%20with%20the%20details%20%3F" 
    target="_blank" 
    id="whatsappBtn" 
    title="Chat with us"
  >
    <img src="/Images/whatsapp.png" alt="WhatsApp" />
  </a>
      </div>
    )
  }
