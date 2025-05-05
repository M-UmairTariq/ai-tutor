import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';

// Layouts
import { PublicLayout } from '@/components/layouts/public-layout';
import { StudentLayout } from '@/components/layouts/student-layout';
import { TeacherLayout } from '@/components/layouts/teacher-layout';

// Public Pages
import HomePage from '@/pages/public/home';
import AboutPage from '@/pages/public/about';
import ContactPage from '@/pages/public/contact';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';

// Student Pages
import StudentDashboard from '@/pages/student/dashboard';
import StudentLearningMode from '@/pages/student/learning-mode';
import StudentCourses from '@/pages/student/courses';
import StudentAssignments from '@/pages/student/assignments';
import StudentProgress from '@/pages/student/progress';
import LearningModes from '@/pages/student/learning-modes';

// Teacher Pages
import TeacherDashboard from '@/pages/teacher/dashboard';
import TeacherCourses from '@/pages/teacher/courses';
import TeacherStudents from '@/pages/teacher/students';
import TeacherAssignments from '@/pages/teacher/assignments';
import TeacherAnalytics from '@/pages/teacher/analytics';

const AppRoutes = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Protected route component for students
  const StudentRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'student') {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  // Protected route component for teachers
  const TeacherRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'teacher') {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
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
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicLayout>
            <SignupPage />
          </PublicLayout>
        }
      />

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
        path="/student/learning-mode"
        element={
          <StudentRoute>
            <StudentLayout>
              <StudentLearningMode />
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
        path="/student/courses"
        element={
          <StudentRoute>
            <StudentLayout>
              <StudentCourses />
            </StudentLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/assignments"
        element={
          <StudentRoute>
            <StudentLayout>
              <StudentAssignments />
            </StudentLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/progress"
        element={
          <StudentRoute>
            <StudentLayout>
              <StudentProgress />
            </StudentLayout>
          </StudentRoute>
        }
      />

      {/* Teacher Routes */}
      <Route
        path="/teacher/dashboard"
        element={
          <TeacherRoute>
            <TeacherLayout>
              <TeacherDashboard />
            </TeacherLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/courses"
        element={
          <TeacherRoute>
            <TeacherLayout>
              <TeacherCourses />
            </TeacherLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/students"
        element={
          <TeacherRoute>
            <TeacherLayout>
              <TeacherStudents />
            </TeacherLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/assignments"
        element={
          <TeacherRoute>
            <TeacherLayout>
              <TeacherAssignments />
            </TeacherLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/analytics"
        element={
          <TeacherRoute>
            <TeacherLayout>
              <TeacherAnalytics />
            </TeacherLayout>
          </TeacherRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;