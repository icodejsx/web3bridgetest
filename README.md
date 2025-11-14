# 💰 Savings Group Web Application

A full-featured savings group management system built for **Web3Bridge Cohort XIV Pre-Qualification Exercise**. This application allows 12 students to form a savings group with different investment tiers, track weekly interest accumulation, and manage withdrawals.

## 🎯 Features

### ✅ Student Registration
- **Name Input**: Each student can register with their name
- **Tier Selection**: Choose from 3 different savings tiers:
  - **Tier 1**: 10,000 Naira (5% interest per week)
  - **Tier 2**: 20,000 Naira (10% interest per week)
  - **Tier 3**: 30,000 Naira (20% interest per week)
- **Amount Validation**: Ensures students enter the correct amount for their selected tier
- **Weekly Preview**: Shows weekly interest and total withdrawal amount before registration
- **Maximum Capacity**: Limited to 12 members (as per requirements)

### 📊 Savings Dashboard
- **Total Savings**: Displays the combined savings of all members
- **Total Interest**: Shows accumulated interest across all members
- **Total Withdrawable**: Calculates the total amount available for withdrawal
- **Member Breakdown**: Detailed table showing:
  - Student name and tier
  - Initial investment amount
  - Weekly interest rate
  - Weeks active
  - Accumulated interest
  - Total withdrawal amount

### ⏱️ Weekly Progress Simulation
- **Week Advancement**: Simulate the passage of time to accumulate interest
- **Automatic Updates**: All member balances and interests update automatically when advancing weeks
- **Current Week Display**: Visual indicator showing the current week number

### 💸 Withdrawal Management
- **Student Withdrawal**: Allows any student to withdraw their funds
- **Automatic Removal**: Withdrawing removes the student from the group
- **Slot Availability**: Once a student withdraws, a new student can join
- **Confirmation Dialog**: Prevents accidental withdrawals

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with gradient backgrounds
- **Input Validation**: Real-time validation with helpful error messages
- **Success Notifications**: Visual feedback for successful operations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Proper labels, semantic HTML, and keyboard navigation
- **Multi-Page Navigation**: Separate pages for Registration and Dashboard with intuitive navigation

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd web3bridgetest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui
```

## 🗺️ Application Structure & Routing

This application uses **React Router** for navigation between different pages. The app is organized into two main pages:

### Page Structure

1. **Registration Page** (`/`)
   - Student registration form
   - Tier selection and validation
   - Weekly interest preview
   - Week advancement controls

2. **Dashboard Page** (`/dashboard`)
   - Total savings overview
   - Member details table
   - Withdrawal management

### Navigation

- **Top Navigation Bar**: Sticky navigation bar at the top allows easy switching between pages
- **Active Route Highlighting**: The current page is highlighted in the navigation
- **Shared State**: Both pages share the same savings group data through React Context, so changes on one page are immediately reflected on the other

### Routing Implementation

The application uses:
- **React Router DOM v6**: For client-side routing
- **Context API**: To share state between pages (students, current week, etc.)
- **BrowserRouter**: For clean URLs without hash fragments

**Key Files:**
- `src/App.tsx`: Main app component with route definitions
- `src/context/SavingsGroupContext.tsx`: Shared state management
- `src/pages/RegistrationPage.tsx`: Registration page component
- `src/pages/DashboardPage.tsx`: Dashboard page component
- `src/components/Navigation.tsx`: Navigation component

## 📖 How to Use

### Navigation Between Pages

1. **Use the Navigation Bar**: Click "📝 Registration" or "📊 Dashboard" in the top navigation
2. **Direct URLs**: You can navigate directly to:
   - `http://localhost:5173/` - Registration page
   - `http://localhost:5173/dashboard` - Dashboard page

### 1. Register a Student (Registration Page)

1. Navigate to the **Registration** page (default home page)
2. Enter the student's name in the "Student Name" field
3. Select a savings tier (Tier 1, 2, or 3)
4. Enter the amount matching the selected tier:
   - Tier 1: **10,000 Naira**
   - Tier 2: **20,000 Naira**
   - Tier 3: **30,000 Naira**
5. Review the weekly preview showing:
   - Weekly interest amount
   - Total withdrawal after 1 week
6. Click "Register Student"

**Note**: The form validates that the amount matches the selected tier. If it doesn't match, you'll see an error message.

### 2. View the Dashboard (Dashboard Page)

1. Navigate to the **Dashboard** page using the top navigation
2. View the summary cards showing:
   - **Total Members**: Current count out of 12 maximum
   - **Total Savings**: Sum of all initial investments
   - **Total Interest**: Combined interest from all members
   - **Total Withdrawable**: Total amount available if all members withdraw
3. Scroll down to see the detailed member breakdown table showing:
   - Name and tier
   - Investment amount
   - Weekly interest
   - Number of weeks active
   - Accumulated interest
   - Total withdrawal amount

### 3. Simulate Weekly Progress (Registration Page)

1. On the **Registration** page, find the "Weekly Progress" section
2. Click the "Advance to Week X" button
3. All members' interests will accumulate automatically
4. The current week number increases
5. Navigate to the **Dashboard** to see updated withdrawal amounts

**Example**: If a Tier 1 student (5% weekly interest) has been active for 3 weeks:
- Initial: 10,000 Naira
- Weekly Interest: 500 Naira
- After 3 weeks: 10,000 + (500 × 3) = **11,500 Naira**

### 4. Withdraw Funds (Dashboard Page)

1. Navigate to the **Dashboard** page
2. Find the student in the member details table
3. Click the "Withdraw" button next to their name
4. Confirm the withdrawal in the dialog
5. The student is removed from the group
6. Their slot becomes available for a new member
7. Total savings and interest are updated automatically
8. You can now return to the **Registration** page to add a new member

## 🏗️ Project Structure

```
web3bridgetest/
├── src/
│   ├── components/          # React components
│   │   ├── StudentRegistration.tsx
│   │   ├── SavingsDashboard.tsx
│   │   ├── WeekControls.tsx
│   │   ├── Navigation.tsx    # Navigation component
│   │   └── *.css            # Component styles
│   ├── pages/               # Page components (routing)
│   │   ├── RegistrationPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── Pages.css
│   ├── context/             # React Context for state management
│   │   └── SavingsGroupContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useSavingsGroup.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── calculations.ts
│   ├── test/               # Test setup
│   │   └── setup.ts
│   ├── App.tsx             # Main application component with routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # This file
```

## 🧪 Testing

The project includes comprehensive unit tests using **Vitest** and **React Testing Library**:

- **Calculation Tests**: Verify interest calculations, totals, and validations
- **Hook Tests**: Test the savings group state management
- **Component Tests**: (Can be extended) Test UI components

Run tests with:
```bash
npm test
```

## 🚢 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select source branch (usually `main` or `gh-pages`)
   - Select `/dist` folder as the source

3. **Update base path** (if needed)
   - The `vite.config.ts` already includes `base: '/web3bridgetest/'`
   - Adjust this to match your repository name

### Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

   Or connect your GitHub repository directly on [vercel.com](https://vercel.com)

## 🛠️ Technologies Used

- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Vitest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **CSS3**: Modern styling with gradients and animations

## 📋 Requirements Checklist

- ✅ Student Registration with name and tier selection
- ✅ Weekly interest display and total withdrawal preview
- ✅ Savings Dashboard with total savings and member breakdown
- ✅ Tier validation (correct amount for each tier)
- ✅ Withdrawal functionality that removes students
- ✅ Weekly progress simulation
- ✅ Clean, user-friendly interface
- ✅ Input validation and error handling
- ✅ Dynamic updates for totals and interests
- ✅ TypeScript implementation
- ✅ Comprehensive tests
- ✅ Detailed README

## 🎓 Business Logic

### Interest Calculation
- **Tier 1**: 5% of 10,000 = 500 Naira per week
- **Tier 2**: 10% of 20,000 = 2,000 Naira per week
- **Tier 3**: 20% of 30,000 = 6,000 Naira per week

### Total Withdrawal Formula
```
Total Withdrawal = Initial Amount + (Weekly Interest × Weeks Active)
```

### Example Scenarios

**Scenario 1: Tier 1 Student, 4 weeks**
- Initial: 10,000 Naira
- Weekly Interest: 500 Naira
- After 4 weeks: 10,000 + (500 × 4) = **12,000 Naira**

**Scenario 2: Tier 3 Student, 2 weeks**
- Initial: 30,000 Naira
- Weekly Interest: 6,000 Naira
- After 2 weeks: 30,000 + (6,000 × 2) = **42,000 Naira**

## 🤝 Contributing

This is a submission for Web3Bridge Cohort XIV Pre-Qualification Exercise. For questions or issues, please refer to the exercise requirements.

## 📝 License

This project is created for educational purposes as part of the Web3Bridge Cohort XIV Pre-Qualification Exercise.

## 👨‍💻 Author

Built for Web3Bridge Cohort XIV Pre-Qualification Exercise

---

**Note**: This application simulates a savings group for educational purposes. The 20% ROI per gameplay mentioned in the requirements is referenced but the actual game integration is not implemented as it's outside the scope of this web application.

