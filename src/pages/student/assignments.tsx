import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAssignments, fetchCourses } from '@/redux/slices/coursesSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  ClipboardCheck,
  Clock,
  FileCheck,
  FilePlus,
  Filter,
} from 'lucide-react';

export default function StudentAssignments() {
  const dispatch = useAppDispatch();
  const { assignments, courses, loading } = useAppSelector((state) => state.courses);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    dispatch(fetchAssignments());
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter assignments
  const pendingAssignments = assignments.filter((assignment) => !assignment.completed);
  const completedAssignments = assignments.filter((assignment) => assignment.completed);

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

  // Calculate time remaining for an assignment
  const getTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    
    if (diffTime <= 0) {
      return 'Overdue';
    }
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} left`;
    } else {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} left`;
    }
  };

  // Get status badge based on due date
  const getStatusBadge = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffTime <= 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else if (diffDays <= 1) {
      return <Badge variant="destructive">Urgent</Badge>;
    } else if (diffDays <= 3) {
      return <Badge>Soon</Badge>;
    } else {
      return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--font-dark)]">Assignments</h1>
          <p className="text-[var(--font-light2)]">
            Manage your course assignments and submissions.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Assignment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Pending
            {pendingAssignments.length > 0 && (
              <Badge variant="outline" className="ml-1">
                {pendingAssignments.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" /> Completed
            {completedAssignments.length > 0 && (
              <Badge variant="outline" className="ml-1">
                {completedAssignments.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Pending Assignments */}
        <TabsContent value="pending">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-pulse text-[var(--font-light2)]">
                Loading assignments...
              </div>
            </div>
          ) : pendingAssignments.length > 0 ? (
            <div className="space-y-4">
              {pendingAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {assignment.title}
                        </CardTitle>
                        <CardDescription>
                          {getCourseTitle(assignment.courseId)}
                        </CardDescription>
                      </div>
                      {getStatusBadge(assignment.dueDate)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--font-light2)]">
                        <Clock className="h-4 w-4" />
                        <span>Due: {formatDate(assignment.dueDate)}</span>
                        <span className="text-[var(--font-light2)]/80">
                          ({getTimeRemaining(assignment.dueDate)})
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button
                          className="bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90"
                          size="sm"
                        >
                          <FilePlus className="h-4 w-4 mr-2" /> Submit Assignment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted">
              <CardContent className="p-8 text-center">
                <p className="text-[var(--font-light2)] mb-2">
                  You have no pending assignments.
                </p>
                <p>All caught up! Check the completed tab to see your past work.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Completed Assignments */}
        <TabsContent value="completed">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-pulse text-[var(--font-light2)]">
                Loading assignments...
              </div>
            </div>
          ) : completedAssignments.length > 0 ? (
            <div className="space-y-4">
              {completedAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {assignment.title}
                        </CardTitle>
                        <CardDescription>
                          {getCourseTitle(assignment.courseId)}
                        </CardDescription>
                      </div>
                      <Badge variant="success" className="bg-green-500">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--font-light2)]">
                        <FileCheck className="h-4 w-4" />
                        <span>Submitted: {formatDate(assignment.dueDate)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Submission
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Feedback
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted">
              <CardContent className="p-8 text-center">
                <p className="text-[var(--font-light2)] mb-2">
                  You have no completed assignments.
                </p>
                <p>
                  Check the pending tab to see assignments that need your attention.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}