# Kaison Estate - Setup Guide

## Overview
Kaison Estate is a comprehensive luxury real estate platform with three user roles: Buyers, Sellers (Vendors), and Realtors. The platform features property browsing, role-specific dashboards, and authentication via Clerk.

## Features

### Public Pages
- **Home** (`/`) - Landing page with hero section, featured properties, and call-to-action
- **Properties** (`/properties`) - Browse and filter properties with advanced search
- **Property Details** (`/properties/[id]`) - Detailed property information with image gallery
- **About** (`/about`) - Company information and team
- **Services** (`/services`) - Service offerings for each user type
- **Contact** (`/contact`) - Contact form and business information
- **Get Started** (`/get-started`) - Role selection for new users
- **Sign In** (`/sign-in`) - Clerk authentication
- **Sign Up** (`/sign-up`) - Clerk authentication with role selection

### Protected Pages (Requires Authentication)
- **Buyer Dashboard** (`/dashboard/buyer`) - Saved properties, favorites, active searches
- **Vendor Dashboard** (`/dashboard/vendor`) - Active listings, pending offers, sales stats
- **Realtor Dashboard** (`/dashboard/realtor`) - Client management, commission tracking, performance metrics

## Prerequisites

1. **Node.js** - v18 or higher
2. **npm/pnpm** - Package manager
3. **Clerk Account** - For authentication (https://dashboard.clerk.com)

## Installation Steps

### 1. Clone or Extract the Project
```bash
cd kaison-estate
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Set Up Clerk Authentication

1. Create a Clerk account at https://dashboard.clerk.com
2. Create a new application
3. Copy your API keys

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard/buyer
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/buyer
```

Replace the placeholder values with your actual Clerk credentials.

### 5. Run the Development Server

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
kaison-estate/
├── app/
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   ├── services/page.tsx        # Services page
│   ├── get-started/page.tsx     # Get started page
│   ├── properties/
│   │   ├── page.tsx             # Properties listing
│   │   └── [id]/page.tsx        # Property details
│   ├── sign-in/
│   │   └── [[...index]]/page.tsx # Sign in page
│   ├── sign-up/
│   │   └── [[...index]]/page.tsx # Sign up page
│   ├── dashboard/
│   │   ├── layout.tsx           # Dashboard layout with auth
│   │   ├── buyer/page.tsx       # Buyer dashboard
│   │   ├── vendor/page.tsx      # Vendor/Seller dashboard
│   │   └── realtor/page.tsx     # Realtor dashboard
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout with Clerk provider
├── components/
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Footer
│   ├── hero-section.tsx         # Hero section with search
│   ├── featured-properties.tsx  # Featured properties grid
│   ├── property-filters.tsx     # Property filter sidebar
│   ├── property-card.tsx        # Property card component
│   ├── dashboard-sidebar.tsx    # Dashboard navigation
│   └── ui/                      # Shadcn UI components
├── public/images/               # Generated property images
├── middleware.ts                # Clerk authentication middleware
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies

```

## Key Features Implemented

### Authentication
- Clerk authentication integrated across the entire application
- Protected dashboard routes with automatic redirects
- User session management with sign out functionality
- Role-based navigation in the header (shows Dashboard for signed-in users)

### Property Browsing
- Advanced property search with filters (price, bedrooms, bathrooms, etc.)
- Dynamic property listing with images
- Property detail pages with image gallery and amenities
- Favorites/save functionality (UI ready)

### Role-Based Dashboards
- **Buyer**: Track saved properties, active searches, and preferences
- **Vendor**: Manage active listings, track offers and views, sales statistics
- **Realtor**: Client management, commission tracking, sales analytics

### Design System
- Luxury corporate-blue color palette (#1B4674)
- Professional typography with Geist font family
- Responsive design for mobile, tablet, and desktop
- Smooth animations and hover effects
- Generated professional property images

## Navigation Map

```
Home (/)
├── Header Navigation
│   ├── Properties (/properties)
│   │   └── Property Details (/properties/[id])
│   ├── About (/about)
│   ├── Services (/services)
│   ├── Contact (/contact)
│   └── Sign In/Sign Up or Dashboard (if authenticated)
│
└── Footer Navigation
    ├── Services (/services)
    ├── About (/about)
    ├── Contact (/contact)
    └── Get Started (/get-started)

Protected Routes
├── /dashboard/buyer
├── /dashboard/vendor
└── /dashboard/realtor
```

## API Routes Ready for Implementation

The application is structured to easily add backend functionality:

- Property data endpoints
- User profile management
- Favorites/saved properties
- Listing management
- Commission tracking
- Contact form submission
- Authentication callbacks

## Customization

### Change Brand Colors
Edit `/app/globals.css` to modify the CSS variables:
- `--primary`: Main brand color
- `--accent`: Highlight color
- `--background`, `--foreground`: Text colors

### Update Property Data
Property data is currently mocked in component files. To use a real database:
1. Create API routes in `/app/api/`
2. Update components to fetch from your API
3. Implement MongoDB or your chosen database

### Add New Pages
1. Create a new directory in `/app/`
2. Add `page.tsx` file
3. Import Header and Footer components
4. Update navigation links in `/components/header.tsx`

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### Deploy Elsewhere
1. Build the project: `pnpm build`
2. Start the production server: `pnpm start`
3. Ensure environment variables are set in your hosting platform

## Troubleshooting

### Authentication Not Working
- Verify Clerk keys are correct in `.env.local`
- Ensure your Clerk application is configured with the correct domain
- Check that middleware.ts is in the root directory

### Styles Not Loading
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Restart dev server: `pnpm dev`

### Pages Not Found
- Verify file paths match the route structure
- Ensure all imports are using absolute paths (`@/components/...`)
- Check for typos in file names

## Next Steps

1. **Connect Database**: Integrate MongoDB or PostgreSQL for persistent data
2. **Implement API Routes**: Create endpoints for property data and user management
3. **Add Payment Processing**: Integrate Stripe for transaction handling
4. **Setup Email Service**: Add automated emails for inquiries and notifications
5. **Mobile App**: Consider a React Native version for iOS/Android
6. **Analytics**: Add Google Analytics or Mixpanel for tracking

## Support

For issues or questions:
- Check Clerk documentation: https://clerk.com/docs
- Review Next.js documentation: https://nextjs.org/docs
- Create an issue in your repository

## License

This project is proprietary to Kaison Estate.

---

**Last Updated**: February 2026
**Version**: 1.0.0
