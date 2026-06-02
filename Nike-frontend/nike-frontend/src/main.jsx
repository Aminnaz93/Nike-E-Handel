import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // global css för ehela appen
import App from './App.jsx' // importerar huvudkomponent - hela appen börjar här
import { CartProvider } from './context/CartContext' // CartProvider är den globala varukorgen - det menas att allt som ligger inuti den har tillgång till varukorgsdatan.
import { AuthProvider } from './context/AuthContext.jsx' // // AuthProvider är den globala inloggningsstaten - det som ligger inuti den vet om du är inloggad eller utloggad



createRoot(document.getElementById('root')).render(
  // Hittar <div id="root"> i index.html
  // Det är där hela React-appen renderas in
  <StrictMode>
    {/* // Lägger inloggningsdata tillgänglig för HELA appen */}
    <AuthProvider> 
      {/* Lägger varukorgsdata tillgänglig för hela appen */}
    <CartProvider>
      {/* // Hela appen — alla sidor och komponenter */}
    <App />
    </CartProvider>
    </AuthProvider>
  </StrictMode>,
)


//ordningen på providers spelar roll. 
//AUTHProvider är ytterst = hela appen vet om att du är inloggad eller inte men också CartProvider.
//App är innerst - det menas att den får tillgång till allt då!
//Provider är en komponent som delar ut data till alla komponenter som ligger inuti den.