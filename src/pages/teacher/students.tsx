import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Filter,
  Download,
  Mail,
  MoreHorizontal,
  UserPlus,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock student data
const students = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: 3,
    progress: 78,
    lastActive: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.r@example.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: 2,
    progress: 45,
    lastActive: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Jennifer Lee',
    email: 'jennifer.l@example.com',
    avatar: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: 4,
    progress: 92,
    lastActive: '3 hours ago',
    status: 'active',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.w@example.com',
    avatar: '',
    courses: 1,
    progress: 12,
    lastActive: '5 days ago',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Emily Chen',
    email: 'emily.c@example.com',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: 3,
    progress: 67,
    lastActive: '12 hours ago',
    status: 'active',
  },
  {
    id: '6',
    name: 'Olivia Taylor',
    email: 'olivia.t@example.com',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: 2,
    progress: 88,
    lastActive: '2 days ago',
    status: 'active',
  },
  {
    id: '7',
    name: 'James Martin',
    email: 'james.m@example.com',
    avatar: '',
    courses: 1,
    progress: 23,
    lastActive: '1 week ago',
    status: 'inactive',
  },
];

// Mock courses data
const coursesList = [
  { id: '1', title: 'Introduction to Programming' },
  { id: '2', title: 'Advanced Data Structures' },
  { id: '3', title: 'Web Development Masterclass' },
  { id: '4', title: 'Machine Learning Fundamentals' },
];

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  // Filter students based on search term and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    // In a real app, we would filter by course enrollment
    return matchesSearch && matchesStatus;
  });

  // Get status badge with appropriate styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-[var(--font-light2)]">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get progress indicator with appropriate styling
  const getProgressIndicator = (progress: number) => {
    if (progress >= 75) {
      return (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          <span>{progress}%</span>
        </div>
      );
    } else if (progress >= 25) {
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-amber-500 mr-2" />
          <span>{progress}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
          <span>{progress}%</span>
        </div>
      );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--font-dark)]">Student Management</h1>
          <p className="text-[var(--font-light2)]">
            Monitor and manage your students' progress and engagement.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90 flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Invite Students
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2 bg-[var(--primarybg)]/10">
                <UserPlus className="h-5 w-5 text-[var(--primarybg)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--font-light2)]">Total Students</p>
                <h3 className="text-2xl font-bold">{students.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-[var(--font-light2)]">Active Students</p>
                <h3 className="text-2xl font-bold">
                  {students.filter(s => s.status === 'active').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900">
                <BookOpen className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-[var(--font-light2)]">Avg. Courses Enrolled</p>
                <h3 className="text-2xl font-bold">
                  {(students.reduce((sum, s) => sum + s.courses, 0) / students.length).toFixed(1)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-[var(--font-light2)]">Avg. Completion Rate</p>
                <h3 className="text-2xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--font-light2)]" />
          <Input 
            className="pl-9" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {coursesList.map(course => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-[var(--font-light2)]">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.courses}</TableCell>
                    <TableCell>{getProgressIndicator(student.progress)}</TableCell>
                    <TableCell>{student.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Progress</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" /> Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            Unenroll
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    <p className="text-[var(--font-light2)] mb-2">
                      No students found matching your criteria.
                    </p>
                    {searchTerm && (
                      <Button onClick={() => setSearchTerm('')} variant="outline">
                        Clear Search
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}