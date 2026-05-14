
# Global Enterprise - Frontend

A modern, secure, and professional Global enterprise management platform built with Next.js 16, featuring role-based authentication, dynamic dashboards, and a sleek UI/UX experience.


## 🌐 Live Demo

- **Frontend:** [https://global-enterprise-frontend.vercel.app](https://global-enterprise-frontend.vercel.app) 
- **GitHub Frontend:** [https://github.com/TahmidRahman32/global_enterprise_frontend](https://github.com/TahmidRahman32/global_enterprise_frontend)
- **GitHub Backend:** [https://github.com/TahmidRahman32/global_enterprise_backend](https://github.com/TahmidRahman32/global_enterprise_backend)

---

## ✨ Key Features

### 🔐 Security & Authentication
- **Role-Based Access Control (RBAC)** — Separate dashboards for Admin and User roles
- **JWT Authentication** — Secure token-based auth with HTTP-only cookies
- **Protected Routes** — Server-side route protection with Proxy file
- **Session Management** — Automatic token refresh and expiry handling

### 👥 User Roles & Permissions
- **Admin Panel** — Full control over users, products, orders, and system settings
- **User Dashboard** — Personal profile, order management, inbox, and settings
- **Dynamic Navigation** — Role-specific sidebar menus and access controls

### 📦 Core Functionality
- **Product Management** — Browse, filter, and view detailed product information
- **Order Tracking** — Real-time order status updates with filter/search capabilities
- **Inbox System** — User-admin messaging with read/unread states
- **Profile Management** — Update personal information, change password, upload profile photos

### 🎨 Modern UI/UX
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Dark Mode Support** — System-aware theme with manual toggle
- **Smooth Animations** — Framer Motion page transitions and micro-interactions
- **Loading States** — Global loader, skeleton screens, and progressive loading
- **Toast Notifications** — Real-time feedback with Sonner

### 🛡️ Error Handling
- **Custom 404 Page** — User-friendly not found experience
- **Error Boundaries** — Graceful error recovery
- **Form Validation** — Zod schema validation 
- **API Error Handling** — Comprehensive error messages and retry logic

---

## 🚀 Tech Stack

### Core Framework
- **Next.js 16.2.4** — App Router, Server Components, Server Actions
- **React 19.2.4** — Latest React features with concurrent rendering
- **TypeScript 5** — Type-safe development

### UI & Styling
- **Tailwind CSS 4** — Utility-first styling with custom design tokens
- **shadcn/ui** — Accessible, customizable component library
- **Framer Motion** — Declarative animations and gestures
- **Lucide React** — Modern icon library

### Forms & Validation
- **React Hook Form** — Performant form state management
- **Zod** — TypeScript-first schema validation
- **Input OTP** — Secure one-time password inputs

### Data Visualization
- **Recharts** — Composable charting library
- **Date-fns** — Modern date utility library

### State & Data Fetching
- **Server Actions** — Type-safe server mutations
- **Server Components** — Zero-bundle server data fetching
- **Revalidation Tags** — Granular cache invalidation

### 3D & Advanced UI
- **Swiper** — Touch slider library

---

## 📁 Project Structure

```
global_enterprise_frontend/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (auth)/                  # Auth layout group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboardLayout)/       # Dashboard layout group
│   │   │   ├── admin/dashboard/     # Admin routes
│   │   │   ├── user/dashboard/      # User routes
│   │   │   ├── my-profile/
│   │   │   ├── settings/
│   │   │   └── change-password/
│   │   ├── (public)/                # Public layout group
│   │   │   ├── product/
│   │   │   ├── service/
│   │   │   └── contact/
│   │   ├── layout.tsx               # Root layout
│   │   └── not-found.tsx            # 404 page
│   ├── components/
│   │   ├── module/                  # Feature-specific components
│   │   │   ├── Dashboard/
│   │   │   ├── Orders/
│   │   │   ├── Products/
│   │   │   └── Inbox/
│   │   ├── shared/                  # Reusable components
│   │   │   ├── GlobalLoader.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/                      # shadcn/ui components
│   │   └── services/                # API client logic
│   ├── lib/
│   │   ├── server-fetch.ts          # Server-side API client
│   │   ├── utils.ts                 # Utility functions
│   │   └── formatters.ts            # Data formatters
│   ├── hooks/                       # Custom React hooks
│   ├── types/                       # TypeScript type definitions
│   └── middleware.ts                # Next.js middleware for auth
├── public/                          # Static assets
├── .env.local                       # Environment variables
└── package.json
```

---

<!-- ## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 20+ and npm/yarn/pnpm
- **Backend API** running (see backend repository)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/global_enterprise_frontend.git
cd global_enterprise_frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-key

# Optional: Analytics, etc.
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm run start
```

--- -->

## 🔑 Authentication Flow

1. **Login** — User submits credentials → Backend validates → Returns JWT token
2. **Token Storage** — Token stored in HTTP-only cookie (secure)
3. **Middleware Check** — Next.js middleware/proxy validates token on protected routes
4. **Auto Refresh** — Token automatically refreshed before expiry
5. **Logout** — Token removed from cookies, user redirected to login

---

## 📄 Available Routes

### Public Routes
- `/` — Home page
- `/product` — Product catalog
- `/product/:id` — Product details
- `/service` — Services page
- `/contact` — Contact form
- `/login` — User login
- `/register` — User registration

### Protected Routes (User)
- `/user/dashboard` — User dashboard overview
- `/user/dashboard/my-order` — Order history and tracking
- `/user/dashboard/user-inbox` — Message inbox

### Protected Routes (Admin)
- `/admin/dashboard` — Admin dashboard overview
- `/admin/dashboard/user-list` — User management
- `/admin/dashboard/my-product` — Product management
- `/admin/dashboard/add-product` — Add new product
- `/admin/dashboard/oder-list` — Order management
- `/admin/dashboard/inbox` — Admin inbox

### Shared Protected Routes
- `/my-profile` — Profile management
- `/settings` — Account settings
- `/change-password` — Password change

---

## 🎨 UI Components

### shadcn/ui Components Used
- Avatar, Badge, Button, Card
- Dialog, Dropdown Menu, Input, Label
- Select, Separator, Skeleton, Table
- Textarea, Toast (Sonner), Tooltip

### Custom Components
- `GlobalLoader` — Full-page route transition loader
- `StatusBadge` — Order/user status indicators
- `OrderCard` — Order display card with actions
- `UserList` — User management table
- `DashboardSidebar` — Collapsible navigation
- `Inbox` — Gmail-style message interface

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
<!-- 
## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

--- -->

## 👨‍💻 Developer

**Tahmid Rahman**
- Email: gaziur.tahmid@gmail.com
- GitHub: [TahmidRahman32](https://github.com/TahmidRahman32?tab=repositories)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

---

## 📞 Support

For support, email gaziur.tahmid@gmail.com or open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js 16 and modern web technologies**