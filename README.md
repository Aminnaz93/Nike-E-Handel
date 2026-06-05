# Nazari Shop – Nike E-handel

En Nike-inspirerad e-handelsapplikation


För att köra applikationen: 

## Backend


* cd Nike-backend
* npm install
* npm run dev

Backend körs på: http://localhost:3000

## Frontend


* cd Nike-frontend/nike-frontend
* npm install
* npm run dev

Frontend körs på: http://localhost:5173

## Miljövariabler

VIKTIGT: Skapa en `.env` fil i `Nike-backend/` med följande innehåll:

MONGO_URI=din_mongodb_uri
JWT_SECRET=din_hemliga_nyckel
PORT=3000


## Paket

### Backend (Nike-backend/)

| Paket | Användning |
|-------|-----------|
| express | Webbserver och routing |
| mongoose | Koppling till MongoDB |
| jsonwebtoken | JWT-autentisering |
| bcrypt | Kryptering av lösenord |
| dotenv | Läser .env-filen |
| cors | Tillåter anrop från frontend |
| nodemon | Startar om servern automatiskt vid ändringar |


### Frontend (Nike-frontend/nike-frontend/)

| Paket | Användning |
|-------|-----------|
| react | UI-bibliotek |
| react-dom | Renderar React i webbläsaren |
| react-router-dom | Navigering mellan sidor |
| vite | Byggverktyg och utvecklingsserver |



## Mappstruktur

```
Nike - React - Inlämningsprojekt/
├── Nike-frontend/
│   └── nike-frontend/
│       └── src/
│           ├── pages/        # Home, Cart, Checkout, Login osv.
│           ├── components/   # Navbar, Footer
│           ├── context/      # CartContext, AuthContext
│           ├── services/     # api.js
│           └── App.jsx       # Routing
│
└── Nike-backend/
    ├── controllers/          # Logik för produkter, användare, ordrar
    ├── models/               # Mongoose-modeller
    ├── routes/               # API-routes
    ├── middleware/           # JWT-validering
    └── server.js             # Startpunkt



