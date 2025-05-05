import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCourses, fetchAssignments } from '@/redux/slices/coursesSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  GraduationCap,
  Clock,
  BarChart2,
  ChevronRight,
} from 'lucide-react';

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { courses, assignments, loading } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchAssignments());
  }, [dispatch]);

  // Filter enrolled courses for the student
  const enrolledCourses = courses.filter((course) => course.enrolled);

  // Calculate overall progress
  const overallProgress = enrolledCourses.length > 0
    ? Math.round(
        enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) /
          enrolledCourses.length
      )
    : 0;

  // Get upcoming assignments (not completed and closest due date)
  const upcomingAssignments = assignments
    .filter((assignment) => !assignment.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Calculate days remaining for an assignment
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--font-dark)]">
          Welcome back, {user?.name?.split(' ')[0] || 'Student'}
        </h1>
        <p className="text-[var(--font-light2)]">
          Here's an overview of your learning progress and upcoming tasks.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--font-light2)] text-sm">Enrolled Courses</p>
                <h3 className="text-3xl font-bold text-[var(--font-dark)]">
                  {enrolledCourses.length}
                </h3>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <BookOpen className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--font-light2)] text-sm">Overall Progress</p>
                <h3 className="text-3xl font-bold text-[var(--font-dark)]">
                  {overallProgress}%
                </h3>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <BarChart2 className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--font-light2)] text-sm">Pending Assignments</p>
                <h3 className="text-3xl font-bold text-[var(--font-dark)]">
                  {assignments.filter((a) => !a.completed).length}
                </h3>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <Clock className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--font-light2)] text-sm">Completed Courses</p>
                <h3 className="text-3xl font-bold text-[var(--font-dark)]">
                  {enrolledCourses.filter((course) => (course.progress || 0) === 100).length}
                </h3>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <GraduationCap className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses and Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recently Accessed Courses */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Recent Courses</CardTitle>
                <Link to="/student/courses">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-6">
                  <div className="animate-pulse text-[var(--font-light2)]">Loading courses...</div>
                </div>
              ) : enrolledCourses.length > 0 ? (
                <div className="space-y-6">
                  {enrolledCourses.slice(0, 3).map((course) => (
                    <div key={course.id} className="flex space-x-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-[var(--font-dark)]">
                            {course.title}
                          </h3>
                          <Badge variant="outline">{course.progress}%</Badge>
                        </div>
                        <p className="text-sm text-[var(--font-light2)] mb-2">
                          Instructor: {course.instructor}
                        </p>
                        <Progress value={course.progress} className="h-2" />
                        <div className="mt-2 flex justify-end">
                          <Link to={`/student/learning-mode?course=${course.id}`}>
                            <Button size="sm" variant="outline">
                              Continue Learning
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[var(--font-light2)] mb-4">
                    You haven't enrolled in any courses yet.
                  </p>
                  <Link to="/student/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Assignments */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Upcoming Deadlines</CardTitle>
                <Link to="/student/assignments">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-6">
                  <div className="animate-pulse text-[var(--font-light2)]">
                    Loading assignments...
                  </div>
                </div>
              ) : upcomingAssignments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => {
                    const daysRemaining = getDaysRemaining(assignment.dueDate);
                    const course = courses.find((c) => c.id === assignment.courseId);
                    
                    return (
                      <Card key={assignment.id} className="border border-[var(--border-light)]">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-[var(--font-dark)]">
                                {assignment.title}
                              </h4>
                              <p className="text-sm text-[var(--font-light2)]">
                                {course?.title || 'Unknown Course'}
                              </p>
                            </div>
                            <Badge
                              variant={
                                daysRemaining <= 1
                                  ? 'destructive'
                                  : daysRemaining <= 3
                                  ? 'outline'
                                  : 'secondary'
                              }
                            >
                              {daysRemaining <= 0
                                ? 'Due Today'
                                : `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left`}
                            </Badge>
                          </div>
                          <div className="mt-3 text-xs text-[var(--font-light2)]">
                            Due: {formatDate(assignment.dueDate)}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[var(--font-light2)]">No upcoming deadlines.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}