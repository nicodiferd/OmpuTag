# OmpuTag Front End - Key Components

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Features of the Web Application](#features-of-the-web-application)
3. [Dependencies and Tools](#dependencies-and-tools)
4. [Functionality](#functionality)
5. [Purpose](#purpose)
6. [Workflow and User Flows](#workflow-and-user-flows)
   - [Owner Dashboard Flow](#owner-dashboard-flow)
   - [Finder Dashboard Flow](#finder-dashboard-flow)
7. [Firebase initialize](#firebase-initialize)
8. [Architecture](#architecture)
9. [Component Structure](#component-structure)
10. [API Endpoints](#api-endpoints)
11. [State Management](#state-management)
12. [Deployment](#deployment)
13. [Performance Considerations](#performance-considerations)
14. [Security Measures](#security-measures)

## Tech Stack
- **Framework:** React.js with TypeScript, Next.js for server-side rendering
- **State Management:** Redux or Context API, React Router for navigation
- **Styling:** Tailwind CSS or Bootstrap, with modular CSS approaches
- **API & Real-Time:** Axios/Fetch for API calls, WebSockets (Socket.io) for live chat
- **Authentication and Security:** Firebase Authentication, Firebase Security Rules
- **Database:** Firebase Firestore for real-time data
- **Storage:** Firebase Storage for media uploads

## Features of the Web Application
- **Dynamic Landing Page:** Automatically adjusts based on tag registration status.
- **User Authentication:** Secure sign-up, login, and session management.
- **Owner Dashboard:** Manage NFC tags, view messages, update account settings.
- **Finder Interface:** Easy-to-use contact form with optional GPS and media upload.
- **Responsive & Accessible Design:** Mobile-first, ensuring usability on all devices.
- **Real-time Notifications:** Instant alerts for new messages and tag scans.
- **Tag Management System:** Add, edit, and deactivate NFC tags.
- **Profile Management:** Update personal information and preferences.
- **Multi-language Support:** Internationalization for broader accessibility.
- **Dark/Light Mode:** User preference-based theme switching.

## Dependencies and Tools
- **Development Environment:** Node.js, npm/yarn
- **Design & Prototyping:** Figma or Sketch for wireframing and high-fidelity prototypes
- **Testing:** Jest, React Testing Library, and Cypress for end-to-end tests
- **CI/CD & Deployment:** GitHub Actions, Vercel or Netlify for hosting
- **Code Quality:** ESLint, Prettier for code formatting
- **Analytics:** Firebase Analytics for user behavior tracking
- **Performance Monitoring:** Lighthouse, Web Vitals for performance metrics
- **Version Control:** Git with GitHub for collaboration

## Functionality
- **API Integration:** Connects seamlessly with backend services for dynamic content.
- **Real-Time Communication:** Implements WebSocket for instant messaging.
- **Secure Data Handling:** Uses HTTPS and JWT-based authentication for secure data exchange.
- **Error Handling:** Global error boundaries and clear user feedback for smooth operation.
- **Form Validation:** Client-side validation with meaningful error messages.
- **Offline Support:** Service workers for basic offline functionality.
- **Data Persistence:** Local storage for user preferences and session continuity.
- **Image Optimization:** Compression and lazy loading for media assets.

## Purpose
- **Engage Users:** Provide an intuitive, user-friendly interface for NFC tag interactions.
- **Facilitate Management:** Allow owners to easily manage and update their NFC tags.
- **Enable Secure Communication:** Let finders report found items and contact owners without exposing personal details.
- **Increase Recovery Rate:** Streamline the process of returning lost items to their owners.
- **Build Trust:** Create a secure platform that prioritizes user privacy and data security.

## Workflow and User Flows
- **NFC Scan:** A scan redirects the user to a dynamic landing page.
- **Tag Status Verification:** 
  - If **unregistered**, the user is prompted to register or set up the tag.
  - If **registered**, the page offers two clear options based on user type.
- **Navigation:** Streamlined design guides users directly to the appropriate dashboard.

### Owner Dashboard Flow
- **Authentication:** Secure login/registration.
- **Tag Management:** View and manage NFC tags linked to the owner.
- **Messaging:** Real-time chat for communication with finders.
- **Account Settings:** Update personal and security settings.
- **Analytics:** View statistics about tag scans and interactions.
- **Subscription Management:** Update payment information and plan details.
- **Support Access:** Direct access to help resources and contact options.

### Finder Dashboard Flow
- **Contact Form:** A simple, guided form for reporting found items.
- **Enhanced Communication:** Options to include location and photos.
- **User Guidance:** Clear instructions to securely and effectively notify tag owners.
- **Message History:** Access to previous communications (without personal details).
- **Status Updates:** Track the progress of the return process.
- **Anonymous Authentication:** Optional account creation for follow-up communication.

## Firebase Initialize
```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR1f2pCDRAUiso8Acf2RwdWT0H8aPR6vc",
  authDomain: "omputag.firebaseapp.com",
  projectId: "omputag",
  storageBucket: "omputag.firebasestorage.app",
  messagingSenderId: "82461093667",
  appId: "1:82461093667:web:091ea3c9e57c36b372e696",
  measurementId: "G-JYFRGBC7CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

## Architecture
### Frontend Architecture
The OmpuTag frontend follows a modular architecture with clear separation of concerns:

1. **Presentation Layer:** React components for UI rendering
2. **State Management Layer:** Context API or Redux for global state
3. **Service Layer:** API clients, Firebase services, and utility functions
4. **Routing Layer:** Next.js routing with dynamic page generation
5. **Authentication Layer:** Firebase Auth integration with protected routes

### Data Flow
```
User Interaction → Component → Action/Hook → Service → API/Firebase → State Update → Re-render
```

## Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── common/           # Shared components (buttons, inputs, etc.)
│   ├── layout/           # Layout components (header, footer, etc.)
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard specific components
│   ├── finder/           # Finder interface components
│   └── tag/              # Tag management components
├── pages/                # Next.js pages
│   ├── index.js          # Landing page
│   ├── auth/             # Auth pages (login, register)
│   ├── dashboard/        # Owner dashboard pages
│   ├── finder/           # Finder interface pages
│   └── tag/[id].js       # Dynamic tag pages
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

## API Endpoints
The frontend interacts with the following key endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Tag Management
- `GET /api/tags` - List all tags for a user
- `GET /api/tags/:id` - Get a specific tag
- `POST /api/tags` - Create a new tag
- `PUT /api/tags/:id` - Update a tag
- `DELETE /api/tags/:id` - Delete a tag

### Messaging
- `GET /api/messages/:tagId` - Get messages for a tag
- `POST /api/messages/:tagId` - Send a new message
- `PUT /api/messages/:id/read` - Mark message as read

## State Management
The application uses a combination of:

1. **React Context API** for:
   - User authentication state
   - Theme preferences
   - UI state (modals, notifications)

2. **Local component state** for:
   - Form inputs
   - UI interactions
   - Component-specific state

3. **Firebase Realtime Updates** for:
   - Live chat messages
   - Tag scan notifications
   - User presence

## Deployment
The application follows a modern deployment pipeline:

1. **Development Environment:**
   - Local development with hot reloading
   - Integration with Firebase emulators

2. **Staging Environment:**
   - Automated deployments on PR merges
   - Integration testing with E2E tests

3. **Production Environment:**
   - Automated deployments on main branch updates
   - Performance monitoring and error tracking

### Hosting Options
- **Primary:** Vercel (integrated with Next.js)
- **Alternative:** Netlify with serverless functions

## Performance Considerations
- **Code Splitting:** Route-based code splitting for faster initial load
- **Image Optimization:** Next.js Image component for optimized loading
- **Server-Side Rendering:** For SEO and initial load performance
- **Lazy Loading:** For non-critical components and routes
- **Caching Strategy:** Service worker for asset caching
- **Bundle Size Management:** Tree shaking and dependency optimization

## Security Measures
- **Authentication:** Firebase Authentication with multi-factor options
- **Data Validation:** Client and server-side validation
- **CSRF Protection:** Token-based protection for API requests
- **Content Security Policy:** Restrictive CSP headers
- **Sensitive Data Handling:** No PII stored in client-side storage
- **API Rate Limiting:** Prevention of brute force attacks
- **Regular Security Audits:** Dependency scanning and vulnerability checks