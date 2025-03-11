# OmpuTag Frontend

A modern web application for managing NFC tags and facilitating lost item recovery through secure owner-finder communication.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Firebase Setup](#firebase-setup)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

OmpuTag is a service that allows users to register and manage NFC tags for their personal items. When items are lost and found, the finder can scan the NFC tag, which redirects them to this web application where they can securely communicate with the owner without exposing personal information.

## Features

- **Dynamic Landing Page:** Adapts based on tag registration status
- **User Authentication:** Secure sign-up, login, and session management
- **Owner Dashboard:** Manage NFC tags, view messages, update settings
- **Finder Interface:** Easy-to-use contact form with GPS and media upload
- **Real-time Notifications:** Instant alerts for messages and tag scans
- **Tag Management:** Add, edit, and deactivate NFC tags
- **Profile Management:** Update personal information and preferences
- **Responsive Design:** Mobile-first approach ensuring usability on all devices
- **Dark/Light Mode:** User preference-based theme switching

## Tech Stack

- **Framework:** React.js with TypeScript, Next.js for server-side rendering
- **State Management:** React Context API for global state
- **Styling:** Tailwind CSS
- **API & Real-Time:** Axios for API calls, Socket.io for real-time chat
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Form Handling:** React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- A Firebase account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/omputag-frontend.git
cd omputag-frontend
```

2. Install dependencies

```bash
npm install
```


### Environment Variables

Create a `.env.local` file in the root directory and add your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Then update the Firebase configuration in `src/services/firebase/config.ts` to use these environment variables:

```typescript
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

## Running the Application

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/           # Shared components (buttons, inputs, etc.)
│   ├── layout/           # Layout components (header, footer, etc.)
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard specific components
│   ├── finder/           # Finder interface components
│   └── tag/              # Tag management components
├── app/                  # Next.js app router pages
│   ├── page.tsx          # Landing page
│   ├── auth/             # Auth pages (login, register)
│   ├── dashboard/        # Owner dashboard pages
│   ├── finder/           # Finder interface pages
│   └── tag/[id]/         # Dynamic tag pages
├── context/              # React Context definitions
├── hooks/                # Custom React hooks
├── services/             # API and service integrations
│   ├── firebase/         # Firebase service abstractions
│   ├── api/              # REST API clients
│   └── storage/          # Local storage utilities
├── utils/                # Utility functions
├── styles/               # Global styles and theme
└── types/                # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run Jest tests

## Deployment

The application can be deployed to Vercel with a simple connection to your GitHub repository:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy

Alternatively, you can deploy to any platform that supports Next.js applications.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
