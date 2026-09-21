# 🚀 Tushar Faruk — Brand & Visual Identity Designer Portfolio & Admin CMS

> A high-performance, dark-theme portfolio website and full-featured Admin Content Management System built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **MongoDB + Mongoose**, **NextAuth**, and **Cloudinary**.

---

## 📸 Overview & Features

- **Pixel-Perfect Dark Aesthetics**: Deep navy backgrounds (`#0B0F19`), neon gradient accents (purple $\rightarrow$ blue $\rightarrow$ pink), glassmorphic cards, and custom scrollbars.
- **Micro-Animations & Smooth Motion**: Spring-physics route transitions (`[0.16, 1, 0.3, 1]`), scroll progress indicators, and radiant card hover glows.
- **Zero Cumulative Layout Shift (CLS)**: Custom shimmer image skeleton loaders.
- **Behance-Style Project Case Studies**: Seamless vertical imagery streams, project metadata, tool stack tags, and related case studies.
- **Telegram Bot Inquiries**: Instant notification alerts sent to your Telegram channel or personal chat when a client submits the contact form.
- **Complete Admin Panel (`/admin`)**:
  - Full CRUD operations for Projects, Services, Testimonials, and Site Settings.
  - Multi-image uploads direct to Cloudinary or via external image URLs.
  - Behance-style project layout switcher (Stream / 2-Column / Masonry).
  - Real-time client inquiry inbox.
- **SEO & Social Sharing Ready**: Embedded `schema.org/Person` JSON-LD, dynamic OpenGraph/Twitter cards, dynamic `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server Components & Server Actions) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism & Keyframes |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with [Mongoose](https://mongoosejs.com/) |
| **Authentication** | [NextAuth.js v4](https://next-auth.js.org/) (Credentials Provider + JWT Sessions) |
| **Media & Storage** | [Cloudinary SDK](https://cloudinary.com/) (Direct Upload & Responsive Optimization) |
| **Notifications** | [Telegram Bot API](https://core.telegram.org/bots/api) |
| **Icons** | [Lucide React](https://lucide.dev/) with Custom SVG Gradient Masks |

---

## 🔐 Environment Variables Reference

Create a `.env.local` file in the root directory for local development:

```env
# ==============================================================================
# 1. DATABASE (MongoDB Atlas)
# ==============================================================================
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net/portfolio?retryWrites=true&w=majority

# ==============================================================================
# 2. MEDIA STORAGE (Cloudinary)
# ==============================================================================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ==============================================================================
# 3. NOTIFICATIONS (Telegram Bot)
# ==============================================================================
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# ==============================================================================
# 4. AUTHENTICATION & ADMIN (NextAuth)
# ==============================================================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
ADMIN_EMAIL=admin@markdavis.design
ADMIN_PASSWORD=YourStrongPasswordHere!
```

### Variable Details

| Variable | Description | Where to Get |
| :--- | :--- | :--- |
| `MONGODB_URI` | Connection string for MongoDB Atlas database. | [MongoDB Atlas Console](https://cloud.mongodb.com/) $\rightarrow$ Connect $\rightarrow$ Drivers. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary account cloud identifier. | [Cloudinary Dashboard](https://console.cloudinary.com/) $\rightarrow$ Account Details. |
| `CLOUDINARY_API_KEY` | Public API Key for Cloudinary SDK. | Cloudinary Dashboard $\rightarrow$ API Keys. |
| `CLOUDINARY_API_SECRET` | Secret API Key for Cloudinary image uploads. | Cloudinary Dashboard $\rightarrow$ API Keys. |
| `TELEGRAM_BOT_TOKEN` | API Token for the Telegram Notification Bot. | Generated from [@BotFather](https://t.me/BotFather) on Telegram. |
| `TELEGRAM_CHAT_ID` | Telegram User or Group ID that receives contact leads. | Retrieve from [@userinfobot](https://t.me/userinfobot) or [@getidsbot](https://t.me/getidsbot). |
| `NEXTAUTH_URL` | Canonical URL of your application (`http://localhost:3000` locally, `https://your-domain.vercel.app` in production). | Set to your live production domain. |
| `NEXTAUTH_SECRET` | 32+ character random string for signing JWT tokens. | Run `openssl rand -base64 32` in terminal. |
| `ADMIN_EMAIL` | Superadmin login email for `/admin/login`. | Custom choice (e.g., `admin@markdavis.design`). |
| `ADMIN_PASSWORD` | Superadmin login password for `/admin/login`. | Choose a strong password. |

---

## ⚙️ Step-by-Step Service Setup Guides

### 1. 🍃 MongoDB Atlas Setup
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create a free **M0 Shared Cluster**.
3. Go to **Security** $\rightarrow$ **Database Access**:
   - Add a new Database User with **Read and write to any database** privileges.
   - Set a secure password.
4. Go to **Security** $\rightarrow$ **Network Access**:
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) so serverless Vercel function instances can connect.
5. Go to **Deployments** $\rightarrow$ **Database** $\rightarrow$ **Connect**:
   - Select **Drivers** (Node.js).
   - Copy the connection string and replace `<username>` and `<password>`.
   - Add the database name `/portfolio` before `?retryWrites=true`.

---

### 2. ☁️ Cloudinary Media Setup
1. Sign up for a free account at [Cloudinary](https://cloudinary.com/).
2. Navigate to the **Dashboard**.
3. Copy:
   - **Cloud Name** $\rightarrow$ `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key** $\rightarrow$ `CLOUDINARY_API_KEY`
   - **API Secret** $\rightarrow$ `CLOUDINARY_API_SECRET`
4. (Optional) In **Settings** $\rightarrow$ **Upload**, configure automatic format and quality optimization (`f_auto,q_auto`).

---

### 3. 🤖 Telegram Bot Integration Setup
1. Open Telegram and search for [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts to name your bot (e.g. `Mark Davis Leads Bot`).
3. Copy the HTTP API token provided by BotFather $\rightarrow$ `TELEGRAM_BOT_TOKEN`.
4. Start a chat with your new bot and click **Start**.
5. To get your personal chat ID:
   - Search for [@userinfobot](https://t.me/userinfobot) on Telegram and click **Start**.
   - Copy the numerical ID $\rightarrow$ `TELEGRAM_CHAT_ID`.
6. *(Optional)* If you want notifications sent to a group channel:
   - Add your bot as an admin to the group.
   - Send any message in the group.
   - Query `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` to find the group's negative chat ID.

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mark-davis-portfolio.git
   cd mark-davis-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Fill in all environment variables in .env.local
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Seed Sample Data (Optional):**
   Visit `http://localhost:3000/api/seed` or click **Seed Database** in the Admin panel to populate initial projects, services, and testimonials.

---

## 🚢 Deploying to Vercel (Production)

### Method 1: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete production ready portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/mark-davis-portfolio.git
   git push -u origin main
   ```

2. **Import Project into Vercel:**
   - Go to [vercel.com](https://vercel.com) and click **Add New...** $\rightarrow$ **Project**.
   - Select your GitHub repository.
   - Framework Preset: **Next.js** (auto-detected).
   - Root Directory: `./`.

3. **Add Environment Variables in Vercel:**
   Under **Environment Variables**, add all keys from your `.env.local`:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` *(set to `https://your-project.vercel.app`)*
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

4. **Click Deploy:**
   - Vercel will build the production bundle and deploy globally on their Edge network.
   - Once deployed, open your live link (e.g., `https://mark-davis-portfolio.vercel.app`).

5. **Initial Data Seeding on Production:**
   - Visit `https://your-project.vercel.app/api/seed` once to populate your MongoDB Atlas cluster with starting content.

---

## 🗂️ Project Directory Structure

```
├── app/
│   ├── admin/                 # Admin CMS (Dashboard, Projects, Services, Settings, Login)
│   ├── api/                   # Serverless API routes (CRUD, Upload, Auth, Telegram, Seed)
│   ├── projects/[id]/         # Dynamic Behance-style Project Case Study pages
│   ├── globals.css            # Global design tokens, keyframes, scrollbar, utilities
│   ├── layout.tsx             # Root layout with JSON-LD schema & meta tags
│   ├── page.tsx               # Main portfolio landing page
│   ├── robots.ts              # Dynamic robots.txt
│   └── sitemap.ts             # Dynamic XML sitemap generator
├── components/
│   ├── admin/                 # Admin sidebar, header, stat cards, project forms
│   ├── layout/                # Desktop fixed sidebar & responsive mobile drawer
│   ├── project/               # Project detail gallery & Behance continuous stream
│   ├── sections/              # Hero, Services, Projects, Metrics, Testimonials, Contact
│   ├── shared/                # ScrollProgressBar, PageTransition, ImageWithSkeleton
│   └── ui/                    # Reusable GradientIcon, badges, buttons
├── lib/
│   ├── auth.ts                # NextAuth session and credentials configuration
│   ├── cloudinary.ts          # Server-side Cloudinary upload handler
│   ├── db.ts                  # Cached MongoDB connection manager
│   ├── models/                # Mongoose schemas (Project, Service, Testimonial, etc.)
│   └── telegram.ts            # Telegram Bot API notification dispatcher
├── types/
│   └── index.ts               # Shared TypeScript models and interface definitions
├── .env.example               # Environment template for contributors
├── next.config.ts             # Next.js image domain whitelist & configuration
└── tailwind.config.ts         # Tailwind design system tokens
```

---

## 🔒 Security & Best Practices

- `.gitignore` strictly protects `.env*.local` and local credentials from git commits.
- API endpoints under `/api/admin/*` and upload routes require an authenticated NextAuth session.
- Cloudinary secret keys and Telegram bot tokens remain strictly server-side.
- Database operations utilize connection pooling to prevent exhaustion in serverless environments.

---

## 📄 License

MIT License © 2026 Tushar Faruk. All rights reserved.
