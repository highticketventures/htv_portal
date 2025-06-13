# HTV Portal

A Next.js portal app with real-time request updates using Server-Sent Events (SSE), Clerk authentication, and Prisma ORM. Designed for deployment on Vercel, Netlify, or similar platforms.

---

## 🚀 Features

- **Real-time updates** for requests using SSE
- **Clerk** for authentication and organization management
- **Prisma** for database access
- **Admin dashboard** to view/filter all requests by company
- **User dashboard** to view and create requests
- **Linear webhook integration** for request status updates

---

## 🗂️ Pages & Routes

| Route                   | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `/`                     | Home page or landing page (customize as needed)                          |
| `/requests`             | Organization's request hub: view, search, and filter your org's requests |
| `/requests/new`         | Create a new support request                                             |
| `/requests/[id]`        | View details, chat, and files for a specific request                     |
| `/admin`                | Admin dashboard: view and filter all requests across all companies       |
| `/dashboard`            | User dashboard/overview (customize as needed)                            |
| `/orgs/[slug]`          | Organization overview page                                               |
| `/orgs/[slug]/settings` | Organization settings (profile, members, etc.)                           |
| `/settings`             | User settings                                                            |
| `/sign-in`              | Sign-in page (Clerk)                                                     |
| `/sign-up`              | Sign-up page (Clerk)                                                     |
| `/create-organization`  | Create a new organization (Clerk)                                        |
| `/api/*`                | API routes for requests, companies, webhooks, SSE, etc.                  |

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/highticketventures/htv_portal
cd htv_portal
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env.local` file with the following (see `.env.example` if present):

```
DATABASE_URL=postgresql://...    # Your Postgres DB
CLERK_SECRET_KEY=...             # Clerk secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_WEBHOOK_SIGNING_SECRET=...
LINEAR_API_KEY=...               # Linear API key
LINEAR_WEBHOOK_SECRET=...        # Linear webhook secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
```

### 4. Set up the database

```bash
npx prisma migrate dev
```

### 5. Run locally

```bash
npm run dev
# or
yarn dev
```

App will be available at [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploying (Netlify, Vercel, etc.)

- Deploy as a standard Next.js app.
- Set all environment variables in your platform's dashboard.
- **Note:** SSE (Server-Sent Events) requires a persistent connection. On serverless platforms, this can be unreliable or not supported. For best results, use a single-instance deployment or a platform that supports long-lived connections.

---

## ⚡ Real-time (SSE) Architecture & Tradeoffs

- **SSE is used for real-time updates** (e.g., when a request is updated via webhook or API).

---

## 🧑‍💻 Usage

### Organization

- Go to `/requests` to view and create requests for your organization.
- Real-time updates will appear if another user or webhook updates a request.

### Admin

- Go to `/admin` to view all requests across companies.
- Filter requests by company using the dropdown.

### Testing SSE

1. Open `/requests` in two browser tabs (or two users).
2. Trigger a request update (via the UI or webhook).
3. Both tabs should update in real time.
4. Check browser console for `[SSE]` logs.

---

## 📝 Gotchas & Production Notes

- **Authentication:** TThe SSE endpoint requires Clerk authentication and an active organization. During user sign-up, creation, or updates of users, organizations, or memberships in Clerk, a webhook is triggered to store the data in our database.
- **Webhooks:** Ensure your webhook endpoint is reachable from both Clerk and Linear and is properly configured.
- Therefore, we must set up the webhook APIs in Clerk and Linear.

---

## 📚 Quick Explanation of Choices

- **Next.js App Router**: Modern React framework for SSR/SSG and API routes.
- **Clerk**: Easy auth and org management.
- **Prisma**: Type-safe DB access.
- **SSE**: Simple real-time updates for most use cases.
- **Linear**: For request/issue management and webhook integration.

---

## ❓ FAQ

**Q: Why don't I see real-time updates after a DB change?**

- Only changes made via the app or webhook (which call `broadcastUpdate`) will trigger SSE. Direct DB edits (e.g., Prisma Studio) will not.

**Q: Why do I see `Broadcasting update to 0 clients`?**

- No browser is connected to the SSE endpoint. Open `/requests` or `/admin` in your browser and check the console for `[SSE]` logs.

---

## 🧪 Local Development Tips

- Open multiple tabs to test real-time updates.
- Use browser console and backend logs for debugging SSE.
- Restart the server to clear all SSE clients.

---
