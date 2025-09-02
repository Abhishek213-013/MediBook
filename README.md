# MediBook - Doctor Appointment Management System

![MediBook](https://img.shields.io/badge/MediBook-Healthcare%20Platform-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

A modern, responsive Doctor Appointment Management System built with Next.js that connects patients with healthcare professionals seamlessly.

## 🌟 Features

### 👥 Role-Based Authentication
- **Patient Registration & Login**: Easy signup and appointment booking
- **Doctor Registration & Login**: Specialist profiles with scheduling
- **Secure Role Management**: Separate dashboards for patients and doctors

### 🏥 Patient Features
- **Doctor Discovery**: Search and filter healthcare professionals by name and specialization
- **Appointment Booking**: Intuitive booking system with date/time selection
- **Appointment Management**: View, track, and cancel appointments
- **Real-time Search**: Instant doctor search with filtering capabilities

### 🩺 Doctor Features
- **Appointment Dashboard**: Manage patient appointments efficiently
- **Status Management**: Update appointment status (Pending/Completed/Cancelled)
- **Date Filtering**: View appointments by specific dates
- **Patient Management**: Access patient information and history

### 🎨 User Experience
- **Modern UI/UX**: Clean, professional design with Tailwind CSS
- **Mobile Responsive**: Optimized for all device sizes
- **Splash Screens**: Role-specific landing pages after login
- **Smooth Animations**: Enhanced user interactions and transitions

## 🛠️ Technology Stack

### Core Technologies
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **HTTP Client**: Axios for API communication

### State Management & Forms
- **State Management**: Zustand with persistent storage
- **Form Handling**: React Hook Form with Zod validation
- **Schema Validation**: Zod for robust form validation

### API Integration
- **Backend API**: Integrated with appointment management backend
- **Real-time Data**: Efficient data fetching and caching
- **Error Handling**: Comprehensive error management

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishek213-013/MediBook.git
   cd doctor-appointment-system.

2. **Install dependencies**
    - npm install
         or
    - yarn install

3. **Environment Setup**
    - Create a .env.local file:
        - NEXT_PUBLIC_API_URL=https://appointment-manager-node.onrender.com/api/v1
        - NEXTAUTH_SECRET=your-secret-key-here

4. **Run the development server**
    - npm run dev
         or
    - yarn dev

5. **Open your browser**
    - Navigate to http://localhost:3000

6. **Building for Production**
    # Build the application
    - npm run build

    # Start production server
    - npm start

7. **📁 Project Structure**
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Authentication pages
│   ├── register/          # Registration pages
│   ├── patient/           # Patient dashboard and features
│   ├── doctor/            # Doctor dashboard and features
│   └── layout.tsx         # Root layout component
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── cards/             # Card components
│   ├── layout/            # Layout components
│   └── patient/           # Patient-specific components
├── services/              # API service functions
│   ├── auth.ts            # Authentication services
│   ├── doctors.ts         # Doctor-related services
│   └── appointments.ts    # Appointment services
├── store/                 # Zustand state management
│   └── auth.ts            # Authentication store
├── types/                 # TypeScript type definitions
└── lib/                   # Utility libraries
    └── axios.ts           # Axios configuration

8.  **🔐 API Integration**

    ##   The application integrates with the following API endpoints:
       # Authentication
    -   POST /auth/login - User authentication
    -   POST /auth/register/patient - Patient registration
    -   POST /auth/register/doctor - Doctor registration

        # Doctors

    -   GET /doctors - Fetch doctors with pagination and filters
    -   GET /specializations - Get available specializations

        # Appointments

    -   POST /appointments - Create new appointment
    -   GET /appointments/patient - Get patient appointments
    -   GET /appointments/doctor - Get doctor appointments
    -   PATCH /appointments/update-status - Update appointment status

9. **🎨 Customization & Styling**

    # The application uses Tailwind CSS. Modify the design by editing:

    -   src/app/globals.css - Global styles and custom utilities
    -   Tailwind classes in component files

    #   Colors
    -   The color scheme can be modified by updating Tailwind configuration:

        -   Blue: Primary color for patient interface

        -   Green: Accent color for doctor interface

    # Adding New Features

    - Create new components in src/components/
    - Add new pages in src/app/
    - Extend TypeScript interfaces in src/types/
    - Add new API services in src/services/

10. **📱 Responsive Design**

    # The application is fully responsive and optimized for:

    -   📱 Mobile devices (320px and up)
    -   📟 Tablets (768px and up)
    -   💻 Desktops (1024px and up)
    -   🖥️ Large screens (1280px and up)

11. **🔧 Development Scripts**
    - npm run dev      # Start development server
    - npm run build    # Build for production
    - npm run start    # Start production server
    - npm run lint     # Run ESLint

12. **🤝 Contributing**

    - Fork the project

    - Create your feature branch (git checkout -b feature/AmazingFeature)

    - Commit your changes (git commit -m 'Add some AmazingFeature')

    - Push to the branch (git push origin feature/AmazingFeature)

    - Open a Pull Request

13. **📄 License**

    -   This project is licensed under the MIT License - see the LICENSE file   for details.

14. **🆘 Support**

    -   For support, email support@medibook.com or join our Slack channel.
        🙏 Acknowledgments

    -   Next.js team for the amazing framework

    -   Tailwind CSS for the utility-first CSS framework

    -   Healthcare professionals who provided valuable insights
