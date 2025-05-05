import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import {
  Download,
  Calendar,
  Book,
  Users,
  Activity,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TeacherAnalytics() {
  const { courses } = useAppSelector((state) => state.courses);
  const [dateRange, setDateRange] = useState('30days');
  const [courseFilter, setCourseFilter] = useState('all');

  // Mock enrollment data
  const enrollmentData = [
    { month: 'Jan', students: 15 },
    { month: 'Feb', students: 20 },
    { month: 'Mar', students: 25 },
    { month: 'Apr', students: 35 },
    { month: 'May', students: 30 },
    { month: 'Jun', students: 40 },
    { month: 'Jul', students: 45 },
    { month: 'Aug', students: 60 },
    { month: 'Sep', students: 75 },
    { month: 'Oct', students: 85 },
    { month: 'Nov', students: 90 },
    { month: 'Dec', students: 100 },
  ];

  // Mock engagement data
  const engagementData = [
    { day: 'Mon', hours: 120, students: 65 },
    { day: 'Tue', hours: 150, students: 75 },
    { day: 'Wed', hours: 180, students: 80 },
    { day: 'Thu', hours: 140, students: 70 },
    { day: 'Fri', hours: 160, students: 85 },
    { day: 'Sat', hours: 220, students: 95 },
    { day: 'Sun', hours: 200, students: 90 },
  ];

  // Mock completion data
  const completionData = [
    { course: "Intro to Programming", completed: 28, inProgress: 10, notStarted: 2 },
    { course: "Advanced Data Structures", completed: 15, inProgress: 18, notStarted: 5 },
    { course: "Web Development", completed: 35, inProgress: 8, notStarted: 2 },
    { course: "Machine Learning", completed: 12, inProgress: 25, notStarted: 8 },
  ];

  // Mock student progress data
  const progressData = [
    { name: '0-25%', value: 15 },
    { name: '26-50%', value: 25 },
    { name: '51-75%', value: 35 },
    { name: '76-100%', value: 40 },
  ];

  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

  // Calculate total stats
  const totalStudents = courses.reduce((sum, course) => sum + (course.students || 0), 0);
  const totalCourses = courses.length;
  const averageCompletion = Math.round(
    completionData.reduce((sum, item) => sum + (item.completed / (item.completed + item.inProgress + item.notStarted)) * 100, 0) / 
    completionData.length
  );
  const totalHours = engagementData.reduce((sum, day) => sum + day.hours, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--font-dark)]">Analytics Dashboard</h1>
          <p className="text-[var(--font-light2)]">
            Track student engagement, course performance, and learning outcomes.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[var(--font-light2)]">Total Students</p>
                <h3 className="text-3xl font-bold mt-1">{totalStudents}</h3>
                <Badge className="mt-2 bg-green-500">+12% from last month</Badge>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <Users className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[var(--font-light2)]">Active Courses</p>
                <h3 className="text-3xl font-bold mt-1">{totalCourses}</h3>
                <Badge className="mt-2 bg-blue-500">+2 this quarter</Badge>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <Book className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[var(--font-light2)]">Course Completion</p>
                <h3 className="text-3xl font-bold mt-1">{averageCompletion}%</h3>
                <Badge className="mt-2 bg-amber-500">+5% from last month</Badge>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <Activity className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[var(--font-light2)]">Learning Hours</p>
                <h3 className="text-3xl font-bold mt-1">{totalHours}</h3>
                <Badge className="mt-2 bg-purple-500">+18% from last week</Badge>
              </div>
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[var(--primarybg)]/10">
                <TrendingUp className="h-6 w-6 text-[var(--primarybg)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Analytics */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Student Analytics
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <Book className="h-4 w-4" /> Course Performance
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Engagement
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enrollment Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={enrollmentData}>
                      <defs>
                        <linearGradient id="colorEnrollment" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="students" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorEnrollment)" 
                        name="Students Enrolled"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Student Progress Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={progressData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {progressData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Engagement */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="hours" 
                        fill="hsl(var(--primary))" 
                        name="Learning Hours" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        yAxisId="right" 
                        dataKey="students" 
                        fill="#82ca9d" 
                        name="Active Students"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Student Analytics Tab */}
        <TabsContent value="students">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Activity Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { week: 'Week 1', active: 85, returning: 45 },
                        { week: 'Week 2', active: 90, returning: 60 },
                        { week: 'Week 3', active: 95, returning: 70 },
                        { week: 'Week 4', active: 100, returning: 85 },
                        { week: 'Week 5', active: 120, returning: 90 },
                        { week: 'Week 6', active: 130, returning: 100 },
                        { week: 'Week 7', active: 135, returning: 110 },
                        { week: 'Week 8', active: 140, returning: 120 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="active" 
                        stroke="hsl(var(--primary))" 
                        activeDot={{ r: 8 }}
                        name="Active Students"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="returning" 
                        stroke="#82ca9d"
                        name="Returning Students"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Beginners', value: 45 },
                          { name: 'Intermediate', value: 35 },
                          { name: 'Advanced', value: 20 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Assignment Submission Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Assignment 1', onTime: 80, late: 15, missed: 5 },
                        { name: 'Assignment 2', onTime: 75, late: 20, missed: 5 },
                        { name: 'Assignment 3', onTime: 70, late: 20, missed: 10 },
                        { name: 'Assignment 4', onTime: 65, late: 25, missed: 10 },
                        { name: 'Assignment 5', onTime: 60, late: 30, missed: 10 },
                        { name: 'Quiz 1', onTime: 90, late: 5, missed: 5 },
                        { name: 'Mid-term', onTime: 95, late: 5, missed: 0 },
                      ]}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="onTime" 
                        stackId="a" 
                        fill="#4ade80" 
                        name="On Time"
                      />
                      <Bar 
                        dataKey="late" 
                        stackId="a" 
                        fill="#facc15" 
                        name="Late"
                      />
                      <Bar 
                        dataKey="missed" 
                        stackId="a" 
                        fill="#f87171" 
                        name="Missed"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Course Performance Tab */}
        <TabsContent value="courses">
          <div className="mb-6">
            <Select defaultValue="all" onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[300px]">
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Course Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={completionData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="course" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="completed" 
                        stackId="a" 
                        fill="#4ade80" 
                        name="Completed"
                      />
                      <Bar 
                        dataKey="inProgress" 
                        stackId="a" 
                        fill="#facc15" 
                        name="In Progress"
                      />
                      <Bar 
                        dataKey="notStarted" 
                        stackId="a" 
                        fill="#f87171" 
                        name="Not Started"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Time to Complete</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Intro to Programming', days: 45 },
                        { name: 'Advanced Data Structures', days: 75 },
                        { name: 'Web Development', days: 60 },
                        { name: 'Machine Learning', days: 90 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} days`, 'Average Time']} />
                      <Bar 
                        dataKey="days" 
                        fill="hsl(var(--primary))" 
                        name="Days to Complete"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Ratings by Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { week: 'Week 1', programming: 4.2, dataStructures: 3.8, webDev: 4.5, machineLearning: 4.0 },
                        { week: 'Week 2', programming: 4.3, dataStructures: 3.9, webDev: 4.6, machineLearning: 4.1 },
                        { week: 'Week 3', programming: 4.4, dataStructures: 4.0, webDev: 4.7, machineLearning: 4.2 },
                        { week: 'Week 4', programming: 4.5, dataStructures: 4.1, webDev: 4.8, machineLearning: 4.3 },
                        { week: 'Week 5', programming: 4.6, dataStructures: 4.2, webDev: 4.8, machineLearning: 4.4 },
                        { week: 'Week 6', programming: 4.7, dataStructures: 4.3, webDev: 4.9, machineLearning: 4.5 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="programming" 
                        stroke="#8884d8" 
                        name="Intro to Programming" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="dataStructures" 
                        stroke="#82ca9d" 
                        name="Advanced Data Structures" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="webDev" 
                        stroke="#ffc658" 
                        name="Web Development" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="machineLearning" 
                        stroke="#ff8042" 
                        name="Machine Learning" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { hour: '6 AM', users: 10 },
                        { hour: '8 AM', users: 30 },
                        { hour: '10 AM', users: 45 },
                        { hour: '12 PM', users: 40 },
                        { hour: '2 PM', users: 55 },
                        { hour: '4 PM', users: 70 },
                        { hour: '6 PM', users: 85 },
                        { hour: '8 PM', users: 60 },
                        { hour: '10 PM', users: 40 },
                        { hour: '12 AM', users: 20 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorUsers)" 
                        name="Active Users"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { type: 'Videos', minutes: 1250 },
                        { type: 'Reading', minutes: 850 },
                        { type: 'Interactive', minutes: 1050 },
                        { type: 'Quizzes', minutes: 650 },
                        { type: 'Assignments', minutes: 1450 },
                        { type: 'Discussion', minutes: 550 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} minutes`, 'Time Spent']} />
                      <Bar 
                        dataKey="minutes" 
                        fill="#82ca9d" 
                        name="Minutes Spent"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Engagement Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', videos: 850, quizzes: 300, assignments: 450, discussions: 200 },
                        { month: 'Feb', videos: 900, quizzes: 350, assignments: 500, discussions: 250 },
                        { month: 'Mar', videos: 1000, quizzes: 400, assignments: 550, discussions: 300 },
                        { month: 'Apr', videos: 1100, quizzes: 450, assignments: 600, discussions: 350 },
                        { month: 'May', videos: 1200, quizzes: 500, assignments: 650, discussions: 400 },
                        { month: 'Jun', videos: 1300, quizzes: 550, assignments: 700, discussions: 450 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="videos" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }}
                        name="Video Views"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="quizzes" 
                        stroke="#82ca9d"
                        name="Quiz Attempts"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="assignments" 
                        stroke="#ffc658"
                        name="Assignment Submissions"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="discussions" 
                        stroke="#ff8042"
                        name="Discussion Posts"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}