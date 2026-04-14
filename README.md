<div align="center">

# 🌾 KhetSetu — Farm Equipment Sharing & Rental Platform

**Bridging the gap between small-scale farmers and modern agricultural machinery**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

*Small-scale farmers cannot afford expensive agricultural machinery individually, limiting their productivity and efficiency. KhetSetu is a community-based equipment sharing platform that democratizes access to modern farming tools.*

</div>

---

<!-- 

## 📸 Screenshots

| Landing Page | Dashboard | Equipment Listing |
|:---:|:---:|:---:|
| ![Landing Page](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) | ![Equipment](screenshots/equipment.png) |

| Equipment Details | Add Listing | Sign In (OTP) |
|:---:|:---:|:---:|
| ![Equipment Details](screenshots/equipment-details.png) | ![Add Listing](screenshots/add-listing.png) | ![Sign In](screenshots/signin.png) |

-->
---

## 🎯 Problem Statement

In India, **86% of farmers** are small or marginal, farming on less than 2 hectares of land. These farmers:

- ❌ Cannot afford expensive modern agricultural machinery individually
- ❌ Rely on outdated, manual farming methods reducing productivity
- ❌ Lack access to a trustworthy, location-aware platform to share or rent equipment
- ❌ Have no digital infrastructure connecting them to equipment owners in their vicinity

**KhetSetu** solves this by creating a **community-driven, location-aware equipment sharing marketplace** where farmers can list, discover, and rent agricultural machinery from others in their region — affordably, securely, and efficiently.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **OTP-Based Authentication** | Secure, passwordless login via mobile OTP verification with JWT access & refresh tokens |
| 🚜 **Equipment Listings** | Farmers can list their equipment with details, pricing, condition, images, and village location |
| 🔍 **Smart Search** | Search equipment by keyword and category, sorted by geographic proximity using the Haversine formula |
| 📍 **Location-Aware Discovery** | Village-based geolocation system with latitude/longitude enables finding nearby equipment within rental distance |
| 📅 **Instant Booking** | Rent equipment instantly with automated pricing calculation based on rental duration |
| 📊 **Dashboard** | Comprehensive dashboard showing current rentals, active listings, and incoming booking requests |
| 👤 **User Profiles** | Complete profile management with village association and trust score system |
| ⭐ **Ratings & Reviews** | Post-booking rating system to build community trust between equipment owners and renters |
| 🛡️ **Protected Routes** | Role-based route protection on both frontend and backend ensuring secure access |

---

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Java 21** | Core programming language |
| **Spring Boot 4.0.3** | Application framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | ORM & database interaction |
| **JWT (jjwt 0.12.5)** | Stateless token-based auth (access + refresh tokens) |
| **PostgreSQL** | Relational database |
| **Hibernate Validator** | Request validation |
| **Lombok** | Boilerplate reduction |
| **Maven** | Build & dependency management |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **React Router DOM 7** | Client-side routing & protected routes |
| **Tailwind CSS 4.2** | Utility-first styling |
| **ESLint** | Code quality & linting |
---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React 19)                        │
│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌──────────────────┐  │
│  │  Landing  │ │  Auth /  │ │ Equipment │ │    Dashboard     │  │
│  │   Pages   │ │  SignIn  │ │  Browse   │ │  (Rentals/List)  │  │
│  └──────────┘ └──────────┘ └─���─────────┘ └──────────────────┘  │
│          ↕ Protected Routes (JWT in localStorage)               │
└─────────────────────────┬───────────────────────────────────────┘
                          │ REST API (JSON)
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER (Spring Boot 4.0.3)                   │
│                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  JWT Filter  │→│  Controllers  │→│       Services          │ │
│  │  (Security)  │  │              │  │  ┌──────────────────┐  │ │
│  └─────────────┘  │ • Auth       │  │  │ AuthService      │  │ │
│                    │ • Product    │  │  │ ProductService   │  │ │
│  ┌─────────────┐  │ • Booking    │  │  │ BookingService   │  │ │
│  │  Security   │  │ • User       │  │  │ UserService      │  │ │
│  │  Config     │  │ • Public     │  │  │ OtpService       │  │ │
│  └─────────────┘  └──────────────┘  │  └──────────────────┘  │ │
│                                      └───────────┬────────────┘ │
│  ┌─────────────────┐  ┌─────────────┐           │              │
│  │   GeoUtil       │  │  JwtUtil    │           ▼              │
│  │  (Haversine)    │  │             │  ┌─────────────────────┐ │
│  └─────────────────┘  └─────────────┘  │   Repositories      │ │
│                                         │  (Spring Data JPA)  │ │
│                                         └─────────┬───────────┘ │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   PostgreSQL    │
                 │   ┌───────────┐ │
                 │   │  users    │ │
                 │   │  products │ │
                 │   │  bookings │ │
                 │   │  villages │ │
                 │   │  ratings  │ │
                 │   │  templates│ │
                 │   └───────────┘ │
                 └─────────────────┘
```

---

## 🗄️ Database Schema (Entity Relationship)

```
┌──────────────┐       ┌───────────────────┐       ┌──────────────┐
│   Village     │       │     User          │       │   Rating     │
├──────────────┤       ├───────────────────┤       ├──────────────┤
│ id (PK)      │◄──┐   │ id (UUID, PK)     │◄──┐   │ id (UUID,PK) │
│ address      │   └───│ village_id (FK)    │   │   │ booking_id   │
│ latitude     │       │ name              │   │   │ rated_by (FK)│
│ longitude    │       │ mobile (unique)   │   │   │ rated_for(FK)│
└──────────────┘       │ email             │   │   │ rating       │
                       │ trustScore        │   │   │ comment      │
       ┌───────────┐   │ createdAt         │   │   │ createdAt    │
       │ Product   │   └───────────────────┘   │   └──────────────┘
       │ Template  │            │               │
       ├───────────┤            │ owns          │
       │ id (PK)   │◄──┐       ▼               │
       │ name      │   │ ┌───────────────────┐  │
       │ category  │   │ │    Product        │  │
       └───────────┘   │ ├───────────────────┤  │
                       └─│ template_id (FK)  │  │
                         │ id (UUID, PK)     │  │
                         │ owner_id (FK)     │──┘
                         │ village_id (FK)   │
                         │ description       │
                         │ condition         │
                         │ type              │
                         │ priceDay          │──────────┐
                         │ maxRentalDistance  │          │
                         │ imageUrls[]       │          │
                         │ status            │          │
                         └───────────────────┘          │
                                  │                     │
                                  │ has many            │
                                  ▼                     │
                         ┌───────────────────┐          │
                         │    Booking        │          │
                         ├───────────────────┤          │
                         │ id (UUID, PK)     │          │
                         │ product_id (FK)   │◄─────────┘
                         │ renter_id (FK)    │
                         │ owner_id (FK)     │
                         │ status            │
                         │ startTime         │
                         │ endTime           │
                         │ totalPrice        │
                         │ paymentStatus     │
                         └───────────────────┘
```

---

## 🔌 API Endpoints

### 🔓 Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/send-otp` | Send OTP to mobile number |
| `POST` | `/api/auth/verify-otp` | Verify OTP and receive JWT tokens |
| `POST` | `/api/auth/refresh` | Refresh access token using cookie |
| `POST` | `/api/auth/logout` | Logout and clear refresh token |

### 🚜 Products (`/api/products`) — 🔒 Authenticated
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products/search?query=&category=` | Search equipment by keyword & category |
| `GET` | `/api/products/{id}` | Get single product details |
| `POST` | `/api/products` | Create a new equipment listing |
| `PUT` | `/api/products/{id}` | Update an existing listing |
| `DELETE` | `/api/products/{id}` | Delete a listing |
| `GET` | `/api/products/my` | Get current user's listings |

### 📅 Bookings (`/api/bookings`) — 🔒 Authenticated
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create a new booking |
| `PATCH` | `/api/bookings/{id}/cancel` | Cancel a booking |
| `PATCH` | `/api/bookings/{id}/complete` | Mark booking as completed (owner) |
| `GET` | `/api/bookings/dashboard` | Get dashboard data (rentals, listings, renters) |

### 👤 Users (`/api/users`) — 🔒 Authenticated
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users/me` | Get current user profile |
| `PUT` | `/api/users/me` | Update current user profile |
| `GET` | `/api/users/{id}` | Get user public info |

### 🌍 Public (`/api/public`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/public/templates` | Get all product templates |
| `GET` | `/api/public/villages/search?query=` | Search villages by address |
| `GET` | `/api/public/health-check` | Health check endpoint |

---

## 📁 Project Structure

```
KhetSetu/
├── KhetSetu Backend/                          # Spring Boot Application
│   ├── src/main/java/com/khetsetu/
│   │   ├── KhetsetuApplication.java           # Main entry point
│   │   ├── configuration/
│   │   │   └── SecurityConfiguration.java     # Spring Security + CORS + JWT config
│   │   ├── controller/
│   │   │   ├── AuthController.java            # OTP login, token refresh, logout
│   │   │   ├── ProductController.java         # CRUD for equipment listings
│   │   │   ├── BookingController.java         # Booking lifecycle management
│   │   │   ├── UserController.java            # Profile management
│   │   │   └── PublicController.java          # Templates, village search, health
│   │   ├── model/
│   │   │   ├── User.java                      # User entity (mobile, village, trust)
│   │   │   ├── Product.java                   # Equipment listing entity
│   │   │   ├── Booking.java                   # Rental booking entity
│   │   │   ├── Village.java                   # Geo-location entity
│   │   │   ├── Rating.java                    # Review & rating entity
│   │   │   ├── ProductTemplate.java           # Equipment category templates
│   │   │   ├── dto/request/                   # Request DTOs with validation
│   │   │   ├── dto/response/                  # Response DTOs
│   │   │   └── enums/                         # BookingStatus, ProductStatus, Priority
│   │   ├── repository/                        # Spring Data JPA repositories
│   │   ├── service/
│   │   │   ├── AuthService.java               # OTP generation, JWT auth flow
│   │   │   ├── ProductService.java            # Listing CRUD, geo-search
│   │   │   ├── BookingService.java            # Booking logic, dashboard
│   │   │   ├── UserService.java               # Profile management
│   │   │   ├── UserDetailService.java         # Spring Security UserDetails
│   │   │   └── OtpService.java                # OTP generation & validation
│   │   ├── filter/
│   │   │   └── JwtFilter.java                 # JWT authentication filter
│   │   └── utilis/
│   │       ├── JwtUtil.java                   # JWT token creation & parsing
│   │       └── GeoUtil.java                   # Haversine distance calculation
│   └── pom.xml                                # Maven dependencies
│
├── KhetSetu frontend/                         # React Application
│   ├── src/
│   │   ├── main.jsx                           # Router configuration & entry point
│   │   ├── App.jsx                            # App wrapper
│   │   ├── AppLayout.jsx                      # Authenticated layout
│   │   ├── landing_layout.jsx                 # Public landing layout
│   │   ├── pages/
│   │   │   ├── landing/
│   │   │   │   ├── Home.jsx                   # Landing page with hero & features
│   │   │   │   ├── About.jsx                  # About page
│   │   │   │   └── Signin.jsx                 # OTP-based sign in
│   │   │   └── app/
│   │   │       ├── Dashboard.jsx              # Rentals, listings, renters overview
│   │   │       ├── Equipment.jsx              # Browse & search equipment
│   │   │       ├── EquipmentDetails.jsx       # Single equipment detail view
│   │   │       ├── AddListing.jsx             # Create new equipment listing
│   │   │       ├── Profile.jsx                # User profile page
│   │   │       ├── CompleteProfile.jsx        # First-time profile setup
│   │   │       └── EditProfile.jsx            # Edit profile
│   │   ├── components/
│   │   │   ├── ProtectedRoutes.jsx            # JWT-based route guard
│   │   │   ├── app_components/                # Authenticated UI components
│   │   │   └── static/                        # Static UI components (Navbar, Footer)
│   │   └── services/
│   │       └── apiFetch.js                    # API utility with auth headers
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 21** (JDK)
- **Maven 3.9+**
- **Node.js 20+** & **npm**
- **PostgreSQL 15+**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pranaypanakanti/KhetSetu.git
cd KhetSetu
```

### 2️⃣ Backend Setup

```bash
cd "KhetSetu Backend"
```

Create `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/khetsetu
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=your_secret_key_here
jwt.access.expiration=900000
jwt.refresh.expiration=604800000

# Server
server.port=8080
```

Run the backend:

```bash
./mvnw spring-boot:run
```

The API server will start at `http://localhost:8080`

### 3️⃣ Frontend Setup

```bash
cd "KhetSetu frontend"
```

Create a `.env` file:

```env
VITE_BASE_URL=http://localhost:8080
```

Install dependencies & run:

```bash
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`

---

## 🔐 Authentication Flow

```
┌──────────┐          ┌──────────┐          ┌──────────┐
│  Client   │          │  Server   │          │ OTP Svc  │
└────┬─────┘          └────┬─────┘          └────┬─────┘
     │  POST /send-otp     │                     │
     │────────────────────►│  Generate OTP       │
     │                     │────────────────────►│
     │                     │◄────────────────────│
     │    200 OK           │                     │
     │◄────────────────────│                     │
     │                     │                     │
     │  POST /verify-otp   │                     │
     │────────────────────►│  Validate OTP       │
     │                     │  Generate JWT Pair   │
     │  { accessToken,     │                     │
     │    refreshToken     │                     │
     │    (httpOnly cookie)}│                     │
     │◄────────────────────│                     │
     │                     │                     │
     │  Authenticated API  │                     │
     │  Authorization:     │                     │
     │  Bearer <token>     │                     │
     │────────────────────►│  Validate JWT       │
     │  Response           │                     │
     │◄────────────────────│                     │
```

---

## 🌍 Geo-Location Search — Haversine Formula

KhetSetu uses the **Haversine formula** to calculate the great-circle distance between two points on Earth, enabling farmers to find nearby equipment within their rental radius:

```
a = sin²(Δlat/2) + cos(lat₁) · cos(lat₂) · sin²(Δlon/2)
d = 2R · atan2(√a, √(1−a))
```

This ensures search results are sorted by **actual geographic distance**, not just text matching.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 👨‍💻 Authors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/pranaypanakanti">
        <img src="https://avatars.githubusercontent.com/u/211188683?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Pranay Panakanti</b></sub>
      </a>
      <br />
      <sub>Backend & Architecture</sub>
    </td>
    <td align="center">
      <a href="https://github.com/theguy1234567">
        <img src="https://avatars.githubusercontent.com/u/0?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>theguy1234567</b></sub>
      </a>
      <br />
      <sub>Frontend & UI</sub>
    </td>
  </tr>
</table>

---


<div align="center">


*Built with ❤️ for Indian farmers*

[🐛 Report Bug](https://github.com/pranaypanakanti/KhetSetu/issues) · [💡 Request Feature](https://github.com/pranaypanakanti/KhetSetu/issues)

</div>
