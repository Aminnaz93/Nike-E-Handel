// bas url till backend. alla api anrop börjar med denna adressen
const API_BASE = "http://localhost:3000/api";

// en central funktion som alla api anrop går igenom 
//path är vilken endpoint t.ex "/products"
//options . method , body o grejer....
async function request(path, options = {}) {
  // hämtar alla headers från options, eller skapa ett tomt objekt om det inte finns några
  const headers = options.headers || {};
  // Tala om för backend att vi skickar JSON-data
  headers["Content-Type"] = "application/json";

  
  // Kolla om det finns en token sparad i localStorage (om användaren är inloggad)
  const token = localStorage.getItem("token");
  if (token) {
    //om token finns - lägg till den i headern så backend vet vem du är 
    headers["Authorization"] = `Bearer ${token}`;
  }
   // Skicka fetch-anropet till backend
  // Kombinerar API_BASE + path t.ex "http://localhost:3000/api/products"
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Läs svaret från backend som text först
  const text = await response.text();
  let data;

  try {
    // Försök omvandla texten till JSON om det finns något svar
    data = text ? JSON.parse(text) : null;
  } catch {
    //annars behåller man det som text
    data = text;
  }
  
  // Om backend svarade med ett fel (t.ex 401, 400, 500) — kasta ett fel
  if (!response.ok) throw new Error("Request failed");
  // Returnera datan till den som anropade funktionen
  return data;
}



// Hämta alla produkter från backend
// GET /api/products — public, ingen token krävs
export async function getProducts() {
  return request("/products", {
    method: "GET",
  });
}


//skapa en order 
//Post /api/orders - privat .  token behövs 
// orderData = items , totalprice, paymentMethod
export async function createOrder(orderData) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

// hämta inloggades användarens order
//Get api/orders - privat, token behövs 
export async function getOrders() {
  return request("/orders", {
    method: "GET",
  });
}

//Logga in user
//Post - api/users/login - public . ingen token behövs
//formData - {email, password}
export async function loginUser(formData) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

//Registera User
//Post . api/users/register . public . ingen token behövs
//formdata = {name, email, password}
export async function registerUser(formData) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}