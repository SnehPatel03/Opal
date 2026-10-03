# Opal web application

This Next.js app is deployed independently from the Opal Express backend and
Opal Desktop recorder. Keep this repository connected to its own Vercel project.

## Local development

Copy `.env.example` to `.env`, fill in the required services, then run:

```bash
npm ci
npm run dev
```

## Production

Configure the variables from `.env.example` in Vercel using the production
Clerk, Stripe, ImageKit, email, AI, and database credentials. Set
`NEXT_PUBLIC_HOST_URL` to the website's canonical HTTPS URL.

The Express service must use this website's API base URL as `NEXT_API_HOST`,
including `/api/` at the end. Deploy and verify the website before connecting
the desktop recorder to the separately deployed Express service.

The dashboard's **Upload** action links users to the Opal Desktop installers
published as releases in the separate `Opal-Desktop` repository.
