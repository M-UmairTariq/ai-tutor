import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAssignments, fetchCourses } from '@/redux/slices/coursesSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  FilePlus,
  FileCheck,
  Calendar,
  BookOpen,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TeacherAssignments() {
  const dispatch = useAppDispatch();
  const { assignments, courses, loading } = useAppSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchAssignments());
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter assignments
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || assignment.courseId === courseFilter;
    return matchesSearch && matchesCourse;
  });

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Get course title by ID
  const getCourseTitle = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  // Generate random submission stats for demo purposes
  const getSubmissionStats = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const totalStudents = course?.students || 0;
    const submitted = Math.floor(Math.random() * totalStudents);
    const graded = Math.floor(Math.random() * submitted);
    
    return {
      submitted,
      totalStudents,
      graded,
    };
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--font-dark)]">Assignment Management</h1>
          <p className="text-[var(--font-light2)]">
            Create, manage and grade assignments for your courses.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90 flex items-center gap-2">
              <Plus className="h-4 w-4" /> Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Create a new assignment for your students to complete.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right font-medium text-sm">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Assignment title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="course" className="text-right font-medium text-sm">
                  Course
                </label>
                <Select defaultValue="1">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="dueDate" className="text-right font-medium text-sm">
                  Due Date
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right font-medium text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Assignment description and instructions"
                  className="col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90">Create Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--font-light2)]" />
          <Input 
            className="pl-9" 
            placeholder="Search assignments..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
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

      {/* Assignments Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Assignments</CardTitle>
          <CardDescription>Manage and track your course assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-pulse text-[var(--font-light2)]">Loading assignments...</div>
            </div>
          ) : filteredAssignments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => {
                  const stats = getSubmissionStats(assignment.courseId);
                  
                  return (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--primarybg)]/10 flex items-center justify-center">
                            <FilePlus className="h-5 w-5 text-[var(--primarybg)]" />
                          </div>
                          <div>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-xs text-[var(--font-light2)]">
                              Created on {formatDate(assignment.dueDate.split('T')[0]+'T00:00:00Z')}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-[var(--font-light2)]" />
                          <span>{getCourseTitle(assignment.courseId)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[var(--font-light2)]" />
                          <span>{formatDate(assignment.dueDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline">{stats.submitted}/{stats.totalStudents}</Badge>
                            <span className="text-xs text-[var(--font-light2)]">Submitted</span>
                          </div>
                          <div className="text-xs text-[var(--font-light2)] mt-1">
                            {stats.graded} Graded
                          </div>
                        </div>
                      </TableCell>
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
                            <DropdownMenuItem>
                              <FilePlus className="h-4 w-4 mr-2" /> Edit Assignment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileCheck className="h-4 w-4 mr-2" /> Grade Submissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              Delete Assignment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--font-light2)] mb-2">
                No assignments found matching your criteria.
              </p>
              {searchTerm || courseFilter !== 'all' ? (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setCourseFilter('all');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90">
                      Create Your First Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    {/* Dialog content would be the same as above */}
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}