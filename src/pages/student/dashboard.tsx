// import { useEffect } from 'react';
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// // import { Progress } from '@/components/ui/progress';
// import {
//     // Clock,
//     // MessageCircle,
//     // ChevronRight,
//     // Trophy,
//     BarChart2,
//     Activity,
//     CheckSquare,
// } from 'lucide-react';

// import { Calendar } from "@/components/ui/calendar"
// import Badge_04 from "@/assets/images/Badge_04.png"
// import DashboardProfile from '@/components/ui/DashboardProfile';
// // import { BarChartComponent } from '@/components/ui/barChartComponent';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { fetchDashboardData } from '@/redux/slices/dashboardSlice';
// import { Skeleton } from "@/components/ui/skeleton";

// export default function LanguageLearningDashboard() {
//     const myUser = localStorage.getItem("AiTutorUser");
//     let parsedUser = JSON.parse(myUser || '{}');
//     const currentUserId = parsedUser?.id;

//     const dispatch = useAppDispatch();
//     const { data, isLoading } = useAppSelector(state => state.dashboard);

//     useEffect(() => {
//         dispatch(fetchDashboardData(currentUserId));
//     }, []);

//     const user = data?.userInfo;
//     const usageRecords = data?.usageRecords;



//     // const myTopics = {
//     //     "chat-mode": 3,
//     //     "Dialogue-mode": 3,
//     //     "funny-mode": 3,
//     //     "photo-mode": 5
//     // }


//     return (
//         <div className="flex flex-col  border border-[var(--border-light)] rounded-3xl container p-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mb-6 w-full mx-auto">
//                 {isLoading ? (
//                     // Profile Skeleton
//                     <div className="col-span-1 border rounded-lg shadow p-4">
//                         <div className="flex items-center space-x-4">
//                             <Skeleton className="h-16 w-16 rounded-full" />
//                             <div className="space-y-2">
//                                 <Skeleton className="h-5 w-36" />
//                                 <Skeleton className="h-4 w-24" />
//                             </div>
//                         </div>
//                         <div className="mt-4 space-y-3">
//                             <Skeleton className="h-4 w-full" />
//                             <Skeleton className="h-4 w-3/4" />
//                         </div>
//                     </div>
//                 ) : (

//                     <DashboardProfile user={user} />
//                 )}

//                 {isLoading ? (
//                     // Calendar Skeleton
//                     <div className="min-w-[350px] col-span-2 border rounded-lg shadow p-4">
//                         <div className="space-y-2">
//                             <Skeleton className="h-6 w-48" />
//                             <div className="grid grid-cols-7 gap-2 mt-2">
//                                 {Array.from({ length: 7 }).map((_, index) => (
//                                     <Skeleton key={index} className="h-4 w-8" />
//                                 ))}
//                             </div>
//                             <div className="grid grid-cols-7 gap-2 mt-4">
//                                 {Array.from({ length: 35 }).map((_, index) => (
//                                     <Skeleton key={index} className="h-10 w-10 rounded-md" />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className='min-w-[300px] col-span-2 border rounded-lg shadow'>
//                         <Calendar
//                             mode="single"
//                             usageRecords={usageRecords}
//                         />
//                     </div>
//                 )}
//             </div>

//             {/* Stats Cards */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 {isLoading ? (
//                     <>
//                         {/* Stats Card Skeletons */}
//                         <div className="flex flex-1 gap-4">
//                             <Card className="flex-1 shadow-sm">
//                                 <CardContent className="p-4">
//                                     <Skeleton className="h-12 w-12 mb-2" />
//                                     <Skeleton className="h-4 w-16 mb-2" />
//                                     <Skeleton className="h-10 w-24" />
//                                 </CardContent>
//                             </Card>

//                             <Card className="flex-1 shadow-sm">
//                                 <CardContent className="p-4">
//                                     <Skeleton className="h-12 w-12 mb-2" />
//                                     <Skeleton className="h-4 w-16 mb-2" />
//                                     <Skeleton className="h-10 w-24" />
//                                 </CardContent>
//                             </Card>
//                         </div>

//                         {/* Level Card Skeleton */}
//                         <div className="flex-1 bg-gray-100 rounded-lg p-4">
//                             <div className="flex items-center gap-4 mb-4">
//                                 <Skeleton className="h-12 w-12 rounded" />
//                                 <div>
//                                     <Skeleton className="h-6 w-24 mb-2" />
//                                     <Skeleton className="h-4 w-48" />
//                                 </div>
//                             </div>
//                             <Skeleton className="h-4 w-full rounded-full" />
//                             <Skeleton className="h-4 w-32 mt-2" />
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         {/* Left Side: Two Cards */}
//                         <div className="flex flex-1 gap-4">
//                             <Card className="bg-orange-400 text-white shadow-sm flex-1  ">
//                                 <CardContent className="p-4 flex flex-col justify-evenly h-full">
//                                     <div className="flex flex-col items-start">
//                                         <BarChart2 className="h-auto w-12" />
//                                     </div>
//                                     <h4 className="text-md font-medium mt-2">Streak</h4>

//                                     <div className="text-4xl font-bold mt-2 text-start">{data?.streak}</div>
//                                 </CardContent>
//                             </Card>

//                             <Card className="bg-purple-500 text-white shadow-sm flex-1">
//                                 <CardContent className="p-4 flex flex-col justify-evenly h-full">
//                                     <div className="flex flex-col items-start">
//                                         <Activity className="h-auto w-12" />
//                                     </div>
//                                     <h4 className="text-md font-medium mt-2">Daily Usage</h4>
//                                     <div className="text-4xl font-bold mt-2 text-start">{data?.dailyUsage}</div>
//                                 </CardContent>
//                             </Card>

//                             {/* <Card className="bg-blue-400 text-white shadow-sm flex-1">
//                                 <CardContent className="p-4 flex flex-col justify-start h-full">
//                                     <h4 className="text-md font-medium mt-2">Completed Topics</h4>

//                                     <div className="mt-4 space-y-2">
//                                         {data?.completedTopics &&
//                                             Object.entries(data.completedTopics).map(([mode, count]) => (
//                                                 <div key={mode} className="flex justify-between text-lg font-semibold">
//                                                     <span className="capitalize">{mode.replace(/-/g, ' ')}</span>
//                                                     <span>{count}</span>
//                                                 </div>
//                                             ))}
//                                     </div>
//                                 </CardContent>
//                             </Card> */}


//                         </div>

//                         {/* Right Side: Levels */}
//                         <div className="flex-1 gradientBg rounded-lg p-4 flex flex-col gap-4">
//                             <div className="flex items-center gap-4">
//                                 <img src={Badge_04} alt="Streak Badge" className="w-12 h-12" />
//                                 <div>
//                                     <h4 className="text-xl font-bold">Longest Streak</h4>
//                                     <p className="text-sm mt-1 text-gray-500">Your highest consecutive days</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center justify-center h-32 bg-white rounded-lg shadow-inner">
//                                 <span className="text-5xl font-extrabold text-blue-600">{data?.longestStreak}</span>
//                                 <span className="text-lg ml-2 text-gray-600">days</span>
//                             </div>

//                             <p className="text-sm text-gray-500 text-center mt-2">Keep up the momentum!</p>
//                         </div>

//                     </>
//                 )}
//             </div>

//             <div className="w-full">
//                 <Card className="shadow-md border-slate-200">
//                     <CardHeader className="bg-gradient-to-r gradientBg pb-4 border-b border-slate-100">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 {isLoading ? (
//                                     <div className="space-y-2">
//                                         <Skeleton className="h-6 w-48" />
//                                         <Skeleton className="h-4 w-64" />
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
//                                             Completed Topics
//                                         </CardTitle>
//                                         <CardDescription className="text-slate-600">
//                                             Your progress across learning modules
//                                         </CardDescription>
//                                     </>
//                                 )}
//                             </div>

//                             {isLoading ? (
//                                 <Skeleton className="h-8 w-24 rounded-full" />
//                             ) : (
//                                 <Badge className="bg-blue-500 hover:bg-blue-600  px-2 py-2 md:px-4 md:py-3">
//                                     {data?.completedTopics
//                                         ? Object.keys(data.completedTopics).length
//                                         : 0}{' '}
//                                     Modes
//                                 </Badge>
//                             )}
//                         </div>
//                     </CardHeader>

//                     <CardContent className="pt-6">
//                         {isLoading ? (
//                             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                 {Array.from({ length: 4 }).map((_, index) => (
//                                     <div
//                                         key={index}
//                                         className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-300 shadow-sm"
//                                     >
//                                         <div className="flex items-center gap-3">
//                                             <Skeleton className="w-10 h-10 rounded-full" />
//                                             <div>
//                                                 <Skeleton className="h-4 w-40 mb-2" />
//                                                 <Skeleton className="h-3 w-24" />
//                                             </div>
//                                         </div>
//                                         <Skeleton className="h-8 w-8 rounded-full" />
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : data?.completedTopics &&
//                             Object.keys(data.completedTopics).length > 0 ? (
//                             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                 {Object.entries(data?.completedTopics).map(([topic, count]) => (
//                                     <div
//                                         key={topic}
//                                         className="flex flex-wrap items-center justify-between p-4 bg-white rounded-lg border border-slate-300 shadow-sm"
//                                     >
//                                         <div className="flex items-center">
//                                             <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50 text-green-600 mr-3">
//                                                 <CheckSquare size={20} />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-medium text-slate-800">
//                                                     {topic
//                                                         .split('-')
//                                                         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                                                         .join(' ')}
//                                                 </h3>
//                                                 <p className="text-sm text-slate-500">
//                                                     {count} completed {count === 1 ? 'item' : 'items'}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-200">
//                                             {count}
//                                         </Badge>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center text-slate-500 text-sm py-8">
//                                 No completed topics yet. Keep learning and your progress will show up
//                                 here!
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>


//             {/* Bar Chart */}
//             {/* {isLoading ? (
//                 <div className="w-full h-64 bg-white rounded-lg p-4">
//                     <Skeleton className="h-6 w-32 mb-4" />
//                     <div className="flex items-end justify-between h-40 w-full">
//                         {Array.from({ length: 7 }).map((_, index) => (
//                             <Skeleton key={index} className="w-12 h-32" style={{ height: `${Math.random() * 100 + 20}%` }} />
//                         ))}
//                     </div>
//                     <div className="flex justify-between mt-2">
//                         {Array.from({ length: 7 }).map((_, index) => (
//                             <Skeleton key={index} className="w-12 h-4" />
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <div>
//                     <BarChartComponent />
//                 </div>
//             )} */}

//         </div>
//     );
// }
import { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
import {
    // Clock,
    // MessageCircle,
    // ChevronRight,
    // Trophy,
    BarChart2,
    Activity,
    CheckSquare,
} from 'lucide-react';

import { Calendar } from "@/components/ui/calendar"
import Badge_04 from "@/assets/images/Badge_04.png"
import DashboardProfile from '@/components/ui/DashboardProfile';
// import { BarChartComponent } from '@/components/ui/barChartComponent';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDashboardData } from '@/redux/slices/dashboardSlice';
import { Skeleton } from "@/components/ui/skeleton";

export default function LanguageLearningDashboard() {
    const myUser = localStorage.getItem("AiTutorUser");
    let parsedUser = JSON.parse(myUser || '{}');
    const currentUserId = parsedUser?.id;

    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useAppSelector(state => state.dashboard);

    useEffect(() => {
        // Only fetch if we have a valid user ID
        if (currentUserId) {
            dispatch(fetchDashboardData(currentUserId));
        }
    }, [currentUserId, dispatch]);

    const user = data?.userInfo;
    const usageRecords = data?.usageRecords;

    // Show error state if there's an error
    if (error) {
        return (
            <div className="flex flex-col border border-[var(--border-light)] rounded-3xl p-4">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-red-600 mb-2">Error Loading Dashboard</h3>
                        <p className="text-sm text-gray-500">{error}</p>
                        <button 
                            onClick={() => currentUserId && dispatch(fetchDashboardData(currentUserId))}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Show message if no user ID
    if (!currentUserId) {
        return (
            <div className="flex flex-col border border-[var(--border-light)] rounded-3xl p-4">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No User Found</h3>
                        <p className="text-sm text-gray-500">Please log in to view your dashboard.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col border border-[var(--border-light)] rounded-3xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mb-6 w-full mx-auto">
                {isLoading ? (
                    // Profile Skeleton
                    <div className="col-span-1 border rounded-lg shadow p-4">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-36" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                        <div className="mt-4 space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                ) : (
                    <DashboardProfile user={user} />
                )}

                {isLoading ? (
                    // Calendar Skeleton
                    <div className="min-w-[350px] col-span-2 border rounded-lg shadow p-4">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <div className="grid grid-cols-7 gap-2 mt-2">
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <Skeleton key={index} className="h-4 w-8" />
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-2 mt-4">
                                {Array.from({ length: 35 }).map((_, index) => (
                                    <Skeleton key={index} className="h-10 w-10 rounded-md" />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='min-w-[300px] col-span-2 border rounded-lg shadow'>
                        <Calendar
                            mode="single"
                            usageRecords={usageRecords}
                        />
                    </div>
                )}
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {isLoading ? (
                    <>
                        {/* Stats Card Skeletons */}
                        <div className="flex flex-1 gap-4">
                            <Card className="flex-1 shadow-sm">
                                <CardContent className="p-4">
                                    <Skeleton className="h-12 w-12 mb-2" />
                                    <Skeleton className="h-4 w-16 mb-2" />
                                    <Skeleton className="h-10 w-24" />
                                </CardContent>
                            </Card>

                            <Card className="flex-1 shadow-sm">
                                <CardContent className="p-4">
                                    <Skeleton className="h-12 w-12 mb-2" />
                                    <Skeleton className="h-4 w-16 mb-2" />
                                    <Skeleton className="h-10 w-24" />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Level Card Skeleton */}
                        <div className="flex-1 bg-gray-100 rounded-lg p-4">
                            <div className="flex items-center gap-4 mb-4">
                                <Skeleton className="h-12 w-12 rounded" />
                                <div>
                                    <Skeleton className="h-6 w-24 mb-2" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-full rounded-full" />
                            <Skeleton className="h-4 w-32 mt-2" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Left Side: Two Cards */}
                        <div className="flex flex-1 gap-4">
                            <Card className="bg-orange-400 text-white shadow-sm flex-1">
                                <CardContent className="p-4 flex flex-col justify-evenly h-full">
                                    <div className="flex flex-col items-start">
                                        <BarChart2 className="h-auto w-12" />
                                    </div>
                                    <h4 className="text-md font-medium mt-2">Streak</h4>
                                    <div className="text-4xl font-bold mt-2 text-start">{data?.streak ?? 0}</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-purple-500 text-white shadow-sm flex-1">
                                <CardContent className="p-4 flex flex-col justify-evenly h-full">
                                    <div className="flex flex-col items-start">
                                        <Activity className="h-auto w-12" />
                                    </div>
                                    <h4 className="text-md font-medium mt-2">Daily Usage</h4>
                                    <div className="text-4xl font-bold mt-2 text-start">{data?.dailyUsage ?? 0}</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Side: Levels */}
                        <div className="flex-1 gradientBg rounded-lg p-4 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <img src={Badge_04} alt="Streak Badge" className="w-12 h-12" />
                                <div>
                                    <h4 className="text-xl font-bold">Longest Streak</h4>
                                    <p className="text-sm mt-1 text-gray-500">Your highest consecutive days</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center h-32 bg-white rounded-lg shadow-inner">
                                <span className="text-5xl font-extrabold text-blue-600">{data?.longestStreak ?? 0}</span>
                                <span className="text-lg ml-2 text-gray-600">days</span>
                            </div>

                            <p className="text-sm text-gray-500 text-center mt-2">Keep up the momentum!</p>
                        </div>
                    </>
                )}
            </div>

            <div className="w-full">
                <Card className="shadow-md border-slate-200">
                    <CardHeader className="bg-gradient-to-r gradientBg pb-4 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                {isLoading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-48" />
                                        <Skeleton className="h-4 w-64" />
                                    </div>
                                ) : (
                                    <>
                                        <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
                                            Completed Topics
                                        </CardTitle>
                                        <CardDescription className="text-slate-600">
                                            Your progress across learning modules
                                        </CardDescription>
                                    </>
                                )}
                            </div>

                            {isLoading ? (
                                <Skeleton className="h-8 w-24 rounded-full" />
                            ) : (
                                <Badge className="bg-blue-500 hover:bg-blue-600 px-2 py-2 md:px-4 md:py-3">
                                    {data?.completedTopics
                                        ? Object.keys(data.completedTopics).length
                                        : 0}{' '}
                                    Modes
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-300 shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="w-10 h-10 rounded-full" />
                                            <div>
                                                <Skeleton className="h-4 w-40 mb-2" />
                                                <Skeleton className="h-3 w-24" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        ) : data?.completedTopics &&
                            Object.keys(data.completedTopics).length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {Object.entries(data.completedTopics).map(([topic, count]) => (
                                    <div
                                        key={topic}
                                        className="flex flex-wrap items-center justify-between p-4 bg-white rounded-lg border border-slate-300 shadow-sm"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50 text-green-600 mr-3">
                                                <CheckSquare size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-slate-800">
                                                    {topic
                                                        .split('-')
                                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ')}
                                                </h3>
                                                <p className="text-sm text-slate-500">
                                                    {count} completed {count === 1 ? 'item' : 'items'}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-200">
                                            {count}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 text-sm py-8">
                                No completed topics yet. Keep learning and your progress will show up
                                here!
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}