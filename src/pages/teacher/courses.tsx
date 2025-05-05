import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCourses } from '@/redux/slices/coursesSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Pencil, MoreVertical, FileCog, Users, BookOpen } from 'lucide-react';
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

export default function TeacherCourses() {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.courses);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter and search courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'popular') return matchesSearch && (course.students || 0) > 30;
    if (filter === 'recent') return matchesSearch; // In a real app, would filter by creation date
    return matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--font-dark)]">Course Management</h1>
          <p className="text-[var(--font-light2)]">
            Create, edit and manage your courses.
          </p>
        </div>
        <Link to="/teacher/courses/new">
          <Button className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90">
            <Plus className="h-4 w-4 mr-2" /> Create New Course
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--font-light2)]" />
          <Input 
            className="pl-9" 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="popular">Popular Courses</SelectItem>
              <SelectItem value="recent">Recently Created</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-pulse text-[var(--font-light2)]">Loading courses...</div>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Course Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to={`/teacher/courses/${course.id}`} className="flex items-center w-full">
                          <Pencil className="h-4 w-4 mr-2" /> Edit Course
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileCog className="h-4 w-4 mr-2" /> Manage Content
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" /> View Students
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Delete Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-[var(--primarybg)]" />
                  <Badge variant="outline">{course.students} Students</Badge>
                </div>
                <h3 className="font-semibold text-lg text-[var(--font-dark)] mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-[var(--font-light2)] mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex justify-between gap-2">
                  <Link to={`/teacher/courses/${course.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Pencil className="h-4 w-4 mr-2" /> Edit
                    </Button>
                  </Link>
                  <Link to={`/teacher/courses/${course.id}/students`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Users className="h-4 w-4 mr-2" /> Students
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-muted">
          <CardContent className="p-8 text-center">
            <p className="text-[var(--font-light2)] mb-4">
              No courses found matching your search criteria.
            </p>
            {searchTerm ? (
              <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
            ) : (
              <Link to="/teacher/courses/new">
                <Button className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90">
                  Create Your First Course
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}