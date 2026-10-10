# 🛒 বাজার দর (BazarDor)

> Essential commodity prices at a glance.

**BazarDor** is a web app for tracking the daily prices of everyday essentials in Bangladesh: rice, pulses, oil, vegetables, fish, meat, eggs & dairy, and spices. It shows today's price, how it changed compared with yesterday, last week and last month, and the minimum and maximum price across 12 markets in different divisions. All prices and numbers are displayed in Bengali (Bangla digits and units).

🔗 **Live site:** https://bazardor-repo-psi.vercel.app

---

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js (App Router)** | Pages, routing, server components |
| **JavaScript (React)** | UI components |
| **Tailwind CSS** | Styling and responsive design |
| **DaisyUI** | Ready-made components (buttons, inputs, tables, skeletons) |
| **BetterAuth** | Email/password, Google and GitHub authentication |
| **MongoDB Atlas** | User and session data |
| **react-hot-toast** | Toast notifications |
| **Vercel** | Deployment |

---

## ✨ Key Features

1. **Live price ticker:** An infinite scrolling strip under the navbar showing each product's emoji, name, price (taka per unit) and a ▲/▼ percentage change.
2. **Price risers and fallers:** The home page has "Prices went up today" and "Prices went down today" sections showing the top 6 biggest movers in each direction, plus a full "All products" grid.
3. **Category pages with sorting:** A separate page for each of the 8 categories, with a sort dropdown (Default / Price: low to high / Price: high to low). Sorting uses the numeric value of the price, not the Bangla text, so the order is always correct.
4. **Protected product details page:** Logged-in users can see today's price, the change since yesterday, the minimum / maximum / average price, and a market-wise price table covering 12 markets across 6 divisions.
5. **Secure authentication:** Sign in and sign up with email and password, or with Google or GitHub, powered by BetterAuth. Visiting a protected page while logged out redirects the user to the sign-in page.
6. **Profile and update information:** Users can view their profile and change their name on a separate route (`/profile/update`).
7. **Friendly user experience:** Skeleton loaders while data loads, toast notifications for sign in / sign up / sign out / validation errors / protected-route redirects, and a custom 404 page for unknown routes.
8. **Fully responsive:** Works on mobile, tablet and desktop. The product grid automatically switches between 1, 2 and 3 columns.

---

## 🗺️ Routes

| Route | Description | Login required? |
|---|---|---|
| `/` | Home: hero, price risers/fallers, all products | No |
| `/category/[slug]` | Products of a category, with sorting | No |
| `/product/[slug]` | Product details and market-wise prices | **Yes** |
| `/signin`, `/signup` | Sign in and sign up | No |
| `/profile` | My profile | **Yes** |
| `/profile/update` | Update name form | **Yes** |
| `/privacy` | Privacy policy | No |
| Any other URL | 404 page | No |

---

## 🔌 Data (API)

Product and category data comes from the `bazardor` API:

- `/products`: all products
- `/products?category=chal`: products filtered by category
- `/products/1`: a single product
- `/categories`: all categories

---

## 🚀 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/kazifahad-dev/bazardor-repo.git
cd bazardor-repo

# 2. Install dependencies
npm install

# 3. Create a .env.local file (see below)

# 4. Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

### 🔐 Environment Variables

Create a file named `.env.local` in the project root and add the following variables with your own values:

```env
NEXT_PUBLIC_API_URL=https://openapi.programming-hero.com/api/bazardor

MONGODB_URI=your-mongodb-connection-string
BETTER_AUTH_SECRET=a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

> Never commit your `.env.local` file to GitHub.

### Social login callback URLs

| Provider | Authorized redirect / callback URL |
|---|---|
| Google | `<your-site-url>/api/auth/callback/google` |
| GitHub | `<your-site-url>/api/auth/callback/github` |

---

## ☁️ Deployment (Vercel)

1. Import the GitHub repository into Vercel.
2. Go to **Settings → Environment Variables** and add all the variables above (`BETTER_AUTH_URL` must be the live site URL).
3. In MongoDB Atlas, open **Network Access** and add `0.0.0.0/0` so Vercel can connect.
4. Every push to the `main` branch is deployed automatically by Vercel.

---

## 📁 Project Structure

```
app/
├── api/auth/[...all]/   BetterAuth route handler
├── category/[slug]/     Category page
├── product/[slug]/      Product details (protected)
├── profile/             Profile and update
├── signin/  signup/     Auth pages
├── privacy/             Privacy policy
├── not-found.js         404 page
└── page.js              Home
components/              Header, Ticker, Footer, ProductCard, etc.
lib/                     API helpers, formatters (Bangla digits), auth, database
```

---

## 📄 License

This is an educational assignment project.
