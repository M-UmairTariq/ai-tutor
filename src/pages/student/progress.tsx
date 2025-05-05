import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCourses } from '@/redux/slices/coursesSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  BookOpen,
  CheckCircle,
  Clock,
  PieChart,
  TrendingUp,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

export default function StudentProgress() {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.courses);
  const enrolledCourses = courses.filter((course) => course.enrolled);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Calculate overall progress
  const overallProgress = enrolledCourses.length > 0
    ? Math.round(
        enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) /
          enrolledCourses.length
      )
    : 0;

  // Generate weekly activity data (mock data for demonstration)
  const weeklyActivityData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 0.5 },
    { day: 'Thu', hours: 1.0 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 3.0 },
    { day: 'Sun', hours: 0.8 },
  ];

  // Generate subject progress data
  const subjectProgressData = [
    { name: 'Programming', progress: 72 },
    { name: 'Data Structures', progress: 45 },
    { name: 'Web Development', progress: 85 },
    { name: 'Machine Learning', progress: 25 },
  ];

  // Generate completion data for pie chart
  const completionStatusData = [
    { name: 'Completed', value: enrolledCourses.filter(c => (c.progress || 0) === 100).length },
    { name: 'In Progress', value: enrolledCourses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length },
    { name: 'Not Started', value: enrolledCourses.filter(c => (c.progress || 0) === 0).length },
  ];

  const COLORS = ['#22c55e', '#06b6d4', '#94a3b8'];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--font-dark)]">
          Learning Progress
        </h1>
        <p className="text-[var(--font-light2)]">
          Track your learning journey and monitor your achievements.
        </p>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--font-light2)]">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{overallProgress}%</div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <Progress value={overallProgress} className="h-2 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--font-light2)]">
              Enrolled Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{enrolledCourses.length}</div>
              <BookOpen className="h-4 w-4 text-[var(--primarybg)]" />
            </div>
            <p className="text-sm text-[var(--font-light2)] mt-3">
              {enrolledCourses.filter(c => (c.progress || 0) === 100).length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--font-light2)]">
              Learning Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">12 days</div>
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-sm text-[var(--font-light2)] mt-3">
              Keep it up! You're doing great.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Activities
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Courses
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Hours spent learning this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={weeklyActivityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="hours"
                        fill="hsl(var(--primary))"
                        name="Hours"
                        radius={[4, 4, 0, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Course Completion Status */}
            <Card>
              <CardHeader>
                <CardTitle>Course Completion Status</CardTitle>
                <CardDescription>Overview of your enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={completionStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        label
                      >
                        {completionStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Progress */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectProgressData.map((subject) => (
                    <div key={subject.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-[var(--font-light2)]">{subject.progress}%</div>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities">
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Learning Time Trend</CardTitle>
                <CardDescription>Hours spent learning over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { week: 'Week 1', hours: 5 },
                        { week: 'Week 2', hours: 7 },
                        { week: 'Week 3', hours: 4 },
                        { week: 'Week 4', hours: 9 },
                        { week: 'Week 5', hours: 12 },
                        { week: 'Week 6', hours: 8 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="hsl(var(--primary))"
                        activeDot={{ r: 8 }}
                        name="Hours Spent Learning"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-4 border-[var(--primarybg)] pl-4 py-1">
                    <div className="font-medium">Completed "Advanced CSS Techniques" lesson</div>
                    <div className="text-sm text-[var(--font-light2)]">
                      Web Development Masterclass • 2 hours ago
                    </div>
                  </div>
                  <div className="border-l-4 border-[var(--primarybg)] pl-4 py-1">
                    <div className="font-medium">Submitted "Binary Search Tree Implementation" assignment</div>
                    <div className="text-sm text-[var(--font-light2)]">
                      Advanced Data Structures • Yesterday
                    </div>
                  </div>
                  <div className="border-l-4 border-[var(--primarybg)] pl-4 py-1">
                    <div className="font-medium">Started "Machine Learning Fundamentals" course</div>
                    <div className="text-sm text-[var(--font-light2)]">
                      Machine Learning • 3 days ago
                    </div>
                  </div>
                  <div className="border-l-4 border-[var(--primarybg)] pl-4 py-1">
                    <div className="font-medium">Earned "JavaScript Basics" certificate</div>
                    <div className="text-sm text-[var(--font-light2)]">
                      Introduction to Programming • 1 week ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-pulse text-[var(--font-light2)]">Loading courses...</div>
              </div>
            ) : enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full md:w-32 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-[var(--font-dark)]">{course.title}</h3>
                            <p className="text-sm text-[var(--font-light2)]">
                              Instructor: {course.instructor}
                            </p>
                          </div>
                          {(course.progress || 0) === 100 ? (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" /> Completed
                            </Badge>
                          ) : (
                            <Badge variant="outline">{course.progress}% Complete</Badge>
                          )}
                        </div>
                        <Progress value={course.progress} className="h-2 my-2" />
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-[var(--font-light2)]">
                            Last activity: 2 days ago
                          </div>
                          <div className="text-[var(--primarybg)]">
                            {(course.progress || 0) < 100 
                              ? `${100 - (course.progress || 0)}% remaining` 
                              : 'Course completed!'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-muted">
                <CardContent className="p-8 text-center">
                  <p className="text-[var(--font-light2)] mb-2">
                    You haven't enrolled in any courses yet.
                  </p>
                  <p>Enroll in courses to start tracking your progress.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}