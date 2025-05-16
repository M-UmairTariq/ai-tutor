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

import clock_image from "@/assets/images/clock_image.png"

import { Calendar } from "@/components/ui/calendar"
import Badge_04 from "@/assets/images/Badge_04.png"
import DashboardProfile from '@/components/ui/DashboardProfile';
import chatModeAvatar from "@/assets/svgs/chatModeAvatar.svg";
import photoModeAvatar from "@/assets/svgs/photoModeAvatar.svg";


export default function LanguageLearningDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date())

  const modes = [
    {
      title: "Chat Mode",
      description: "Enhance your language skills by chatting with our AI.",
      image: chatModeAvatar,
      route: "/student/learning-modes/chat-mode",
    },
    {
      title: "Photo Mode",
      description: "Let's break down images and get instant feedback from AI.",
      image: photoModeAvatar,
      route: "/student/learning-modes/photo-mode",
    },
  ];

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
      <div className="flex-1 container mx-auto px-4 py-4">



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
            <div className='mb-4'>
              <h1 className="text-3xl font-medium text-black">Hi <span className='text-[var(--primarybg)] font-bold'> {user.name}! </span></h1>
              <p className="text-[var(--font-light2)] mt-4">
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
                        <div className=" rounded-full p-2 flex items-center justify-center w-16 h-16">
                          {/* <Clock className="h-6 w-6 text-blue-600" /> */}
                          <img src={clock_image} alt="" />
                        </div>
                        <div className='py-2'>
                          <p className="text-xs text-gray-500">{task.date}</p>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">{task.duration}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="sm" className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-3xl">
                          Continue
                        </Button>

                      </div>
                    </div>
                    <div className="flex item-center justify-between mt-2 bg-gray-100 p-2 rounded-3xl">
                      <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto flex items-center">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {[...Array(task.participants)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-xs">
                              {i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Learning Modes */}
            {/* <h2 className="text-xl font-bold mt-8 mb-4">Learning Modes</h2>
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
            </div> */}
          </div>

          {/* Right Column - Calendar and Stats */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <DashboardProfile />

              <div className='min-w-[250px] border rounded-md shadow'>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className=""
                />
              </div>

            </div>

            {/* Stats Cards */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Left Side: Two Cards */}
              <div className="flex flex-1 gap-4">
                <Card className="bg-orange-400 text-white shadow-sm flex-1">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-start">
                      <BarChart2 className="h-auto w-12" />
                      <h4 className="text-sm font-medium">Streak</h4>
                    </div>
                    <div className="text-4xl font-bold mt-2 text-start">{user.streak}</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500 text-white shadow-sm flex-1">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <Trophy className="h-auto w-20" />
                      <h4 className="text-sm font-medium">Ranking</h4>
                    </div>
                    <div className="text-4xl font-bold mt-2 text-center">{user.ranking}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side: Levels */}
              <div className="flex-1 bg-gray-100 rounded-lg p-4 flex flex-col gap-2">
                <div className="flex items-center gap-4 mb-4">
                  <img src={Badge_04} alt="" />
                  <div>
                    <h4 className="text-xl font-bold">Level 3</h4>
                    <p className="text-sm mt-1 text-[var(--font-light2)]">Here is the level of your progress</p>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-75"></div> {/* 75% progress */}
                </div>

                <p className='mt-2 text-[var(--font-light2)]'>75 percent so progress in sum</p>
              </div>
            </div>


              {/* Learning Modes */}
            <div className='p-6 bg-gray-100 rounded-3xl'>
              <h1 className='font-bold text-2xl mb-6'>Learning Modes</h1>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {modes.map((mode, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row  border border-gray-150 rounded-3xl p-4 bg-white hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Top row for mobile/tablet/small screens */}
                    <div className="flex w-full items-center justify-between mb-4 lg:hidden">
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={mode.image}
                          alt={`${mode.title} avatar`}
                          className="w-16 h-16 object-contain"
                        />
                        <h2 className="text-lg font-bold text-[var(--font-dark)]">{mode.title}</h2>
                      </div>
                      <Button
                        className="text-[var(--font-dark)] font-bold bg-[var(--cardbg)] hover:bg-[var(--cardbg)] active:bg-[var(--cardbg)] focus:bg-[var(--cardbg)] rounded-full"
                        onClick={() => { }}
                      >
                        Start
                      </Button>
                    </div>

                    {/* Description below on mobile/tablet */}
                    <p className="text-sm text-[var(--font-light2)] mb-4 lg:hidden text-left">
                      {mode.description}
                    </p>

                    {/* Large screen layout */}
                    <div className="hidden lg:flex font-sans flex-1 mb-6 lg:mb-0 lg:mr-6 flex-col">
                      <h2 className="text-xl font-bold text-[var(--font-dark)] mb-4">{mode.title}</h2>
                      <p className="text-sm text-[var(--font-light2)] mb-4">{mode.description}</p>
                      <Button
                        className="text-[var(--font-dark)] font-bold bg-[var(--cardbg)] hover:bg-[var(--cardbg)] active:bg-[var(--cardbg)] focus:bg-[var(--cardbg)] rounded-full ml-2 mt-2 lg:w-16 w-full"
                        onClick={() => { }}
                      >
                        Start
                      </Button>

                    </div>

                    {/* Image on large screens */}
                    <div className="hidden lg:flex w-40 h-40 flex-shrink-0 items-center justify-center">
                      <img
                        src={mode.image}
                        alt={`${mode.title} avatar`}
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </div>


                ))}
              </div>

            </div>



          </div>

        </div>
      </div>
    </div>
  );
}