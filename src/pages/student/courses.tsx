import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCourses } from '@/redux/slices/coursesSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search } from 'lucide-react';

export default function StudentCourses() {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Separate enrolled and available courses
  const enrolledCourses = courses.filter((course) => course.enrolled);
  const availableCourses = courses.filter((course) => !course.enrolled);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--font-dark)]">My Courses</h1>
          <p className="text-[var(--font-light2)]">
            View your enrolled courses and discover new ones.
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--font-light2)]" />
          <Input className="pl-9" placeholder="Search courses..." />
        </div>
      </div>

      {/* Enrolled Courses */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-[var(--font-dark)] mb-4">
          Enrolled Courses
        </h2>
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-pulse text-[var(--font-light2)]">Loading courses...</div>
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{course.progress}% Complete</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-[var(--font-dark)] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[var(--font-light2)] mb-3">
                    Instructor: {course.instructor}
                  </p>
                  <Progress value={course.progress} className="h-2 mb-4" />
                  <div className="flex justify-between">
                    <Link to={`/student/learning-mode?course=${course.id}`}>
                      <Button variant="outline">Continue Learning</Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted">
            <CardContent className="p-8 text-center">
              <p className="text-[var(--font-light2)] mb-4">
                You haven't enrolled in any courses yet.
              </p>
              <p className="mb-4">
                Explore our available courses below to start your learning journey.
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Available Courses */}
      <section>
        <h2 className="text-xl font-bold text-[var(--font-dark)] mb-4">
          Available Courses
        </h2>
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-pulse text-[var(--font-light2)]">Loading courses...</div>
          </div>
        ) : availableCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-[var(--font-dark)] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[var(--font-light2)] mb-4">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-sm text-[var(--font-light2)] mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <Button className="w-full bg-[var(--primarybg)] hover:bg-[var(--primarybg)]/90">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted">
            <CardContent className="p-8 text-center">
              <p className="text-[var(--font-light2)]">
                No additional courses available at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}