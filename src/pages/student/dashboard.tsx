import { useState } from 'react';
import {
  Card,
  CardContent,
  // CardHeader,
  // CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  MessageCircle,
  ChevronRight,
  Trophy,
  BarChart2,
  // Book,
  // CheckCircle,
  // User,
  // ArrowRight
} from 'lucide-react';

import { Calendar } from "@/components/ui/calendar"


export default function LanguageLearningDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date())


  const user = {
    name: "Huynam Moinon",
    email: "huynammoinon@gmail.com",
    level: 3,
    progress: 75,
    streak: 24,
    ranking: 12,
    achievements: 9,
    badges: 5,
    profileImage: 'https://randomuser.me/api/portraits/men/75.jpg'

  };

  // Mock task data
  const tasks = [
    {
      id: 1,
      title: "Chat With Emma",
      date: "22 dec 2023",
      duration: "20 min",
      participants: 2,
      completed: false,
      expired: false
    },
    {
      id: 2,
      title: "Chat With Emma",
      date: "22 dec 2023",
      duration: "20 min",
      participants: 2,
      completed: false,
      expired: false
    },
    {
      id: 3,
      title: "Chat With Emma",
      date: "22 dec 2023",
      duration: "20 min",
      participants: 2,
      completed: false,
      expired: false
    }
  ];

  // Mock calendar data
  // const currentMonth = "January 2024";
  // const currentDate = 21;

  // const calendarDays = [
  //   { day: "MO", dates: [1, 8, 15, 22, 29] },
  //   { day: "TU", dates: [2, 9, 16, 23, 30] },
  //   { day: "WE", dates: [3, 10, 17, 24, 31] },
  //   { day: "TH", dates: [4, 11, 18, 25, null] },
  //   { day: "FR", dates: [5, 12, 19, 26, null] },
  //   { day: "SA", dates: [6, 13, 20, 27, null] },
  //   { day: "SU", dates: [7, 14, 21, 28, null] },
  // ];

  // Learning modes
  const learningModes = [
    {
      title: "Chat",
      description: "Enhance your language skills by chatting with our AI teacher.",
      icon: <MessageCircle className="h-6 w-6 text-white" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen border border-[var(--border-light)] rounded-3xl">
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6">



        {/* <Card className="w-full md:w-64 mt-4 md:mt-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="flex justify-between mt-3">
                <div className="text-center">
                  <Button variant="ghost" className="p-1 h-auto flex flex-col">
                    <span>Achievements</span>
                    <span className="text-xl font-bold">5</span>
                  </Button>
                </div>
                <div className="text-center">
                  <Button variant="ghost" className="p-1 h-auto flex flex-col">
                    <span>Badges</span>
                    <span className="text-xl font-bold">5</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Column - Tasks */}
          <div className="md:col-span-2 bg-gray-50 rounded-3xl ">
            <div className='md:mb-4'>
              <h1 className="text-3xl font-bold text-black">Hi <span className='text-blue-600'> {user.name}! </span></h1>
              <p className="text-gray-600">
                Nice to have you back, what an exciting day!<br />
                Get ready and continue your lesson today.
              </p>
            </div>
            <h2 className="text-xl font-bold mb-4 text-[var(--font-dark)]">Today Tasks</h2>

            {/* Task Tabs */}
            <div className="flex gap-4 mb-4 bg-gray-100 px-1 py-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 rounded-xl py-21  ${activeTab === 'all' ? 'bg-white text-[var(--text-color-1)]' : 'bg-gray-100 text-[var(--text-color-2)] '}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 rounded-xl py-2  ${activeTab === 'completed' ? 'bg-white text-[var(--text-color-1)]' : 'bg-gray-100 text-[var(--text-color-2)]'}`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('expired')}
                className={`flex-1 rounded-xl py-2  ${activeTab === 'expired' ? 'bg-white text-[var(--text-color-1)]' : 'bg-gray-100 text-[var(--text-color-2)]'}`}
              >
                Expired
              </button>
            </div>


            {/* Task List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{task.date}</p>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">{task.duration}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="sm" className="bg-blue-100 hover:bg-blue-200 text-blue-700">
                          Continue
                        </Button>
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {[...Array(task.participants)].map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-xs">
                                {i + 1}
                              </div>
                            ))}
                          </div>
                          <Badge variant="outline" className="ml-1">
                            {task.participants}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto flex items-center">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Learning Modes */}
            <h2 className="text-xl font-bold mt-8 mb-4">Learning Modes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningModes.map((mode, index) => (
                <div key={index} className="flex">
                  <Card className="flex-1 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{mode.title}</h3>
                      <p className="text-gray-600 mb-4">{mode.description}</p>
                      <Button>
                        Start {mode.title}
                      </Button>
                    </CardContent>
                  </Card>
                  <div className="flex items-end ml-2">
                    <div className="bg-blue-100 rounded-lg w-24 h-24 flex items-center justify-center overflow-hidden">
                      <img
                        src="/api/placeholder/100/100"
                        alt="AI Teacher"
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Calendar and Stats */}
          <div className="md:col-span-3">
            {/* Grid with Profile on Left & Calendar on Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">

              <Card className="w-full max-w-md bg-slate-50 ">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4 rounded-3xl gradientBg ">
                    <div className="flex items-center">
                      <div className="relative p-16 ">
                        <div className="absolute top-16 left-4 w-20 h-20 rounded-lg overflow-hidden">
                          <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover border p-1 bg-white rounded-2xl"
                          />
                        </div>
                        <div className="absolute -bottom-7 right-4 bg-yellow-300 rounded-full p-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 bg-white rounded-full px-6 py-3 text-center flex justify-between items-center">
                      <span className="text-sm text-gray-600">Achievements</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-600 rounded-full px-3">
                        {user.achievements}
                      </Badge>
                    </div>

                    <div className="flex-1 bg-white rounded-full px-6 py-3 text-center flex justify-between items-center">
                      <span className="text-sm text-gray-600">Badges</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-600 rounded-full px-3">
                        {user.badges}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>




              <div className='min-w-[300px] border rounded-md shadow'>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className=""
                />
              </div>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-orange-400 text-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <BarChart2 className="h-6 w-6" />
                    <h4 className="text-sm font-medium">Streak</h4>
                  </div>
                  <div className="text-4xl font-bold mt-2">{user.streak}</div>
                </CardContent>
              </Card>

              <Card className="bg-purple-500 text-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Trophy className="h-6 w-6" />
                    <h4 className="text-sm font-medium">Ranking</h4>
                  </div>
                  <div className="text-4xl font-bold mt-2">{user.ranking}</div>
                </CardContent>
              </Card>
            </div>

            {/* Level Card */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Level {user.level}</h3>
                    <p className="text-xs text-gray-500">Here is the level of your progress</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{user.progress} percent</span>
                    <span>in xam</span>
                  </div>
                  <Progress value={user.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}