import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Menu,
  X,
  LayoutDashboard,
  BookCopy,
  Users,
  FileText,
  BarChart2,
  LogOut,
  Bell,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/redux/slices/authSlice';

interface TeacherLayoutProps {
  children: ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role !== 'teacher') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 w-72 bg-background p-6 border-r overflow-auto">
            <div className="flex items-center justify-between mb-8">
              <Link to="/teacher/dashboard" className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[var(--primarybg)]" />
                <span className="font-semibold text-xl text-[var(--font-dark)]">
                  EduPlatform
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-1">
                <Link
                  to="/teacher/dashboard"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/teacher/dashboard')
                      ? 'bg-[var(--primarybg)] text-white'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/teacher/courses"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/teacher/courses')
                      ? 'bg-[var(--primarybg)] text-white'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BookCopy className="h-5 w-5" />
                  Course Management
                </Link>
                <Link
                  to="/teacher/students"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/teacher/students')
                      ? 'bg-[var(--primarybg)] text-white'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  Student Management
                </Link>
                <Link
                  to="/teacher/assignments"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/teacher/assignments')
                      ? 'bg-[var(--primarybg)] text-white'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  Assignments
                </Link>
                <Link
                  to="/teacher/analytics"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/teacher/analytics')
                      ? 'bg-[var(--primarybg)] text-white'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart2 className="h-5 w-5" />
                  Analytics
                </Link>
              </div>
            </ScrollArea>
          </nav>
        </div>
      )}

      {/* Sidebar for desktop */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-background lg:pt-5 lg:pb-4">
        <div className="px-4 mb-6">
          <Link to="/teacher/dashboard" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[var(--primarybg)]" />
            <span className="font-semibold text-xl text-[var(--font-dark)]">
              EduPlatform
            </span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1">
            <Link
              to="/teacher/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/teacher/dashboard')
                  ? 'bg-[var(--primarybg)] text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/teacher/courses"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/teacher/courses')
                  ? 'bg-[var(--primarybg)] text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <BookCopy className="h-5 w-5" />
              Course Management
            </Link>
            <Link
              to="/teacher/students"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/teacher/students')
                  ? 'bg-[var(--primarybg)] text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <Users className="h-5 w-5" />
              Student Management
            </Link>
            <Link
              to="/teacher/assignments"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/teacher/assignments')
                  ? 'bg-[var(--primarybg)] text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <FileText className="h-5 w-5" />
              Assignments
            </Link>
            <Link
              to="/teacher/analytics"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/teacher/analytics')
                  ? 'bg-[var(--primarybg)] text-white'
                  : 'hover:bg-muted'
              }`}
            >
              <BarChart2 className="h-5 w-5" />
              Analytics
            </Link>
          </div>
        </ScrollArea>
        <div className="mt-auto px-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background lg:px-6">
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <Link to="/teacher/dashboard" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--primarybg)]" />
              <span className="font-semibold text-[var(--font-dark)]">
                EduPlatform
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full h-8 w-8 p-0 ml-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user?.username || 'User'} />
                    <AvatarFallback>
                      {user?.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/teacher/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/teacher/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}