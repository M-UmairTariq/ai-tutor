import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAppSelector } from '@/redux/hooks';

// Layouts
import { PublicLayout } from '@/components/layouts/public-layout';
import { StudentLayout } from '@/components/layouts/student-layout';

// Public Pages
// import HomePage from '@/pages/public/home';
import AboutPage from '@/pages/public/about';
import ContactPage from '@/pages/public/contact';

// Student Pages
import LearningModes from '@/pages/student/learning-modes';
import StudentDashboard from "@/pages/student/dashboard"

// Auth Pages
import { AuthLayout } from '@/components/layouts/auth-layout';
import LoginPage from '@/pages/auth/login';
import ChatModeTopics from '@/pages/student/topics/ChatModeTopics';
import PhotoModeTopics from '@/pages/student/topics/PhotoModeTopics';
import Leaderboard from '@/pages/student/Leaderboard';
import Chat from '@/pages/student/ChatPage';

const AppRoutes = () => {
  // const { user } = useAppSelector((state) => state.auth);

  // Protected route component for students
  const StudentRoute = ({ children }: { children: JSX.Element }) => {
    // if (!isAuthenticated) {
    //   return <Navigate to="/login" replace />;
    // }

    // if (user?.role !== 'student') {
    //   return <Navigate to="/" replace />;
    // }

    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Navigate to={"/login"} />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      {/* <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignupPage />
          </AuthLayout>
        }
      /> */}

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <StudentRoute>
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          </StudentRoute>
        }
      />
      
      <Route
        path="/student/learning-modes"
        element={
          <StudentRoute>
            <StudentLayout>
              <LearningModes />
            </StudentLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/learning-modes"
        element={
          <StudentRoute>
            <StudentLayout>
              <LearningModes />
            </StudentLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/leaderboard"
        element={
          <StudentRoute>
            <StudentLayout>
              <Leaderboard />
            </StudentLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/learning-modes/chat-mode"
        element={
          <StudentRoute>
            <StudentLayout>
              <ChatModeTopics />
            </StudentLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/learning-modes/photo-mode"
        element={
          <StudentRoute>
            <StudentLayout>
              <PhotoModeTopics />
            </StudentLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/learning-mode/:topicId/:topicName"
        element={
          <StudentRoute>
            <StudentLayout>
              <Chat />
            </StudentLayout>
          </StudentRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;