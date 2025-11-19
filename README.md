# Dicoding Forum App

A comprehensive React application for the Dicoding Forum API with full testing suite, CI/CD pipeline, and SEO optimization.

## 🚀 Live Demo

**Vercel URL**: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)

## ✨ Features

- **Authentication**: User registration and login
- **Forum Management**: Create and view discussion threads
- **Comments**: Add comments to threads
- **Responsive Design**: Mobile-friendly interface
- **SEO Optimized**: Meta tags and structured data
- **Loading States**: Smooth user experience with loading indicators

## 🧪 Testing

### Unit Tests
- **Reducer Tests**: Auth and Threads state management
- **Thunk Tests**: Async action creators
- **Component Tests**: React component rendering and behavior

### End-to-End Tests
- **Login Flow**: Complete authentication process testing

### Running Tests

```bash
# Unit tests
npm test

# Unit tests with coverage
npm run test:coverage

# E2E tests
npm run e2e

# E2E tests in interactive mode
npm run e2e:open
```

## 🚀 Deployment

### CI/CD Pipeline
- **Continuous Integration**: GitHub Actions
- **Continuous Deployment**: Vercel
- **Branch Protection**: Master branch protected
- **Automated Testing**: All tests run on PR/push

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🏗️ Architecture

### State Management
- **Redux Toolkit**: Modern Redux with RTK Query
- **Slices**: Modular state management
  - `authSlice`: Authentication state
  - `threadsSlice`: Forum threads and comments
  - `usersSlice`: User data management

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── CommentItem.js
│   ├── LoadingSpinner.js
│   ├── Navbar.js
│   └── ThreadItem.js
├── pages/              # Page components
│   ├── CreateThread.js
│   ├── Login.js
│   ├── Register.js
│   ├── ThreadDetail.js
│   └── ThreadList.js
├── services/           # API service layer
│   └── api.js
├── store/              # Redux store and slices
│   ├── authSlice.js
│   ├── threadsSlice.js
│   ├── usersSlice.js
│   └── index.js
└── __tests__/          # Test files
    ├── components/
    ├── reducers/
    └── thunks/
```

## 🛠️ Tech Stack

### Core
- **React 18**: Modern React with hooks
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **React Helmet Async**: SEO management

### Testing
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing

### Development
- **ESLint**: Code linting with Dicoding Academy Style Guide
- **React Strict Mode**: Development mode checks

### Deployment
- **Vercel**: Hosting and deployment
- **GitHub Actions**: CI/CD pipeline

## 📋 Testing Scenarios

### Reducer Tests
- ✅ Auth slice state transitions
- ✅ Threads slice state management
- ✅ Error handling and loading states

### Thunk Tests
- ✅ Authentication async actions
- ✅ Thread management async actions
- ✅ API error handling

### Component Tests
- ✅ LoadingSpinner rendering
- ✅ ThreadItem display and interactions
- ✅ Props validation and edge cases

### E2E Tests
- ✅ Complete login flow
- ✅ Form validation
- ✅ Navigation between pages
- ✅ Authentication state persistence

## 🔧 Configuration

### Environment Variables
Create a `.env` file for local development:
```
ESLINT_NO_DEV_ERRORS=true
```

### Vercel Configuration
The app includes `vercel.json` for proper SPA routing support.

### GitHub Actions
CI/CD pipeline configured in `.github/workflows/ci-cd.yml` with:
- Automated testing
- Code quality checks
- Deployment to Vercel

## 📈 Code Quality

- **ESLint**: Dicoding Academy Style Guide compliance
- **Test Coverage**: Comprehensive unit and integration tests
- **Type Safety**: PropTypes validation (disabled for flexibility)
- **Error Handling**: Graceful API error handling with fallbacks

## 🌐 API Integration

Integrates with Dicoding Forum API at `https://forum-api.dicoding.dev/v1` with fallback mock data for offline development.

### Supported Endpoints
- User registration and authentication
- Thread CRUD operations
- Comment management
- User data retrieval

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## 🔒 Security

- JWT token management
- Secure authentication flow
- Input validation
- XSS protection through React

---

**Note**: Replace the Vercel URL with your actual deployment URL when submitting.