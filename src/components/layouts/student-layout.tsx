import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  LogOut,
  Bell,
  Menu,
  X,
  Brain,
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
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

interface StudentLayoutProps {
  children: ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  
  // const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   } else if (user?.role !== 'student') {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, user, navigate]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // const handleLogout = async () => {
  //   // await dispatch(logout());
  //   navigate('/login');
  // };

  const sidebarItems = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/student/progress', icon: BarChart2, label: 'Progress' },
    { path: '/student/learning-modes', icon: Brain, label: 'Learning Modes' },
    { path: '/student/support', icon: BookOpen, label: 'Support' },
  ];

  return (
    <div className="flex min-h-screen bg-background ">
      {/* Sidebar for mobile */}
      {/* {sidebarOpen && ( */}
        {/* <div className={`${sidebarOpen ? "left-0" : "left-[400px]"} fixed inset-0 z-50 lg:hidden1`}>
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 w-72 bg-[#065FF0] p-8 rounded-3xl my-6"> */}
          <div 
          className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 w-72 bg-[#065FF0] p-8 rounded-3xl my-6">
            <div className="flex items-center justify-between mb-8 text-white">
              <Link to="/student/dashboard" className="flex items-center gap-2 text-2xl font-bold">
                AI Tutor.
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:bg-blue-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)] mt-16">
              <div className="space-y-8">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-md font-bold transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#065FF0]/10 text-white'
                        : 'text-white hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-white font-bold" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </nav>
        </div>
      {/* )} */}

      {/* Sidebar for desktop */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-[#065FF0] my-6 rounded-3xl mr-2">
        <div className="p-6">
          <Link to="/student/dashboard" className="flex items-center gap-2 text-2xl font-bold text-white">
            AI Tutor.
          </Link>
        </div>
        <ScrollArea className="flex-1 px-4 mt-16">
          <div className="space-y-8">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-md font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-white hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 font-bold" />
                {item.label}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </nav>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="sticky top-0 z-10 flex md:hidden items-center justify-between h-16 px-4 border-b bg-background lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>
        <header className="sticky top-0 z-10 hidden md:flex items-center justify-between h-16 bg-background py-12 border-b-2 px-16 ">
        <h1 className="text-3xl font-bold">Chat Mode</h1>
          <div>MENU</div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}