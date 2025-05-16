// // // // import React, { useEffect, useState } from 'react';
// // // // import { Crown } from "lucide-react";
// // // // import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
// // // // import { Skeleton } from '@/components/ui/skeleton';
// // // // import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// // // // interface LeaderboardProps {
// // // //   userId?: string;
// // // // }

// // // // const Leaderboard: React.FC<LeaderboardProps> = ({ userId }) => {
// // // //   const user = localStorage.getItem("AiTutorUser");
// // // //   let parsedUser = JSON.parse(user || '{}');
// // // //   userId = parsedUser?.id
// // // //   const dispatch = useAppDispatch();
// // // //   const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);
// // // //   console.log(leaderboard, currentUser, isLoading, error, "ALL")

// // // //   // Commented out filter states
// // // //   // const [school, setSchool] = useState<string>('');
// // // //   // const [level, setLevel] = useState<string>('');
// // // //   // const [section, setSection] = useState<string>('');
// // // //   // const [ranking, setRanking] = useState<string>('');

// // // //   if(!leaderboard) return (<div>NOT FEDINCED</div>)

// // // //   // Get unique schools, levels, and sections for filters
// // // //   // const schools = [...new Set(leaderboard.map(user => user.schoolName))];
// // // //   // const levels = [...new Set(leaderboard.map(user => user.cefrLevel))];
// // // //   // const sections = [...new Set(leaderboard.map(user => user.class))];

// // // //   // For client-side ranking filtering (since backend doesn't handle this)
// // // //   const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);

// // // //   // Get top 3 users for the podium display
// // // //   const topUsers = leaderboard.filter(user => user.rank <= 3)
// // // //     .sort((a: any, b: any) => a.rank - b.rank);

// // // //   // Get remaining users for the table
// // // //   const tableUsers = filteredUsers.filter(user => user.rank > 3)
// // // //     .sort((a, b) => a.rank - b.rank);

// // // //   // Fetch leaderboard data on component mount
// // // //   useEffect(() => {
// // // //     fetchLeaderboardData();
// // // //   }, []);

// // // //   // Commented out fetch data when filters change
// // // //   // useEffect(() => {
// // // //   //   // We don't want to fetch on the initial render since that's handled by the first useEffect
// // // //   //   if (leaderboard.length > 0) {
// // // //   //     fetchLeaderboardData();
// // // //   //   }
// // // //   // }, [school, level, section]);

// // // //   // Update filtered users for ranking filter (client-side)
// // // //   useEffect(() => {
// // // //     let filtered = [...leaderboard];

// // // //     // Commented out ranking filter
// // // //     // if (ranking) {
// // // //     //   if (ranking === "top10") {
// // // //     //     filtered = filtered.filter(user => user.rank <= 10);
// // // //     //   } else if (ranking === "top20") {
// // // //     //     filtered = filtered.filter(user => user.rank <= 20);
// // // //     //   }
// // // //     // }

// // // //     setFilteredUsers(filtered);
// // // //   }, [leaderboard]);

// // // //   // Fetch leaderboard data with filters
// // // //   const fetchLeaderboardData = () => {
// // // //     const filters: LeaderboardFilters = {
// // // //       userId: userId || ""
// // // //     };

// // // //     // Commented out school filter
// // // //     // if (school) {
// // // //     //   filters.school = school;
// // // //     // }

// // // //     // Commented out level filter
// // // //     // if (level) {
// // // //     //   filters.cefrLevel = level;
// // // //     // }

// // // //     // Commented out section filter
// // // //     // if (section) {
// // // //     //   filters.class = section;
// // // //     // }

// // // //     dispatch(fetchLeaderboard(filters));
// // // //   };

// // // //   // Commented out apply filters
// // // //   // const handleApplyFilter = () => {
// // // //   //   fetchLeaderboardData();
// // // //   // };

// // // //   // Reorder top users for display (2nd, 1st, 3rd)
// // // //   const getOrderedTopUsers = () => {
// // // //     if (topUsers.length < 3) return topUsers;

// // // //     const first = topUsers.find(user => user.rank === 1);
// // // //     const second = topUsers.find(user => user.rank === 2);
// // // //     const third = topUsers.find(user => user.rank === 3);

// // // //     return [second, first, third].filter(Boolean) as LeaderboardUser[];
// // // //   };

// // // //   // // Get crown color based on rank
// // // //   // const getCrownColor = (rank: number) => {
// // // //   //   if (rank === 1) return "text-yellow-400";
// // // //   //   if (rank === 2) return "text-gray-400";
// // // //   //   if (rank === 3) return "text-amber-600";
// // // //   //   return "text-gray-400";
// // // //   // };

// // // //   // Get circle color based on rank
// // // //   const getCircleColor = (rank: number) => {
// // // //     if (rank === 1) return "bg-yellow-100 border-yellow-400";
// // // //     if (rank === 2) return "bg-gray-100 border-gray-400";
// // // //     if (rank === 3) return "bg-amber-100 border-amber-600";
// // // //     return "bg-gray-100 border-gray-300";
// // // //   };

// // // //   // Get badge color for CEFR level
// // // //   const getLevelBadgeColor = (level: string) => {
// // // //     const levels: Record<string, string> = {
// // // //       'A1': 'bg-green-100 text-green-800',
// // // //       'A2': 'bg-blue-100 text-blue-800',
// // // //       'B1': 'bg-purple-100 text-purple-800',
// // // //       'B2': 'bg-pink-100 text-pink-800',
// // // //       'C1': 'bg-yellow-100 text-yellow-800',
// // // //       'C2': 'bg-red-100 text-red-800',
// // // //     };

// // // //     return levels[level] || 'bg-gray-100 text-gray-800';
// // // //   };

// // // //   // Determine if a user is the current user
// // // //   const isCurrentUser = (username: string) => {
// // // //     return currentUser?.username === username;
// // // //   };

// // // //   // Show loading state
// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="mx-auto">
// // // //         <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
// // // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // // //           <div className="bg-white p-6 rounded-lg shadow-sm">
// // // //             <Skeleton className="h-6 w-24 mb-6" />
// // // //             <div className="space-y-4">
// // // //               <Skeleton className="h-10 w-full" />
// // // //               <Skeleton className="h-10 w-full" />
// // // //               <Skeleton className="h-10 w-full" />
// // // //               <Skeleton className="h-10 w-full" />
// // // //               <Skeleton className="h-10 w-full" />
// // // //             </div>
// // // //           </div>
// // // //           <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm">
// // // //             <div className="flex justify-center mb-10 gap-6">
// // // //               <Skeleton className="h-32 w-24" />
// // // //               <Skeleton className="h-40 w-24" />
// // // //               <Skeleton className="h-32 w-24" />
// // // //             </div>
// // // //             <Skeleton className="h-6 w-full mb-4" />
// // // //             <Skeleton className="h-16 w-full mb-2" />
// // // //             <Skeleton className="h-16 w-full mb-2" />
// // // //             <Skeleton className="h-16 w-full mb-2" />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Show error state
// // // //   if (error) {
// // // //     return (
// // // //       <div className="mx-auto">
// // // //         <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
// // // //         <div className="bg-red-100 p-4 rounded-lg text-red-800">
// // // //           Failed to load leaderboard: {error}
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="mx-auto">
// // // //       {/* Commented out filter section */}
// // // //       {/* <div className="bg-white p-6 rounded-lg shadow-sm">
// // // //         <h2 className="text-xl font-bold mb-6">Filter</h2>

// // // //         <div className="space-y-4">
// // // //           <div className="w-full">
// // // //             <Select value={school} onValueChange={setSchool}>
// // // //               <SelectTrigger className="w-full">
// // // //                 <SelectValue placeholder="School" />
// // // //               </SelectTrigger>
// // // //               <SelectContent>
// // // //                 <SelectItem value="All">All Schools</SelectItem>
// // // //                 {schools.map((school) => (
// // // //                   <SelectItem key={school} value={school}>{school}</SelectItem>
// // // //                 ))}
// // // //               </SelectContent>
// // // //             </Select>
// // // //           </div>

// // // //           <div className="w-full">
// // // //             <Select value={level} onValueChange={setLevel}>
// // // //               <SelectTrigger className="w-full">
// // // //                 <SelectValue placeholder="Level" />
// // // //               </SelectTrigger>
// // // //               <SelectContent>
// // // //                 <SelectItem value="All">All Levels</SelectItem>
// // // //                 {levels.map((level) => (
// // // //                   <SelectItem key={level} value={level}>{level}</SelectItem>
// // // //                 ))}
// // // //               </SelectContent>
// // // //             </Select>
// // // //           </div>

// // // //           <div className="w-full">
// // // //             <Select value={ranking} onValueChange={setRanking}>
// // // //               <SelectTrigger className="w-full">
// // // //                 <SelectValue placeholder="Ranking" />
// // // //               </SelectTrigger>
// // // //               <SelectContent>
// // // //                 <SelectItem value="All">All Rankings</SelectItem>
// // // //                 <SelectItem value="top10">Top 10</SelectItem>
// // // //                 <SelectItem value="top20">Top 20</SelectItem>
// // // //               </SelectContent>
// // // //             </Select>
// // // //           </div>

// // // //           <div className="w-full">
// // // //             <Select value={section} onValueChange={setSection}>
// // // //               <SelectTrigger className="w-full">
// // // //                 <SelectValue placeholder="Section" />
// // // //               </SelectTrigger>
// // // //               <SelectContent>
// // // //                 <SelectItem value="All">All Sections</SelectItem>
// // // //                 {sections.map((section) => (
// // // //                   <SelectItem key={section} value={section}>Section {section}</SelectItem>
// // // //                 ))}
// // // //               </SelectContent>
// // // //             </Select>
// // // //           </div>

// // // //           <Button
// // // //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
// // // //             onClick={handleApplyFilter}
// // // //           >
// // // //             Apply Filter
// // // //           </Button>
// // // //         </div>
// // // //       </div> */}

// // // //       {/* Main Content */}
// // // //       <div className="md:col-span-4 bg-white p-6 rounded-lg shadow-sm">
// // // //         {/* Top 3 Users */}
// // // //         <div className="flex flex-wrap justify-center mb-10 gap-6">
// // // //           {getOrderedTopUsers().map((user: any, index: number) => (
// // // //             <div
// // // //               key={user.username}
// // // //               className={`flex flex-col items-center ${index === 1 ? 'mt-0' : index == 2 ? 'mt-8' : "mt-4"}`}
// // // //             >
// // // //               <div className="relative">
// // // //                 {user.rank === 1 && (
// // // //                   <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
// // // //                     <Crown className="w-10 h-10 text-yellow-400" />
// // // //                   </div>
// // // //                 )}
// // // //                 <div className={`relative w-24 h-24 rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)}`}>
// // // //                 {/* <div className={`relative ${index === 1 ? "w-36 h-36": index == 2 ? "w-28 h-28" : "w-32 h-32"} rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)}`}> */}
// // // //                   {/* Using placeholder avatar - replace with actual user avatars if available */}
// // // //                   <img
// // // //                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
// // // //                     alt={user.firstName}
// // // //                     className="w-full h-full object-cover"
// // // //                   />
// // // //                   <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center font-bold text-white">
// // // //                     <span className={`w-full h-full flex items-center justify-center rounded-full ${
// // // //                       user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
// // // //                     }`}>
// // // //                       {user.rank}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="mt-2 text-center">
// // // //                 <h3 className="font-semibold">
// // // //                   {user.firstName} {user.lastName}
// // // //                   {isCurrentUser(user.username) && (
// // // //                     <span className="ml-1 text-xs text-blue-600">(You)</span>
// // // //                   )}
// // // //                 </h3>
// // // //                 <div className="flex items-center justify-center text-sm text-gray-500">
// // // //                   <div className="flex items-center">
// // // //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // // //                     </svg>
// // // //                     {formatTime(user.totalSeconds)}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Table for remaining users */}
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full">
// // // //             <thead>
// // // //               <tr className="text-left text-gray-500 border-b">
// // // //                 <th className="py-3 px-2">Rank</th>
// // // //                 <th className="py-3 px-2">Student</th>
// // // //                 <th className="py-3 px-2">School</th>
// // // //                 <th className="py-3 px-2">Section</th>
// // // //                 <th className="py-3 px-2">Level</th>
// // // //                 <th className="py-3 px-2">Time</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {tableUsers.map((user) => (
// // // //                 <tr
// // // //                   key={user.username}
// // // //                   className={`border-b hover:bg-gray-50 ${isCurrentUser(user.username) ? 'bg-blue-50' : ''}`}
// // // //                 >
// // // //                   <td className="py-4 px-2 font-medium">{user.rank}</td>
// // // //                   <td className="py-4 px-2">
// // // //                     <div className="flex items-center">
// // // //                       <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
// // // //                         <img
// // // //                           src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
// // // //                           alt={user.firstName}
// // // //                           className="w-full h-full object-cover"
// // // //                         />
// // // //                       </div>
// // // //                       <div>
// // // //                         <div className="font-medium">
// // // //                           {user.firstName} {user.lastName}
// // // //                           {isCurrentUser(user.username) && (
// // // //                             <span className="ml-1 text-xs text-blue-600">(You)</span>
// // // //                           )}
// // // //                         </div>
// // // //                         {/* <div className="text-xs text-blue-600">View Profile →</div> */}
// // // //                       </div>
// // // //                     </div>
// // // //                   </td>
// // // //                   <td className="py-4 px-2">{user.schoolName}</td>
// // // //                   <td className="py-4 px-2">{user.class}</td>
// // // //                   <td className="py-4 px-2">
// // // //                     <div className="flex items-center">
// // // //                       <span className={`flex items-center justify-center px-2 py-1 rounded-full text-xs ${getLevelBadgeColor(user.aiCefrLevel	)}`}>
// // // //                         {user.aiCefrLevel	}
// // // //                       </span>
// // // //                     </div>
// // // //                   </td>
// // // //                   <td className="py-4 px-2">
// // // //                     <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
// // // //                       {formatTime(user.totalSeconds)}
// // // //                     </div>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //               {tableUsers.length === 0 && (
// // // //                 <tr>
// // // //                   <td colSpan={6} className="py-4 px-2 text-center text-gray-500">
// // // //                     No users match the current filters
// // // //                   </td>
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // Type check for component
// // // // export default Leaderboard as React.FC<LeaderboardProps>;

// // // import React, { useEffect, useState } from 'react';
// // // import { Crown } from "lucide-react";
// // // import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
// // // import { Skeleton } from '@/components/ui/skeleton';
// // // import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// // // interface LeaderboardProps {
// // //   userId?: string;
// // // }

// // // const Leaderboard: React.FC<LeaderboardProps> = ({ userId }) => {
// // //   const user = localStorage.getItem("AiTutorUser");
// // //   let parsedUser = JSON.parse(user || '{}');
// // //   userId = parsedUser?.id
// // //   const dispatch = useAppDispatch();
// // //   const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);
// // //   console.log(leaderboard, currentUser, isLoading, error, "ALL")

// // //   // Commented out filter states
// // //   // const [school, setSchool] = useState<string>('');
// // //   // const [level, setLevel] = useState<string>('');
// // //   // const [section, setSection] = useState<string>('');
// // //   // const [ranking, setRanking] = useState<string>('');

// // //   if(!leaderboard) return (<div>NOT FEDINCED</div>)

// // //   // Get unique schools, levels, and sections for filters
// // //   // const schools = [...new Set(leaderboard.map(user => user.schoolName))];
// // //   // const levels = [...new Set(leaderboard.map(user => user.cefrLevel))];
// // //   // const sections = [...new Set(leaderboard.map(user => user.class))];

// // //   // For client-side ranking filtering (since backend doesn't handle this)
// // //   const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);

// // //   // Get top 3 users for the podium display
// // //   const topUsers = leaderboard.filter(user => user.rank <= 3)
// // //     .sort((a: any, b: any) => a.rank - b.rank);

// // //   // Get remaining users for the table (ranks 4-20)
// // //   const tableUsers = filteredUsers.filter(user => user.rank > 3 && user.rank <= 20)
// // //     .sort((a, b) => a.rank - b.rank);

// // //   // Check if current user is in the leaderboard
// // //   const isCurrentUserInLeaderboard = currentUser && leaderboard.some(user => user.username === currentUser?.username);

// // //   // Fetch leaderboard data on component mount
// // //   useEffect(() => {
// // //     fetchLeaderboardData();
// // //   }, []);

// // //   // Commented out fetch data when filters change
// // //   // useEffect(() => {
// // //   //   // We don't want to fetch on the initial render since that's handled by the first useEffect
// // //   //   if (leaderboard.length > 0) {
// // //   //     fetchLeaderboardData();
// // //   //   }
// // //   // }, [school, level, section]);

// // //   // Update filtered users for ranking filter (client-side)
// // //   useEffect(() => {
// // //     let filtered = [...leaderboard];

// // //     // Commented out ranking filter
// // //     // if (ranking) {
// // //     //   if (ranking === "top10") {
// // //     //     filtered = filtered.filter(user => user.rank <= 10);
// // //     //   } else if (ranking === "top20") {
// // //     //     filtered = filtered.filter(user => user.rank <= 20);
// // //     //   }
// // //     // }

// // //     setFilteredUsers(filtered);
// // //   }, [leaderboard]);

// // //   // Fetch leaderboard data with filters
// // //   const fetchLeaderboardData = () => {
// // //     const filters: LeaderboardFilters = {
// // //       userId: userId || ""
// // //     };

// // //     // Commented out school filter
// // //     // if (school) {
// // //     //   filters.school = school;
// // //     // }

// // //     // Commented out level filter
// // //     // if (level) {
// // //     //   filters.cefrLevel = level;
// // //     // }

// // //     // Commented out section filter
// // //     // if (section) {
// // //     //   filters.class = section;
// // //     // }

// // //     dispatch(fetchLeaderboard(filters));
// // //   };

// // //   // Commented out apply filters
// // //   // const handleApplyFilter = () => {
// // //   //   fetchLeaderboardData();
// // //   // };

// // //   // Reorder top users for display (2nd, 1st, 3rd)
// // //   const getOrderedTopUsers = () => {
// // //     if (topUsers.length < 3) return topUsers;

// // //     const first = topUsers.find(user => user.rank === 1);
// // //     const second = topUsers.find(user => user.rank === 2);
// // //     const third = topUsers.find(user => user.rank === 3);

// // //     return [second, first, third].filter(Boolean) as LeaderboardUser[];
// // //   };

// // //   // // Get crown color based on rank
// // //   // const getCrownColor = (rank: number) => {
// // //   //   if (rank === 1) return "text-yellow-400";
// // //   //   if (rank === 2) return "text-gray-400";
// // //   //   if (rank === 3) return "text-amber-600";
// // //   //   return "text-gray-400";
// // //   // };

// // //   // Get circle color based on rank
// // //   const getCircleColor = (rank: number) => {
// // //     if (rank === 1) return "bg-yellow-100 border-yellow-400";
// // //     if (rank === 2) return "bg-gray-100 border-gray-400";
// // //     if (rank === 3) return "bg-amber-100 border-amber-600";
// // //     return "bg-gray-100 border-gray-300";
// // //   };

// // //   // Get badge color for CEFR level
// // //   const getLevelBadgeColor = (level: string) => {
// // //     const levels: Record<string, string> = {
// // //       'A1': 'bg-green-100 text-green-800',
// // //       'A2': 'bg-blue-100 text-blue-800',
// // //       'B1': 'bg-purple-100 text-purple-800',
// // //       'B2': 'bg-pink-100 text-pink-800',
// // //       'C1': 'bg-yellow-100 text-yellow-800',
// // //       'C2': 'bg-red-100 text-red-800',
// // //     };

// // //     return levels[level] || 'bg-gray-100 text-gray-800';
// // //   };

// // //   // Determine if a user is the current user
// // //   const isCurrentUser = (username: string) => {
// // //     return currentUser?.username === username;
// // //   };

// // //   // Show loading state
// // //   if (isLoading) {
// // //     return (
// // //       <div className="mx-auto">
// // //         <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
// // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //           <div className="bg-white p-6 rounded-lg shadow-sm">
// // //             <Skeleton className="h-6 w-24 mb-6" />
// // //             <div className="space-y-4">
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //             </div>
// // //           </div>
// // //           <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm">
// // //             <div className="flex justify-center mb-10 gap-6">
// // //               <Skeleton className="h-32 w-24" />
// // //               <Skeleton className="h-40 w-24" />
// // //               <Skeleton className="h-32 w-24" />
// // //             </div>
// // //             <Skeleton className="h-6 w-full mb-4" />
// // //             <Skeleton className="h-16 w-full mb-2" />
// // //             <Skeleton className="h-16 w-full mb-2" />
// // //             <Skeleton className="h-16 w-full mb-2" />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Show error state
// // //   if (error) {
// // //     return (
// // //       <div className="mx-auto">
// // //         <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
// // //         <div className="bg-red-100 p-4 rounded-lg text-red-800">
// // //           Failed to load leaderboard: {error}
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="mx-auto">
// // //       {/* Commented out filter section */}
// // //       {/* <div className="bg-white p-6 rounded-lg shadow-sm">
// // //         <h2 className="text-xl font-bold mb-6">Filter</h2>

// // //         <div className="space-y-4">
// // //           <div className="w-full">
// // //             <Select value={school} onValueChange={setSchool}>
// // //               <SelectTrigger className="w-full">
// // //                 <SelectValue placeholder="School" />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 <SelectItem value="All">All Schools</SelectItem>
// // //                 {schools.map((school) => (
// // //                   <SelectItem key={school} value={school}>{school}</SelectItem>
// // //                 ))}
// // //               </SelectContent>
// // //             </Select>
// // //           </div>

// // //           <div className="w-full">
// // //             <Select value={level} onValueChange={setLevel}>
// // //               <SelectTrigger className="w-full">
// // //                 <SelectValue placeholder="Level" />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 <SelectItem value="All">All Levels</SelectItem>
// // //                 {levels.map((level) => (
// // //                   <SelectItem key={level} value={level}>{level}</SelectItem>
// // //                 ))}
// // //               </SelectContent>
// // //             </Select>
// // //           </div>

// // //           <div className="w-full">
// // //             <Select value={ranking} onValueChange={setRanking}>
// // //               <SelectTrigger className="w-full">
// // //                 <SelectValue placeholder="Ranking" />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 <SelectItem value="All">All Rankings</SelectItem>
// // //                 <SelectItem value="top10">Top 10</SelectItem>
// // //                 <SelectItem value="top20">Top 20</SelectItem>
// // //               </SelectContent>
// // //             </Select>
// // //           </div>

// // //           <div className="w-full">
// // //             <Select value={section} onValueChange={setSection}>
// // //               <SelectTrigger className="w-full">
// // //                 <SelectValue placeholder="Section" />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 <SelectItem value="All">All Sections</SelectItem>
// // //                 {sections.map((section) => (
// // //                   <SelectItem key={section} value={section}>Section {section}</SelectItem>
// // //                 ))}
// // //               </SelectContent>
// // //             </Select>
// // //           </div>

// // //           <Button
// // //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
// // //             onClick={handleApplyFilter}
// // //           >
// // //             Apply Filter
// // //           </Button>
// // //         </div>
// // //       </div> */}

// // //       {/* Main Content */}
// // //       <div className="md:col-span-4 bg-white p-6 rounded-lg shadow-sm">
// // //         {/* Top 3 Users */}
// // //         <div className="flex flex-wrap justify-center mb-10 gap-6">
// // //           {getOrderedTopUsers().map((user: any, index: number) => (
// // //             <div
// // //               key={user.username}
// // //               className={`flex flex-col items-center ${index === 1 ? 'mt-0' : index === 0 ? 'mt-8' : "mt-8"}`}
// // //             >
// // //               <div className="relative">
// // //                 {user.rank === 1 && (
// // //                   <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
// // //                     <Crown className="w-10 h-10 text-yellow-400" />
// // //                   </div>
// // //                 )}
// // //                 <div className={`relative w-24 h-24 rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)} ${isCurrentUser(user.username) ? 'ring-4 ring-blue-400' : ''}`}>
// // //                   {/* Using placeholder avatar - replace with actual user avatars if available */}
// // //                   <img
// // //                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
// // //                     alt={user.firstName}
// // //                     className="w-full h-full object-cover"
// // //                   />
// // //                   <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center font-bold text-white">
// // //                     <span className={`w-full h-full flex items-center justify-center rounded-full ${
// // //                       user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
// // //                     }`}>
// // //                       {user.rank}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div className="mt-2 text-center">
// // //                 <h3 className={`font-semibold ${isCurrentUser(user.username) ? 'text-blue-600' : ''}`}>
// // //                   {user.firstName} {user.lastName}
// // //                   {isCurrentUser(user.username) && (
// // //                     <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
// // //                   )}
// // //                 </h3>
// // //                 <div className="flex items-center justify-center text-sm text-gray-500">
// // //                   <div className="flex items-center">
// // //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                     </svg>
// // //                     {formatTime(user.totalSeconds)}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Table for remaining users */}
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full">
// // //             <thead>
// // //               <tr className="text-left text-gray-500 border-b">
// // //                 <th className="py-3 px-2">Rank</th>
// // //                 <th className="py-3 px-2">Student</th>
// // //                 <th className="py-3 px-2">School</th>
// // //                 <th className="py-3 px-2">Section</th>
// // //                 <th className="py-3 px-2">Level</th>
// // //                 <th className="py-3 px-2">Time</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {tableUsers.map((user) => (
// // //                 <tr
// // //                   key={user.username}
// // //                   className={`border-b hover:bg-gray-50 ${isCurrentUser(user.username) ? 'bg-blue-50' : ''}`}
// // //                 >
// // //                   <td className="py-4 px-2 font-medium">{user.rank}</td>
// // //                   <td className="py-4 px-2">
// // //                     <div className="flex items-center">
// // //                       <div className={`w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden ${isCurrentUser(user.username) ? 'ring-2 ring-blue-400' : ''}`}>
// // //                         <img
// // //                           src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
// // //                           alt={user.firstName}
// // //                           className="w-full h-full object-cover"
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <div className={`font-medium ${isCurrentUser(user.username) ? 'text-blue-600' : ''}`}>
// // //                           {user.firstName} {user.lastName}
// // //                           {isCurrentUser(user.username) && (
// // //                             <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </td>
// // //                   <td className="py-4 px-2">{user.schoolName}</td>
// // //                   <td className="py-4 px-2">{user.class}</td>
// // //                   <td className="py-4 px-2">
// // //                     <div className="flex items-center">
// // //                       <span className={`flex items-center justify-center px-2 py-1 rounded-full text-xs ${getLevelBadgeColor(user.aiCefrLevel)}`}>
// // //                         {user.aiCefrLevel}
// // //                       </span>
// // //                     </div>
// // //                   </td>
// // //                   <td className="py-4 px-2">
// // //                     <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
// // //                       {formatTime(user.totalSeconds)}
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ))}
              
// // //               {/* Show current user at the bottom if not already in the displayed list */}
// // //               {currentUser && !leaderboard.some(user => user.username === currentUser.username) && (
// // //                 <>
// // //                   {/* Separator row */}
// // //                   <tr className="border-b">
// // //                     <td colSpan={6} className="py-2 px-2 text-center bg-gray-50">
// // //                       <div className="flex items-center justify-center">
// // //                         <div className="border-t border-gray-300 flex-grow"></div>
// // //                         <span className="mx-4 text-gray-500 text-sm">Your Position</span>
// // //                         <div className="border-t border-gray-300 flex-grow"></div>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
                  
// // //                   {/* Current user row */}
// // //                   <tr className="border-b bg-blue-50 hover:bg-blue-100">
// // //                     <td className="py-4 px-2 font-medium">{currentUser.rank !== null ? currentUser.rank : '-'}</td>
// // //                     <td className="py-4 px-2">
// // //                       <div className="flex items-center">
// // //                         <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden ring-2 ring-blue-400">
// // //                           <img
// // //                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`}
// // //                             alt={currentUser.firstName}
// // //                             className="w-full h-full object-cover"
// // //                           />
// // //                         </div>
// // //                         <div>
// // //                           <div className="font-medium text-blue-600">
// // //                             {currentUser.firstName} {currentUser.lastName}
// // //                             <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </td>
// // //                     <td className="py-4 px-2">{currentUser.schoolName}</td>
// // //                     <td className="py-4 px-2">{currentUser.class}</td>
// // //                     <td className="py-4 px-2">
// // //                       <div className="flex items-center">
// // //                         <span className={`flex items-center justify-center px-2 py-1 rounded-full text-xs ${getLevelBadgeColor(currentUser.aiCefrLevel)}`}>
// // //                           {currentUser.aiCefrLevel}
// // //                         </span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="py-4 px-2">
// // //                       <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
// // //                         {formatTime(currentUser.totalSeconds)}
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 </>
// // //               )}
              
// // //               {tableUsers.length === 0 && !currentUser && (
// // //                 <tr>
// // //                   <td colSpan={6} className="py-4 px-2 text-center text-gray-500">
// // //                     No users match the current filters
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Type check for component
// // // export default Leaderboard as React.FC<LeaderboardProps>;
// // // import React, { useEffect, useState, useRef } from 'react';
// // // import { Crown, Clock } from "lucide-react"; // Added Clock for fixed bar
// // // import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
// // // import { Skeleton } from '@/components/ui/skeleton';
// // // import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// // // // Assuming Select components are from shadcn/ui or similar
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // import { Button } from '@/components/ui/button';

// // // interface LeaderboardProps {
// // //   userId?: string; // userId from props is overridden, consider removing or clarifying its use
// // // }

// // // const Leaderboard: React.FC<LeaderboardProps> = ({ userId: initialUserId }) => {
// // //   const user = localStorage.getItem("AiTutorUser");
// // //   let parsedUser = JSON.parse(user || '{}');
// // //   const currentUserId = parsedUser?.id; // Renamed to avoid conflict with prop if it were used

// // //   const dispatch = useAppDispatch();
// // //   const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);

// // //   // State for the fixed user bar
// // //   const [showFixedUserBar, setShowFixedUserBar] = useState(false);

// // //   // Refs for tracking current user's element position
// // //   const currentUserInTableRef = useRef<HTMLTableRowElement>(null);
// // //   const currentUserNotInTableRef = useRef<HTMLTableRowElement>(null);

// // //   // console.log(leaderboard, currentUser, isLoading, error, "ALL") // Keep for debugging if needed

// // //   // Initial fetch of leaderboard data
// // //   useEffect(() => {
// // //     const filters: LeaderboardFilters = {
// // //       userId: currentUserId || ""
// // //     };
// // //     dispatch(fetchLeaderboard(filters));
// // //   }, [dispatch, currentUserId]);

// // //   // Filtered users for display (top 20 handling is client-side after fetch)
// // //   const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);

// // //   useEffect(() => {
// // //     if (leaderboard) {
// // //       setFilteredUsers([...leaderboard]);
// // //     }
// // //   }, [leaderboard]);

// // //   if (!leaderboard && !isLoading && !error) {
// // //     // This state might occur if fetch completes with empty data before error/isLoading states are updated
// // //     // Or if leaderboard is initially null
// // //     return (<div className="mx-auto p-6 text-center">Preparing leaderboard...</div>);
// // //   }
  
// // //   if (isLoading) {
// // //     return (
// // //       <div className="mx-auto">
// // //         <h1 className="text-2xl font-bold mb-8 text-center md:text-left">Leaderboard</h1>
// // //         {/* Skeleton remains the same */}
// // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// // //           <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-1 order-2 md:order-1"> {/* Filters placeholder */}
// // //             <Skeleton className="h-6 w-24 mb-6" />
// // //             <div className="space-y-4">
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //               <Skeleton className="h-10 w-full" />
// // //             </div>
// // //           </div>
// // //           <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm order-1 md:order-2"> {/* Main content placeholder */}
// // //             <div className="flex justify-center mb-10 gap-4 md:gap-6 flex-wrap">
// // //               <Skeleton className="h-32 w-24" />
// // //               <Skeleton className="h-40 w-24" />
// // //               <Skeleton className="h-32 w-24" />
// // //             </div>
// // //             <Skeleton className="h-6 w-3/4 mb-4" />
// // //             <Skeleton className="h-12 w-full mb-2" />
// // //             <Skeleton className="h-12 w-full mb-2" />
// // //             <Skeleton className="h-12 w-full mb-2" />
// // //             <Skeleton className="h-12 w-full mb-2" />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="mx-auto">
// // //         <h1 className="text-2xl font-bold mb-8 text-center">Leaderboard</h1>
// // //         <div className="bg-red-100 p-4 rounded-lg text-red-700 border border-red-300">
// // //           Failed to load leaderboard: {error}
// // //         </div>
// // //       </div>
// // //     );
// // //   }
  
// // //   // Ensure leaderboard is not null or undefined before proceeding
// // //   if (!leaderboard) {
// // //       return <div className="mx-auto p-6 text-center">Leaderboard data is not available.</div>;
// // //   }


// // //   // Get top 3 users for the podium display
// // //   const topUsers = filteredUsers.filter(user => user.rank !== null && user.rank <= 3)
// // //     .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

// // //   // Get remaining users for the table (ranks 4-20)
// // //   const tableUsers = filteredUsers.filter(user => user.rank !== null && user.rank > 3 && user.rank <= 20)
// // //     .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

// // //   const isCurrentUserInDisplayedList = currentUser && 
// // //     (topUsers.some(u => u.username === currentUser.username) || 
// // //      tableUsers.some(u => u.username === currentUser.username));


// // //   // Scroll handler for fixed user bar
// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       if (!currentUser) {
// // //         setShowFixedUserBar(false);
// // //         return;
// // //       }

// // //       let userElement: HTMLElement | null = null;

// // //       if (tableUsers.some(u => u.username === currentUser.username)) {
// // //         userElement = currentUserInTableRef.current;
// // //       } else if (!isCurrentUserInDisplayedList) { // User is not in top 20, so their separate row is shown
// // //         userElement = currentUserNotInTableRef.current;
// // //       }
// // //       // If user is in top 3, we don't show the fixed bar based on scroll for now,
// // //       // as their position is prominent. This can be adjusted if needed.

// // //       if (userElement) {
// // //         const rect = userElement.getBoundingClientRect();
// // //         // Show bar if element is scrolled out of view (top or bottom)
// // //         if (rect.bottom < 0 || rect.top > window.innerHeight) {
// // //           setShowFixedUserBar(true);
// // //         } else {
// // //           setShowFixedUserBar(false);
// // //         }
// // //       } else {
// // //         // If user is in top 3 or not on the page at all (e.g. due to filters not yet implemented server-side)
// // //         // Or if user is not found in any list, don't show the bar.
// // //         // However, if the `currentUser` object exists and they are *expected* to be somewhere,
// // //         // and they are NOT in top 3, and their rank means they *would* be off-screen in a long list,
// // //         // we might want to show the bar.
// // //         // For simplicity, if the specific element isn't rendered (e.g. user is rank 1-3), hide the bar.
// // //         // If current user exists but is NOT in topUsers or tableUsers (i.e., they are the one shown at the bottom),
// // //         // and that bottom element is not yet rendered or ref not attached, hide bar.
// // //         // This logic can be refined if `currentUser` can exist without being in any list but should still trigger fixed bar.
// // //          setShowFixedUserBar(false);
// // //       }
// // //     };

// // //     window.addEventListener('scroll', handleScroll);
// // //     handleScroll(); // Initial check

// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll);
// // //     };
// // //   }, [currentUser, tableUsers, leaderboard, isCurrentUserInDisplayedList]); // Re-evaluate if these deps change


// // //   const getOrderedTopUsers = () => {
// // //     if (topUsers.length === 0) return [];
// // //     if (topUsers.length < 3) { // Handle cases with fewer than 3 top users
// // //         const podium: (LeaderboardUser | null)[] = [null, null, null]; // 2nd, 1st, 3rd
// // //         const first = topUsers.find(user => user.rank === 1);
// // //         const second = topUsers.find(user => user.rank === 2);
// // //         const third = topUsers.find(user => user.rank === 3);

// // //         if (first) podium[1] = first;
// // //         if (second) podium[0] = second;
// // //         if (third) podium[2] = third;
        
// // //         if(topUsers.length === 1 && first) return [first];
// // //         if(topUsers.length === 2) {
// // //             if(first && second) return [second, first];
// // //             if(first && !second) return [topUsers.find(u=>u.rank !==1), first]; // if only rank 1 and 3, for example
// // //             if(second && !first) return [second, topUsers.find(u=>u.rank !==2)];
// // //         }
// // //         return podium.filter(Boolean) as LeaderboardUser[];
// // //     }


// // //     const first = topUsers.find(user => user.rank === 1);
// // //     const second = topUsers.find(user => user.rank === 2);
// // //     const third = topUsers.find(user => user.rank === 3);
    
// // //     return [second, first, third].filter(Boolean) as LeaderboardUser[];
// // //   };
  
// // //   const orderedPodiumUsers = getOrderedTopUsers();


// // //   const getCircleColor = (rank: number | null) => {
// // //     if (rank === 1) return "bg-yellow-100 border-yellow-400";
// // //     if (rank === 2) return "bg-gray-100 border-gray-400"; // Changed to silver/gray
// // //     if (rank === 3) return "bg-amber-100 border-amber-600"; // Bronze/amber
// // //     return "bg-gray-100 border-gray-300";
// // //   };

// // //   const getLevelBadgeColor = (level?: string) => {
// // //     if (!level) return 'bg-gray-100 text-gray-800';
// // //     const levels: Record<string, string> = {
// // //       'A1': 'bg-green-100 text-green-800',
// // //       'A2': 'bg-blue-100 text-blue-800',
// // //       'B1': 'bg-purple-100 text-purple-800',
// // //       'B2': 'bg-pink-100 text-pink-800',
// // //       'C1': 'bg-yellow-100 text-yellow-800', // Consider a diff yellow from rank 1
// // //       'C2': 'bg-red-100 text-red-800',
// // //     };
// // //     return levels[level] || 'bg-gray-100 text-gray-800';
// // //   };

// // //   const isUserCurrent = (username?: string) => {
// // //     return currentUser?.username === username;
// // //   };
  
// // //   // Determine if the current user is the one being displayed at the bottom, not in the main lists
// // //   const shouldDisplayCurrentUserSeparately = currentUser && !isCurrentUserInDisplayedList;


// // //   return (
// // //     <div className="mx-auto pb-20"> {/* Added padding-bottom for fixed bar space */}
// // //       {/* Filters Section (Commented Out) */}
// // //       {/* <div className="bg-white p-6 rounded-lg shadow-sm mb-6"> ... </div> */}
      
// // //       <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Leaderboard</h1>

// // //       <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl">
// // //         {/* Top 3 Users Podium */}
// // //         {orderedPodiumUsers.length > 0 && (
// // //           <div className="flex flex-wrap justify-center items-end mb-10 gap-2 md:gap-4">
// // //             {orderedPodiumUsers.map((user, index) => {
// // //               // Determine correct podium order: 2nd, 1st, 3rd
// // //               // The getOrderedTopUsers already provides this order.
// // //               // Index 0 = 2nd, Index 1 = 1st, Index 2 = 3rd
// // //               let crownSize = "w-10 h-10";
// // //               let avatarSize = "w-24 h-24";
// // //               let marginTop = "mt-8";
// // //               let rankTextBg = user?.rank === 1 ? 'bg-yellow-400' : user?.rank === 2 ? 'bg-slate-400' : 'bg-amber-600';

// // //               if (user?.rank === 1) { // Center (1st place)
// // //                 avatarSize = "w-28 h-28 md:w-32 md:h-32";
// // //                 marginTop = "mt-0";
// // //                 crownSize = "w-12 h-12 md:w-14 md:h-14";
// // //               } else if (user?.rank === 2) { // Left (2nd place)
// // //                 avatarSize = "w-20 h-20 md:w-24 md:h-24";
// // //                 marginTop = "mt-6 md:mt-8";
// // //               } else { // Right (3rd place)
// // //                  avatarSize = "w-20 h-20 md:w-24 md:h-24";
// // //                  marginTop = "mt-6 md:mt-8";
// // //               }

// // //               return (
// // //                 <div
// // //                   key={user?.username}
// // //                   className={`flex flex-col items-center px-1 ${marginTop} relative`} // Added relative for potential badge positioning
// // //                   style={{ order: user?.rank === 1 ? 1 : user?.rank === 2 ? 0 : 2 }} // CSS order: 2nd, 1st, 3rd
// // //                 >
// // //                   <div className="relative">
// // //                     {user?.rank === 1 && (
// // //                       <div className={`absolute -top-6 md:-top-8 left-1/2 transform -translate-x-1/2 z-10`}>
// // //                         <Crown className={`${crownSize} text-yellow-400`} strokeWidth={1.5} />
// // //                       </div>
// // //                     )}
// // //                     <div className={`relative ${avatarSize} rounded-full border-4 overflow-hidden ${getCircleColor(user?.rank || 0)} ${isUserCurrent(user?.username) ? 'ring-4 ring-blue-500 ring-offset-2' : ''}`}>
// // //                       <img
// // //                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}&backgroundColor=transparent`}
// // //                         alt={user?.firstName}
// // //                         className="w-full h-full object-cover"
// // //                       />
// // //                       <div className={`absolute -bottom-1 -right-1 w-8 h-8 md:w-9 md:h-9 rounded-full ${rankTextBg} border-2 border-white flex items-center justify-center font-bold text-white text-sm md:text-base`}>
// // //                         {user?.rank}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="mt-3 text-center">
// // //                     <h3 className={`font-semibold text-sm md:text-base ${isUserCurrent(user?.username) ? 'text-blue-600' : 'text-gray-800'}`}>
// // //                       {user?.firstName} {user?.lastName?.charAt(0) || ''}.
// // //                       {isUserCurrent(user?.username) && (
// // //                         <span className="block text-xs text-blue-500 font-bold">(You)</span>
// // //                       )}
// // //                     </h3>
// // //                     <div className="flex items-center justify-center text-xs md:text-sm text-gray-500 mt-1">
// // //                       <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-400" />
// // //                       {formatTime(user?.totalSeconds || 0)}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         )}
// // //          {orderedPodiumUsers.length === 0 && tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && (
// // //              <div className="text-center py-10 text-gray-500">No users on the leaderboard yet.</div>
// // //          )}


// // //         {/* Table for remaining users (Ranks 4-20) */}
// // //         {tableUsers.length > 0 && (
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full min-w-[600px]">
// // //               <thead>
// // //                 <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
// // //                   <th className="py-3 px-2 md:px-3">Rank</th>
// // //                   <th className="py-3 px-2 md:px-3">Student</th>
// // //                   <th className="py-3 px-2 md:px-3">School</th>
// // //                   {/* <th className="py-3 px-2 md:px-3">Section</th> */}
// // //                   <th className="py-3 px-2 md:px-3">Level</th>
// // //                   <th className="py-3 px-2 md:px-3 text-right">Time</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {tableUsers.map((user) => (
// // //                   <tr
// // //                     key={user.username}
// // //                     ref={isUserCurrent(user.username) ? currentUserInTableRef : null}
// // //                     className={`border-b border-gray-100 hover:bg-gray-50 ${isUserCurrent(user.username) ? 'bg-blue-50 font-medium' : ''}`}
// // //                   >
// // //                     <td className={`py-3 md:py-4 px-2 md:px-3 font-medium ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-700'}`}>{user.rank}</td>
// // //                     <td className="py-3 md:py-4 px-2 md:px-3">
// // //                       <div className="flex items-center">
// // //                         <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden flex-shrink-0 ${isUserCurrent(user.username) ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}>
// // //                           <img
// // //                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
// // //                             alt={user.firstName}
// // //                             className="w-full h-full object-cover"
// // //                           />
// // //                         </div>
// // //                         <div>
// // //                           <div className={`text-sm md:text-base ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-800'}`}>
// // //                             {user.firstName} {user.lastName?.charAt(0) || ''}.
// // //                             {isUserCurrent(user.username) && (
// // //                               <span className="ml-1 text-xs text-blue-500 font-semibold hidden md:inline">(You)</span>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </td>
// // //                     <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-gray-600">{user.schoolName || '-'}</td>
// // //                     {/* <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-gray-600">{user.class || '-'}</td> */}
// // //                     <td className="py-3 md:py-4 px-2 md:px-3">
// // //                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(user.aiCefrLevel)}`}>
// // //                         {user.aiCefrLevel || 'N/A'}
// // //                       </span>
// // //                     </td>
// // //                     <td className="py-3 md:py-4 px-2 md:px-3 text-right">
// // //                       <div className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-sm font-medium">
// // //                         {formatTime(user.totalSeconds)}
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* Show current user at the bottom if not in the top 20 and data exists */}
// // //         {shouldDisplayCurrentUserSeparately && currentUser && (
// // //           <>
// // //             {tableUsers.length > 0 && ( /* Show separator only if there's a table above */
// // //               <tr className="border-b border-gray-200">
// // //                 <td colSpan={5} className="py-2 text-center">
// // //                   <div className="flex items-center justify-center my-3">
// // //                     <div className="border-t border-gray-200 flex-grow"></div>
// // //                     <span className="mx-4 text-gray-400 text-xs uppercase font-semibold">Your Position</span>
// // //                     <div className="border-t border-gray-200 flex-grow"></div>
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             )}
            
// // //             {/* Current user row (when not in top 20) */}
// // //             {/* This row will be used for scroll tracking if user is not in tableUsers */}
// // //             <table className="w-full min-w-[600px] mt-2"> {/* Use table for consistent layout */}
// // //              <tbody>
// // //               <tr 
// // //                 ref={currentUserNotInTableRef}
// // //                 className="bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100" // more emphasis
// // //               >
// // //                 <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-blue-700 w-[60px]">{currentUser.rank !== null ? currentUser.rank : '-'}</td>
// // //                 <td className="py-3 md:py-4 px-2 md:px-3">
// // //                   <div className="flex items-center">
// // //                     <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden ring-2 ring-blue-500 ring-offset-1 flex-shrink-0">
// // //                       <img
// // //                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
// // //                         alt={currentUser.firstName}
// // //                         className="w-full h-full object-cover"
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <div className="font-semibold text-blue-700 text-sm md:text-base">
// // //                         {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}.
// // //                         <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </td>
// // //                 <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-blue-600">{currentUser.schoolName || '-'}</td>
// // //                 {/* <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-blue-600">{currentUser.class || '-'}</td> */}
// // //                 <td className="py-3 md:py-4 px-2 md:px-3">
// // //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(currentUser.aiCefrLevel)} border ${isUserCurrent(currentUser.username) ? 'border-blue-300' : ''}`}>
// // //                     {currentUser.aiCefrLevel || 'N/A'}
// // //                   </span>
// // //                 </td>
// // //                 <td className="py-3 md:py-4 px-2 md:px-3 text-right">
// // //                   <div className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-sm font-medium">
// // //                     {formatTime(currentUser.totalSeconds)}
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //              </tbody>
// // //             </table>
// // //           </>
// // //         )}
// // //          {tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && orderedPodiumUsers.length > 0 && (
// // //             <div className="text-center py-6 text-gray-500">No other users in ranks 4-20.</div>
// // //         )}
// // //       </div>

// // //       {/* Fixed User Bar */}
// // //       {showFixedUserBar && currentUser && (
// // //         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-50">
// // //           <div className="max-w-4xl mx-auto flex items-center justify-between">
// // //             <div className="flex items-center">
// // //               <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden ring-2 ring-blue-500 flex-shrink-0">
// // //                 <img
// // //                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
// // //                   alt={currentUser.firstName}
// // //                   className="w-full h-full object-cover"
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <span className="font-semibold text-blue-600">
// // //                   {currentUser.rank !== null ? `Rank ${currentUser.rank}` : 'Your Position'}
// // //                 </span>
// // //                 <span className="text-gray-700 hidden sm:inline"> - {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}. (You)</span>
// // //                 <span className="text-gray-700 sm:hidden"> (You)</span>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center space-x-3">
// // //                 <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getLevelBadgeColor(currentUser.aiCefrLevel)}`}>
// // //                     {currentUser.aiCefrLevel || 'N/A'}
// // //                 </span>
// // //                 <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center">
// // //                     <Clock size={16} className="mr-1.5 text-blue-500" />
// // //                     {formatTime(currentUser.totalSeconds)}
// // //                 </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Leaderboard; 
// // import React, { useEffect, useState, useRef } from 'react';
// // import { Crown, Clock } from "lucide-react";
// // import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
// // import { Skeleton } from '@/components/ui/skeleton';
// // import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// // interface LeaderboardProps {
// //   userId?: string;
// // }

// // const Leaderboard: React.FC<LeaderboardProps> = ({ userId: initialUserId }) => {
// //   const user = localStorage.getItem("AiTutorUser");
// //   let parsedUser = JSON.parse(user || '{}');
// //   const currentUserId = parsedUser?.id;

// //   const dispatch = useAppDispatch();
// //   const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);

// //   // State for the fixed user bar
// //   const [showFixedUserBar, setShowFixedUserBar] = useState(false);
  
// //   // State for filtered users - initialize with empty array, not dependent on leaderboard
// //   const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);

// //   // Refs for tracking current user's element position
// //   const currentUserInTableRef = useRef<HTMLTableRowElement>(null);
// //   const currentUserNotInTableRef = useRef<HTMLTableRowElement>(null);

// //   // Initial fetch of leaderboard data
// //   useEffect(() => {
// //     const filters: LeaderboardFilters = {
// //       userId: currentUserId || ""
// //     };
// //     dispatch(fetchLeaderboard(filters));
// //   }, [dispatch, currentUserId]);

// //   // Update filtered users when leaderboard changes
// //   useEffect(() => {
// //     if (leaderboard) {
// //       setFilteredUsers([...leaderboard]);
// //     }
// //   }, [leaderboard]);

// //   // Scroll handler for fixed user bar
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (!currentUser) {
// //         setShowFixedUserBar(false);
// //         return;
// //       }

// //       const isCurrentUserInDisplayedList = currentUser && 
// //         (topUsers.some(u => u.username === currentUser.username) || 
// //         tableUsers.some(u => u.username === currentUser.username));

// //       let userElement: HTMLElement | null = null;

// //       if (tableUsers.some(u => u.username === currentUser.username)) {
// //         userElement = currentUserInTableRef.current;
// //       } else if (!isCurrentUserInDisplayedList) { // User is not in top 20, so their separate row is shown
// //         userElement = currentUserNotInTableRef.current;
// //       }

// //       if (userElement) {
// //         const rect = userElement.getBoundingClientRect();
// //         // Show bar if element is scrolled out of view (top or bottom)
// //         if (rect.bottom < 0 || rect.top > window.innerHeight) {
// //           setShowFixedUserBar(true);
// //         } else {
// //           setShowFixedUserBar(false);
// //         }
// //       } else {
// //         setShowFixedUserBar(false);
// //       }
// //     };

// //     window.addEventListener('scroll', handleScroll);
// //     handleScroll(); // Initial check

// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, [currentUser, filteredUsers]); // Changed from tableUsers, leaderboard to filtered users which is always defined

// //   // Display loading state
// //   if (isLoading) {
// //     return (
// //       <div className="mx-auto">
// //         <h1 className="text-2xl font-bold mb-8 text-center md:text-left">Leaderboard</h1>
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //           <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-1 order-2 md:order-1">
// //             <Skeleton className="h-6 w-24 mb-6" />
// //             <div className="space-y-4">
// //               <Skeleton className="h-10 w-full" />
// //               <Skeleton className="h-10 w-full" />
// //               <Skeleton className="h-10 w-full" />
// //               <Skeleton className="h-10 w-full" />
// //               <Skeleton className="h-10 w-full" />
// //             </div>
// //           </div>
// //           <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm order-1 md:order-2">
// //             <div className="flex justify-center mb-10 gap-4 md:gap-6 flex-wrap">
// //               <Skeleton className="h-32 w-24" />
// //               <Skeleton className="h-40 w-24" />
// //               <Skeleton className="h-32 w-24" />
// //             </div>
// //             <Skeleton className="h-6 w-3/4 mb-4" />
// //             <Skeleton className="h-12 w-full mb-2" />
// //             <Skeleton className="h-12 w-full mb-2" />
// //             <Skeleton className="h-12 w-full mb-2" />
// //             <Skeleton className="h-12 w-full mb-2" />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Display error state
// //   if (error) {
// //     return (
// //       <div className="mx-auto">
// //         <h1 className="text-2xl font-bold mb-8 text-center">Leaderboard</h1>
// //         <div className="bg-red-100 p-4 rounded-lg text-red-700 border border-red-300">
// //           Failed to load leaderboard: {error}
// //         </div>
// //       </div>
// //     );
// //   }
  
// //   // Handle empty leaderboard
// //   if (!leaderboard || leaderboard.length === 0) {
// //     return (
// //       <div className="mx-auto p-6 text-center">
// //         <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Leaderboard</h1>
// //         <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl text-gray-500 py-10">
// //           No leaderboard data is available.
// //         </div>
// //       </div>
// //     );
// //   }
  
// //   // Get top 3 users for the podium display
// //   const topUsers = filteredUsers.filter(user => user.rank !== null && user.rank <= 3)
// //     .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

// //   // Get remaining users for the table (ranks 4-20)
// //   const tableUsers = filteredUsers.filter(user => user.rank !== null && user.rank > 3 && user.rank <= 20)
// //     .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

// //   const isCurrentUserInDisplayedList = currentUser && 
// //     (topUsers.some(u => u.username === currentUser.username) || 
// //      tableUsers.some(u => u.username === currentUser.username));

// //   const getOrderedTopUsers = () => {
// //     if (topUsers.length === 0) return [];
// //     if (topUsers.length < 3) { // Handle cases with fewer than 3 top users
// //         const podium: (LeaderboardUser | null)[] = [null, null, null]; // 2nd, 1st, 3rd
// //         const first = topUsers.find(user => user.rank === 1);
// //         const second = topUsers.find(user => user.rank === 2);
// //         const third = topUsers.find(user => user.rank === 3);

// //         if (first) podium[1] = first;
// //         if (second) podium[0] = second;
// //         if (third) podium[2] = third;
        
// //         if(topUsers.length === 1 && first) return [first];
// //         if(topUsers.length === 2) {
// //             if(first && second) return [second, first];
// //             if(first && !second) return [topUsers.find(u=>u.rank !==1), first]; // if only rank 1 and 3, for example
// //             if(second && !first) return [second, topUsers.find(u=>u.rank !==2)];
// //         }
// //         return podium.filter(Boolean) as LeaderboardUser[];
// //     }

// //     const first = topUsers.find(user => user.rank === 1);
// //     const second = topUsers.find(user => user.rank === 2);
// //     const third = topUsers.find(user => user.rank === 3);
    
// //     return [second, first, third].filter(Boolean) as LeaderboardUser[];
// //   };
  
// //   const orderedPodiumUsers = getOrderedTopUsers();

// //   const getCircleColor = (rank: number | null) => {
// //     if (rank === 1) return "bg-yellow-100 border-yellow-400";
// //     if (rank === 2) return "bg-gray-100 border-gray-400"; // Changed to silver/gray
// //     if (rank === 3) return "bg-amber-100 border-amber-600"; // Bronze/amber
// //     return "bg-gray-100 border-gray-300";
// //   };

// //   const getLevelBadgeColor = (level?: string) => {
// //     if (!level) return 'bg-gray-100 text-gray-800';
// //     const levels: Record<string, string> = {
// //       'A1': 'bg-green-100 text-green-800',
// //       'A2': 'bg-blue-100 text-blue-800',
// //       'B1': 'bg-purple-100 text-purple-800',
// //       'B2': 'bg-pink-100 text-pink-800',
// //       'C1': 'bg-yellow-100 text-yellow-800', // Consider a diff yellow from rank 1
// //       'C2': 'bg-red-100 text-red-800',
// //     };
// //     return levels[level] || 'bg-gray-100 text-gray-800';
// //   };

// //   const isUserCurrent = (username?: string) => {
// //     return currentUser?.username === username;
// //   };
  
// //   // Determine if the current user is the one being displayed at the bottom, not in the main lists
// //   const shouldDisplayCurrentUserSeparately = currentUser && !isCurrentUserInDisplayedList;

// //   return (
// //     <div className="mx-auto pb-20"> {/* Added padding-bottom for fixed bar space */}
// //       <h1 className="relative text-3xl font-bold mb-8 text-center text-gray-700">Leaderboard</h1>

// //       <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl">
// //         {/* Top 3 Users Podium */}
// //         {orderedPodiumUsers.length > 0 && (
// //           <div className="flex flex-wrap justify-center items-end mb-10 gap-2 md:gap-4">
// //             {orderedPodiumUsers.map((user, _index) => {
// //               let crownSize = "w-10 h-10";
// //               let avatarSize = "w-24 h-24";
// //               let marginTop = "mt-8";
// //               let rankTextBg = user?.rank === 1 ? 'bg-yellow-400' : user?.rank === 2 ? 'bg-slate-400' : 'bg-amber-600';

// //               if (user?.rank === 1) { // Center (1st place)
// //                 avatarSize = "w-28 h-28 md:w-32 md:h-32";
// //                 marginTop = "mt-0";
// //                 crownSize = "w-12 h-12 md:w-14 md:h-14";
// //               } else if (user?.rank === 2) { // Left (2nd place)
// //                 avatarSize = "w-20 h-20 md:w-24 md:h-24";
// //                 marginTop = "mt-6 md:mt-8";
// //               } else { // Right (3rd place)
// //                  avatarSize = "w-20 h-20 md:w-24 md:h-24";
// //                  marginTop = "mt-6 md:mt-8";
// //               }

// //               return (
// //                 <div
// //                   key={user?.username}
// //                   className={`flex flex-col items-center px-1 ${marginTop} relative`}
// //                   style={{ order: user?.rank === 1 ? 1 : user?.rank === 2 ? 0 : 2 }}
// //                 >
// //                   <div className="relative">
// //                     {user?.rank === 1 && (
// //                       <div className={`absolute -top-6 md:-top-14 left-1/2 transform -translate-x-1/2 z-10`}>
// //                         <Crown className={`${crownSize} text-yellow-400`} strokeWidth={1.5} />
// //                       </div>
// //                     )}
// //                     <div className={`relative ${avatarSize} rounded-full border-4 overflow-hidden ${getCircleColor(user?.rank || 0)} ${isUserCurrent(user?.username) ? 'ring-4 ring-blue-500 ring-offset-2' : ''}`}>
// //                       <img
// //                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}&backgroundColor=transparent`}
// //                         alt={user?.firstName}
// //                         className="w-full h-full object-cover"
// //                       />
// //                       <div className={`absolute bottom-0 right-1 w-8 h-8 md:w-9 md:h-9 rounded-full ${rankTextBg} border-2 border-white flex items-center justify-center font-bold text-white text-sm md:text-base`}>
// //                         {user?.rank}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="mt-3 text-center">
// //                     <h3 className={`font-semibold text-sm md:text-base ${isUserCurrent(user?.username) ? 'text-blue-600' : 'text-gray-800'}`}>
// //                       {user?.firstName} {user?.lastName?.charAt(0) || ''}.
// //                       {isUserCurrent(user?.username) && (
// //                         <span className="block text-xs text-blue-500 font-bold">(You)</span>
// //                       )}
// //                     </h3>
// //                     <div className="flex items-center justify-center text-xs md:text-sm text-gray-500 mt-1">
// //                       <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-400" />
// //                       {formatTime(user?.totalSeconds || 0)}
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
        
// //         {orderedPodiumUsers.length === 0 && tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && (
// //           <div className="text-center py-10 text-gray-500">No users on the leaderboard yet.</div>
// //         )}

// //         {/* Table for remaining users (Ranks 4-20) */}
// //         {tableUsers.length > 0 && (
// //           <div className="overflow-x-auto">
// //             <table className="w-full min-w-[600px]">
// //               <thead>
// //                 <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
// //                   <th className="py-3 px-2 md:px-3">Rank</th>
// //                   <th className="py-3 px-2 md:px-3">Student</th>
// //                   <th className="py-3 px-2 md:px-3">School</th>
// //                   <th className="py-3 px-2 md:px-3">Level</th>
// //                   <th className="py-3 px-2 md:px-3 text-right">Time</th>
// //                   <th className="py-3 px-2 md:px-3 text-right">Completed Topics</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {tableUsers.map((user) => (
// //                   <tr
// //                     key={user.username}
// //                     ref={isUserCurrent(user.username) ? currentUserInTableRef : null}
// //                     className={`border-b border-gray-100 hover:bg-gray-50 ${isUserCurrent(user.username) ? 'bg-blue-50 font-medium' : ''}`}
// //                   >
// //                     <td className={`py-3 md:py-4 px-2 md:px-3 font-medium ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-700'}`}>{user.rank}</td>
// //                     <td className="py-3 md:py-4 px-2 md:px-3">
// //                       <div className="flex items-center">
// //                         <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden flex-shrink-0 ${isUserCurrent(user.username) ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}>
// //                           <img
// //                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
// //                             alt={user.firstName}
// //                             className="w-full h-full object-cover"
// //                           />
// //                         </div>
// //                         <div>
// //                           <div className={`text-sm md:text-base ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-800'}`}>
// //                             {user.firstName} {user.lastName?.charAt(0) || ''}.
// //                             {isUserCurrent(user.username) && (
// //                               <span className="ml-1 text-xs text-blue-500 font-semibold hidden md:inline">(You)</span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-gray-600">{user.schoolName || '-'}</td>
// //                     <td className="py-3 md:py-4 px-2 md:px-3">
// //                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(user.aiCefrLevel)}`}>
// //                         {user.aiCefrLevel || 'N/A'}
// //                       </span>
// //                     </td>
// //                     <td className="py-3 md:py-4 px-2 md:px-3 text-right">
// //                       <div className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-sm font-medium">
// //                         {formatTime(user.totalSeconds)}
// //                       </div>
// //                     </td>
// //                     <td className="py-3 md:py-4 px-2 md:px-3 text-right">
// //                       <div className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-sm font-medium">
// //                         {user.completedTopics || 0}
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Show current user at the bottom if not in the top 20 and data exists */}
// //         {shouldDisplayCurrentUserSeparately && currentUser && (
// //           <>
          
// //             {tableUsers.length > 0 && (
// //               <div className="flex items-center justify-center my-3">
// //                 <div className="border-t border-gray-200 flex-grow"></div>
// //                 <span className="mx-4 text-gray-400 text-xs uppercase font-semibold">Your Position</span>
// //                 <div className="border-t border-gray-200 flex-grow"></div>
// //               </div>
// //             )}
            
// //             {/* Current user row (when not in top 20) */}
// //             <table className="w-full min-w-[600px] mt-2">
// //              <tbody>
// //               <tr 
// //                 ref={currentUserNotInTableRef}
// //                 className="bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
// //               >
// //                 <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-blue-700 w-[60px]">{currentUser.rank !== null ? currentUser.rank : '-'}</td>
// //                 <td className="py-3 md:py-4 px-2 md:px-3">
// //                   <div className="flex items-center">
// //                     <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden ring-2 ring-blue-500 ring-offset-1 flex-shrink-0">
// //                       <img
// //                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
// //                         alt={currentUser.firstName}
// //                         className="w-full h-full object-cover"
// //                       />
// //                     </div>
// //                     <div>
// //                       <div className="font-semibold text-blue-700 text-sm md:text-base">
// //                         {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}.
// //                         <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </td>
// //                 <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-blue-600">{currentUser.schoolName || '-'}</td>
// //                 <td className="py-3 md:py-4 px-2 md:px-3">
// //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(currentUser.aiCefrLevel)} border ${isUserCurrent(currentUser.username) ? 'border-blue-300' : ''}`}>
// //                     {currentUser.aiCefrLevel || 'N/A'}
// //                   </span>
// //                 </td>
// //                 <td className="py-3 md:py-4 px-2 md:px-3 text-right">
// //                   <div className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-sm font-medium">
// //                     {formatTime(currentUser.totalSeconds)}
// //                   </div>
// //                 </td>
// //               </tr>
// //              </tbody>
// //             </table>
// //           </>
// //         )}
        
// //         {tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && orderedPodiumUsers.length > 0 && (
// //           <div className="text-center py-6 text-gray-500">No other users in ranks 4-20.</div>
// //         )}
// //       </div>

// //       {/* Fixed User Bar */}
// //       {showFixedUserBar && currentUser && (
// //         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-50">
// //           <div className="max-w-4xl mx-auto flex items-center justify-between">
// //             <div className="flex items-center">
// //               <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden ring-2 ring-blue-500 flex-shrink-0">
// //                 <img
// //                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
// //                   alt={currentUser.firstName}
// //                   className="w-full h-full object-cover"
// //                 />
// //               </div>
// //               <div>
// //                 <span className="font-semibold text-blue-600">
// //                   {currentUser.rank !== null ? `Rank ${currentUser.rank}` : 'Your Position'}
// //                 </span>
// //                 <span className="text-gray-700 hidden sm:inline"> - {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}. (You)</span>
// //                 <span className="text-gray-700 sm:hidden"> (You)</span>
// //               </div>
// //             </div>
// //             <div className="flex items-center space-x-3">
// //                 <span className={`px-2.5 py-1 rounded-full text-md`}>
// //                     {currentUser.schoolName || 'N/A'}
// //                 </span>
// //             </div>
// //             <div className="flex items-center space-x-3">
// //                 <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getLevelBadgeColor(currentUser.aiCefrLevel)}`}>
// //                     {currentUser.aiCefrLevel || 'N/A'}
// //                 </span>
// //                 <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center">
// //                     <Clock size={16} className="mr-1.5 text-blue-500" />
// //                     {formatTime(currentUser.totalSeconds)}
// //                 </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Leaderboard;
// import React, { useEffect, useState, useRef } from 'react';
// import { Crown, Clock } from "lucide-react";
// import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// interface LeaderboardProps {
//   userId?: string;
// }

// const Leaderboard: React.FC<LeaderboardProps> = ({ userId: initialUserId }) => {
//   const user = localStorage.getItem("AiTutorUser");
//   let parsedUser = JSON.parse(user || '{}');
//   const currentUserId = parsedUser?.id;

//   const dispatch = useAppDispatch();
//   const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);

//   // State for the fixed user bar
//   const [showFixedUserBar, setShowFixedUserBar] = useState(false);
  
//   // State for filtered users - initialize with empty array, not dependent on leaderboard
//   const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);

//   // Refs for tracking current user's element position
//   const currentUserInTableRef = useRef<HTMLTableRowElement>(null);
//   const currentUserNotInTableRef = useRef<HTMLTableRowElement>(null);

//   // Initial fetch of leaderboard data
//   useEffect(() => {
//     const filters: LeaderboardFilters = {
//       userId: currentUserId || ""
//     };
//     dispatch(fetchLeaderboard(filters));
//   }, [dispatch, currentUserId]);

//   // Update filtered users when leaderboard changes
//   useEffect(() => {
//     if (leaderboard) {
//       setFilteredUsers([...leaderboard]);
//     }
//   }, [leaderboard]);

//   // Scroll handler for fixed user bar
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!currentUser) {
//         setShowFixedUserBar(false);
//         return;
//       }

//       const isCurrentUserInDisplayedList = currentUser && 
//         (topUsers.some(u => u.username === currentUser.username) || 
//         tableUsers.some(u => u.username === currentUser.username));

//       let userElement: HTMLElement | null = null;

//       if (tableUsers.some(u => u.username === currentUser.username)) {
//         userElement = currentUserInTableRef.current;
//       } else if (!isCurrentUserInDisplayedList) { // User is not in top 20, so their separate row is shown
//         userElement = currentUserNotInTableRef.current;
//       }

//       if (userElement) {
//         const rect = userElement.getBoundingClientRect();
//         // Show bar if element is scrolled out of view (top or bottom)
//         if (rect.bottom < 0 || rect.top > window.innerHeight) {
//           setShowFixedUserBar(true);
//         } else {
//           setShowFixedUserBar(false);
//         }
//       } else {
//         setShowFixedUserBar(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Initial check

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [currentUser, filteredUsers]); // Changed from tableUsers, leaderboard to filtered users which is always defined

//   // Display loading state
//   if (isLoading) {
//     return (
//       <div className="mx-auto">
//         <h1 className="text-2xl font-bold mb-8 text-center md:text-left">Leaderboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-1 order-2 md:order-1">
//             <Skeleton className="h-6 w-24 mb-6" />
//             <div className="space-y-4">
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//           </div>
//           <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm order-1 md:order-2">
//             <div className="flex justify-center mb-10 gap-4 md:gap-6 flex-wrap">
//               <Skeleton className="h-32 w-24" />
//               <Skeleton className="h-40 w-24" />
//               <Skeleton className="h-32 w-24" />
//             </div>
//             <Skeleton className="h-6 w-3/4 mb-4" />
//             <Skeleton className="h-12 w-full mb-2" />
//             <Skeleton className="h-12 w-full mb-2" />
//             <Skeleton className="h-12 w-full mb-2" />
//             <Skeleton className="h-12 w-full mb-2" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Display error state
//   if (error) {
//     return (
//       <div className="mx-auto">
//         <h1 className="text-2xl font-bold mb-8 text-center">Leaderboard</h1>
//         <div className="bg-red-100 p-4 rounded-lg text-red-700 border border-red-300">
//           Failed to load leaderboard: {error}
//         </div>
//       </div>
//     );
//   }
  
//   // Handle empty leaderboard
//   if (!leaderboard || leaderboard.length === 0) {
//     return (
//       <div className="mx-auto p-6 text-center">
//         <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Leaderboard</h1>
//         <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl text-gray-500 py-10">
//           No leaderboard data is available.
//         </div>
//       </div>
//     );
//   }
  
//   // Get top 3 users for the podium display
//   const topUsers = filteredUsers.filter(user => user.rank !== null && user.rank <= 3)
//     .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

//   // Get remaining users for the table (ranks 4-20)
//   const tableUsers = filteredUsers.filter(user => user.rank !== null && user.rank > 3 && user.rank <= 20)
//     .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

//   const isCurrentUserInDisplayedList = currentUser && 
//     (topUsers.some(u => u.username === currentUser.username) || 
//      tableUsers.some(u => u.username === currentUser.username));

//   const getOrderedTopUsers = () => {
//     if (topUsers.length === 0) return [];
//     if (topUsers.length < 3) { // Handle cases with fewer than 3 top users
//         const podium: (LeaderboardUser | null)[] = [null, null, null]; // 2nd, 1st, 3rd
//         const first = topUsers.find(user => user.rank === 1);
//         const second = topUsers.find(user => user.rank === 2);
//         const third = topUsers.find(user => user.rank === 3);

//         if (first) podium[1] = first;
//         if (second) podium[0] = second;
//         if (third) podium[2] = third;
        
//         if(topUsers.length === 1 && first) return [first];
//         if(topUsers.length === 2) {
//             if(first && second) return [second, first];
//             if(first && !second) return [topUsers.find(u=>u.rank !==1), first]; // if only rank 1 and 3, for example
//             if(second && !first) return [second, topUsers.find(u=>u.rank !==2)];
//         }
//         return podium.filter(Boolean) as LeaderboardUser[];
//     }

//     const first = topUsers.find(user => user.rank === 1);
//     const second = topUsers.find(user => user.rank === 2);
//     const third = topUsers.find(user => user.rank === 3);
    
//     return [second, first, third].filter(Boolean) as LeaderboardUser[];
//   };
  
//   const orderedPodiumUsers = getOrderedTopUsers();

//   const getCircleColor = (rank: number | null) => {
//     if (rank === 1) return "bg-yellow-100 border-yellow-400";
//     if (rank === 2) return "bg-gray-100 border-gray-400"; // Changed to silver/gray
//     if (rank === 3) return "bg-amber-100 border-amber-600"; // Bronze/amber
//     return "bg-gray-100 border-gray-300";
//   };

//   const getLevelBadgeColor = (level?: string) => {
//     if (!level) return 'bg-gray-100 text-gray-800';
//     const levels: Record<string, string> = {
//       'A1': 'bg-green-100 text-green-800',
//       'A2': 'bg-blue-100 text-blue-800',
//       'B1': 'bg-purple-100 text-purple-800',
//       'B2': 'bg-pink-100 text-pink-800',
//       'C1': 'bg-yellow-100 text-yellow-800', // Consider a diff yellow from rank 1
//       'C2': 'bg-red-100 text-red-800',
//     };
//     return levels[level] || 'bg-gray-100 text-gray-800';
//   };

//   const isUserCurrent = (username?: string) => {
//     return currentUser?.username === username;
//   };
  
//   // Determine if the current user is the one being displayed at the bottom, not in the main lists
//   const shouldDisplayCurrentUserSeparately = currentUser && !isCurrentUserInDisplayedList;

//   return (
//     <div className="mx-auto pb-20"> {/* Added padding-bottom for fixed bar space */}
//       <h1 className="relative text-3xl font-bold mb-8 text-center text-gray-700">Leaderboard</h1>

//       <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl">
//         {/* Top 3 Users Podium */}
//         {orderedPodiumUsers.length > 0 && (
//           <div className="flex flex-wrap justify-center items-end mb-10 gap-2 md:gap-4">
//             {orderedPodiumUsers.map((user, _index) => {
//               let crownSize = "w-10 h-10";
//               let avatarSize = "w-24 h-24";
//               let marginTop = "mt-8";
//               let rankTextBg = user?.rank === 1 ? 'bg-yellow-400' : user?.rank === 2 ? 'bg-slate-400' : 'bg-amber-600';

//               if (user?.rank === 1) { // Center (1st place)
//                 avatarSize = "w-28 h-28 md:w-32 md:h-32";
//                 marginTop = "mt-0";
//                 crownSize = "w-12 h-12 md:w-14 md:h-14";
//               } else if (user?.rank === 2) { // Left (2nd place)
//                 avatarSize = "w-20 h-20 md:w-24 md:h-24";
//                 marginTop = "mt-6 md:mt-8";
//               } else { // Right (3rd place)
//                  avatarSize = "w-20 h-20 md:w-24 md:h-24";
//                  marginTop = "mt-6 md:mt-8";
//               }

//               return (
//                 <div
//                   key={user?.username}
//                   className={`flex flex-col items-center px-1 ${marginTop} relative`}
//                   style={{ order: user?.rank === 1 ? 1 : user?.rank === 2 ? 0 : 2 }}
//                 >
//                   <div className="relative">
//                     {user?.rank === 1 && (
//                       <div className={`absolute -top-6 md:-top-14 left-1/2 transform -translate-x-1/2 z-10`}>
//                         <Crown className={`${crownSize} text-yellow-400`} strokeWidth={1.5} />
//                       </div>
//                     )}
//                     <div className={`relative ${avatarSize} rounded-full border-4 overflow-hidden ${getCircleColor(user?.rank || 0)} ${isUserCurrent(user?.username) ? 'ring-4 ring-blue-500 ring-offset-2' : ''}`}>
//                       <img
//                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}&backgroundColor=transparent`}
//                         alt={user?.firstName}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className={`absolute bottom-0 right-1 w-8 h-8 md:w-9 md:h-9 rounded-full ${rankTextBg} border-2 border-white flex items-center justify-center font-bold text-white text-sm md:text-base`}>
//                         {user?.rank}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-3 text-center">
//                     <h3 className={`font-semibold text-sm md:text-base ${isUserCurrent(user?.username) ? 'text-blue-600' : 'text-gray-800'}`}>
//                       {user?.firstName} {user?.lastName?.charAt(0) || ''}.
//                       {isUserCurrent(user?.username) && (
//                         <span className="block text-xs text-blue-500 font-bold">(You)</span>
//                       )}
//                     </h3>
//                     <div className="flex items-center justify-center text-xs md:text-sm text-gray-500 mt-1">
//                       <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-400" />
//                       {formatTime(user?.totalSeconds || 0)}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
        
//         {orderedPodiumUsers.length === 0 && tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && (
//           <div className="text-center py-10 text-gray-500">No users on the leaderboard yet.</div>
//         )}

//         {/* Table for remaining users (Ranks 4-20) */}
//         {tableUsers.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[600px]">
//               <thead>
//                 <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
//                   <th className="py-3 px-2 md:px-3">Rank</th>
//                   <th className="py-3 px-2 md:px-3">Student</th>
//                   <th className="py-3 px-2 md:px-3">School</th>
//                   <th className="py-3 px-2 md:px-3">Level</th>
//                   <th className="py-3 px-2 md:px-3 text-right">Time</th>
//                   <th className="py-3 px-2 md:px-3 text-right">Completed Topics</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableUsers.map((user) => (
//                   <tr
//                     key={user.username}
//                     ref={isUserCurrent(user.username) ? currentUserInTableRef : null}
//                     className={`border-b border-gray-100 hover:bg-gray-50 ${isUserCurrent(user.username) ? 'bg-blue-50 font-medium' : ''}`}
//                   >
//                     <td className={`py-3 md:py-4 px-2 md:px-3 font-medium ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-700'}`}>{user.rank}</td>
//                     <td className="py-3 md:py-4 px-2 md:px-3">
//                       <div className="flex items-center">
//                         <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden flex-shrink-0 ${isUserCurrent(user.username) ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}>
//                           <img
//                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
//                             alt={user.firstName}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <div className={`text-sm md:text-base ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-800'}`}>
//                             {user.firstName} {user.lastName?.charAt(0) || ''}.
//                             {isUserCurrent(user.username) && (
//                               <span className="ml-1 text-xs text-blue-500 font-semibold hidden md:inline">(You)</span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-gray-600">{user.schoolName || '-'}</td>
//                     <td className="py-3 md:py-4 px-2 md:px-3">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(user.aiCefrLevel)}`}>
//                         {user.aiCefrLevel || 'N/A'}
//                       </span>
//                     </td>
//                     <td className="py-3 md:py-4 px-2 md:px-3 text-right">
//                       <div className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-sm font-medium">
//                         {formatTime(user.totalSeconds)}
//                       </div>
//                     </td>
//                     <td className="py-3 md:py-4 px-2 md:px-3 text-right">
//                       <div className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-sm font-medium">
//                         {user.completedTopics || 0}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Show current user at the bottom if not in the top 20 and data exists */}
//         {shouldDisplayCurrentUserSeparately && currentUser && (
//           <>
//             {tableUsers.length > 0 && (
//               <div className="flex items-center justify-center my-3">
//                 <div className="border-t border-gray-200 flex-grow"></div>
//                 <span className="mx-4 text-gray-400 text-xs uppercase font-semibold">Your Position</span>
//                 <div className="border-t border-gray-200 flex-grow"></div>
//               </div>
//             )}
            
//             {/* Current user row (when not in top 20) - FIXED to match table alignment and prevent overflow */}
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[600px] mt-2">
//                 <thead className="sr-only">
//                   <tr>
//                     <th>Rank</th>
//                     <th>Student</th>
//                     <th>School</th>
//                     <th>Level</th>
//                     <th>Time</th>
//                     <th>Completed Topics</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr 
//                     ref={currentUserNotInTableRef}
//                     className="bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
//                   >
//                     <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-blue-700">{currentUser.rank !== null ? currentUser.rank : '-'}</td>
//                     <td className="py-3 md:py-4 px-2 md:px-3">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden ring-2 ring-blue-500 ring-offset-1 flex-shrink-0">
//                           <img
//                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
//                             alt={currentUser.firstName}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <div className="font-semibold text-blue-700 text-sm md:text-base">
//                             {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}.
//                             <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-blue-600">{currentUser.schoolName || '-'}</td>
//                     <td className="py-3 md:py-4 px-2 md:px-3">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(currentUser.aiCefrLevel)} border ${isUserCurrent(currentUser.username) ? 'border-blue-300' : ''}`}>
//                         {currentUser.aiCefrLevel || 'N/A'}
//                       </span>
//                     </td>
//                     <td className="py-3 md:py-4 px-2 md:px-3 text-right">
//                       <div className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-sm font-medium">
//                         {formatTime(currentUser.totalSeconds)}
//                       </div>
//                     </td>
//                     <td className="py-3 md:py-4 px-2 md:px-3 text-right">
//                       <div className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-sm font-medium">
//                         {currentUser.completedTopics || 0}
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
        
//         {tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && orderedPodiumUsers.length > 0 && (
//           <div className="text-center py-6 text-gray-500">No other users in ranks 4-20.</div>
//         )}
//       </div>

//       {/* Fixed User Bar */}
//       {showFixedUserBar && currentUser && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-50">
//           <div className="max-w-4xl mx-auto flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden ring-2 ring-blue-500 flex-shrink-0">
//                 <img
//                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
//                   alt={currentUser.firstName}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div>
//                 <span className="font-semibold text-blue-600">
//                   {currentUser.rank !== null ? `Rank ${currentUser.rank}` : 'Your Position'}
//                 </span>
//                 <span className="text-gray-700 hidden sm:inline"> - {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}. (You)</span>
//                 <span className="text-gray-700 sm:hidden"> (You)</span>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//                 <span className={`px-2.5 py-1 rounded-full text-md`}>
//                     {currentUser.schoolName || 'N/A'}
//                 </span>
//             </div>
//             <div className="flex items-center space-x-3">
//                 <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getLevelBadgeColor(currentUser.aiCefrLevel)}`}>
//                     {currentUser.aiCefrLevel || 'N/A'}
//                 </span>
//                 <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center">
//                     <Clock size={16} className="mr-1.5 text-blue-500" />
//                     {formatTime(currentUser.totalSeconds)}
//                 </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;
import React, { useEffect, useState, useRef } from 'react';
import { Crown, Clock } from "lucide-react";
import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface LeaderboardProps {
  userId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ userId: _initialUserId }) => {
  const user = localStorage.getItem("AiTutorUser");
  let parsedUser = JSON.parse(user || '{}');
  const currentUserId = parsedUser?.id;

  const dispatch = useAppDispatch();
  const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);

  const [showFixedUserBar, setShowFixedUserBar] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);

  const currentUserInTableRef = useRef<HTMLTableRowElement>(null);
  const currentUserNotInTableRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const filters: LeaderboardFilters = {
      userId: currentUserId || ""
    };
    dispatch(fetchLeaderboard(filters));
  }, [dispatch, currentUserId]);

  useEffect(() => {
    if (leaderboard) {
      setFilteredUsers([...leaderboard]);
    }
  }, [leaderboard]);

  useEffect(() => {
    const handleScroll = () => {
      if (!currentUser) {
        setShowFixedUserBar(false);
        return;
      }

      const isCurrentUserInDisplayedList = currentUser &&
        (topUsers.some(u => u.username === currentUser.username) ||
         tableUsers.some(u => u.username === currentUser.username));

      let userElement: HTMLElement | null = null;

      if (tableUsers.some(u => u.username === currentUser.username)) {
        userElement = currentUserInTableRef.current;
      } else if (!isCurrentUserInDisplayedList) {
        userElement = currentUserNotInTableRef.current;
      }

      if (userElement) {
        const rect = userElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setShowFixedUserBar(true);
        } else {
          setShowFixedUserBar(false);
        }
      } else {
        setShowFixedUserBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentUser, filteredUsers]);

  if (isLoading) {
    return (
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center md:text-left">Leaderboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-1 order-2 md:order-1">
            <Skeleton className="h-6 w-24 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm order-1 md:order-2">
            <div className="flex justify-center mb-10 gap-4 md:gap-6 flex-wrap">
              <Skeleton className="h-32 w-24" />
              <Skeleton className="h-40 w-24" />
              <Skeleton className="h-32 w-24" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-full mb-2" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Leaderboard</h1>
        <div className="bg-red-100 p-4 rounded-lg text-red-700 border border-red-300">
          Failed to load leaderboard: {error}
        </div>
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Leaderboard</h1>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl text-gray-500 py-10">
          No leaderboard data is available.
        </div>
      </div>
    );
  }

  const topUsers = filteredUsers.filter(user => user.rank !== null && user.rank <= 3)
    .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

  const tableUsers = filteredUsers.filter(user => user.rank !== null && user.rank > 3 && user.rank <= 20)
    .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

  const isCurrentUserInDisplayedList = currentUser &&
    (topUsers.some(u => u.username === currentUser.username) ||
     tableUsers.some(u => u.username === currentUser.username));

  const getOrderedTopUsers = () => {
    if (topUsers.length === 0) return [];
    if (topUsers.length < 3) {
      const podium: (LeaderboardUser | null)[] = [null, null, null];
      const first = topUsers.find(user => user.rank === 1);
      const second = topUsers.find(user => user.rank === 2);
      const third = topUsers.find(user => user.rank === 3);

      if (first) podium[1] = first;
      if (second) podium[0] = second;
      if (third) podium[2] = third;

      if (topUsers.length === 1 && first) return [first];
      if (topUsers.length === 2) {
        if (first && second) return [second, first];
        if (first && !second) return [topUsers.find(u => u.rank !== 1), first];
        if (second && !first) return [second, topUsers.find(u => u.rank !== 2)];
      }
      return podium.filter(Boolean) as LeaderboardUser[];
    }

    const first = topUsers.find(user => user.rank === 1);
    const second = topUsers.find(user => user.rank === 2);
    const third = topUsers.find(user => user.rank === 3);

    return [second, first, third].filter(Boolean) as LeaderboardUser[];
  };

  const orderedPodiumUsers = getOrderedTopUsers();

  const getCircleColor = (rank: number | null) => {
    if (rank === 1) return "bg-yellow-100 border-yellow-400";
    if (rank === 2) return "bg-gray-100 border-gray-400";
    if (rank === 3) return "bg-amber-100 border-amber-600";
    return "bg-gray-100 border-gray-300";
  };

  const getLevelBadgeColor = (level?: string) => {
    if (!level) return 'bg-gray-100 text-gray-800';
    const levels: Record<string, string> = {
      'A1': 'bg-green-100 text-green-800',
      'A2': 'bg-blue-100 text-blue-800',
      'B1': 'bg-purple-100 text-purple-800',
      'B2': 'bg-pink-100 text-pink-800',
      'C1': 'bg-yellow-100 text-yellow-800',
      'C2': 'bg-red-100 text-red-800',
    };
    return levels[level] || 'bg-gray-100 text-gray-800';
  };

  const isUserCurrent = (username?: string) => {
    return currentUser?.username === username;
  };

  const shouldDisplayCurrentUserSeparately = currentUser && !isCurrentUserInDisplayedList;

  return (
    <div className="mx-auto pb-20">
      <h1 className="relative text-3xl font-bold mb-8 text-center text-gray-700">Leaderboard</h1>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl">
        {orderedPodiumUsers.length > 0 && (
          <div className="flex flex-wrap justify-center items-end mb-10 gap-2 md:gap-4">
            {orderedPodiumUsers.map((user, _index) => {
              let crownSize = "w-10 h-10";
              let avatarSize = "w-24 h-24";
              let marginTop = "mt-8";
              let rankTextBg = user?.rank === 1 ? 'bg-yellow-400' : user?.rank === 2 ? 'bg-slate-400' : 'bg-amber-600';

              if (user?.rank === 1) {
                avatarSize = "w-28 h-28 md:w-32 md:h-32";
                marginTop = "mt-0";
                crownSize = "w-12 h-12 md:w-14 md:h-14";
              } else if (user?.rank === 2) {
                avatarSize = "w-20 h-20 md:w-24 md:h-24";
                marginTop = "mt-6 md:mt-8";
              } else {
                avatarSize = "w-20 h-20 md:w-24 md:h-24";
                marginTop = "mt-6 md:mt-8";
              }

              return (
                <div
                  key={user?.username}
                  className={`flex flex-col items-center px-1 ${marginTop} relative`}
                  style={{ order: user?.rank === 1 ? 1 : user?.rank === 2 ? 0 : 2 }}
                >
                  <div className="relative">
                    {user?.rank === 1 && (
                      <div className={`absolute -top-6 md:-top-14 left-1/2 transform -translate-x-1/2 z-10`}>
                        <Crown className={`${crownSize} text-yellow-400`} strokeWidth={1.5} />
                      </div>
                    )}
                    <div className={`relative ${avatarSize} rounded-full border-4 overflow-hidden ${getCircleColor(user?.rank || 0)} ${isUserCurrent(user?.username) ? 'ring-4 ring-blue-500 ring-offset-2' : ''}`}>
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}&backgroundColor=transparent`}
                        alt={user?.firstName}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute bottom-0 right-1 w-8 h-8 md:w-9 md:h-9 rounded-full ${rankTextBg} border-2 border-white flex items-center justify-center font-bold text-white text-sm md:text-base`}>
                        {user?.rank}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className={`font-semibold text-sm md:text-base ${isUserCurrent(user?.username) ? 'text-blue-600' : 'text-gray-800'}`}>
                      {user?.firstName} {user?.lastName?.charAt(0) || ''}.
                      {isUserCurrent(user?.username) && (
                        <span className="block text-xs text-blue-500 font-bold">(You)</span>
                      )}
                    </h3>
                    <div className="flex items-center justify-center text-xs md:text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-400" />
                      {formatTime(user?.totalSeconds || 0)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {orderedPodiumUsers.length === 0 && tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && (
          <div className="text-center py-10 text-gray-500">No users on the leaderboard yet.</div>
        )}

        {tableUsers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
                  <th className="py-3 px-2 md:px-3">Rank</th>
                  <th className="py-3 px-2 md:px-3">Student</th>
                  <th className="py-3 px-2 md:px-3">School</th>
                  <th className="py-3 px-2 md:px-3">Level</th>
                  <th className="py-3 px-2 md:px-3 text-right">Time</th>
                  <th className="py-3 px-2 md:px-3 text-right">Completed Topics</th>
                </tr>
              </thead>
              <tbody>
                {tableUsers.map((user) => (
                  <tr
                    key={user.username}
                    ref={isUserCurrent(user.username) ? currentUserInTableRef : null}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${isUserCurrent(user.username) ? 'bg-blue-50 font-medium' : ''}`}
                  >
                    <td className={`py-3 md:py-4 px-2 md:px-3 font-medium ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-700'}`}>{user.rank}</td>
                    <td className="py-3 md:py-4 px-2 md:px-3">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden flex-shrink-0 ${isUserCurrent(user.username) ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}>
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                            alt={user.firstName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className={`text-sm md:text-base ${isUserCurrent(user.username) ? 'text-blue-600' : 'text-gray-800'}`}>
                            {user.firstName} {user.lastName?.charAt(0) || ''}.
                            {isUserCurrent(user.username) && (
                              <span className="ml-1 text-xs text-blue-500 font-semibold hidden md:inline">(You)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-gray-600">{user.schoolName || '-'}</td>
                    <td className="py-3 md:py-4 px-2 md:px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(user.aiCefrLevel)}`}>
                        {user.aiCefrLevel || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-3 text-right">
                      <div className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-sm font-medium">
                        {formatTime(user.totalSeconds)}
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-3 text-right">
                      <div className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-sm font-medium">
                        {user.completedTopics || 0}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {shouldDisplayCurrentUserSeparately && currentUser && (
          <>
            {tableUsers.length > 0 && (
              <div className="flex items-center justify-center my-3">
                <div className="border-t border-gray-200 flex-grow"></div>
                <span className="mx-4 text-gray-400 text-xs uppercase font-semibold">Your Position</span>
                <div className="border-t border-gray-200 flex-grow"></div>
              </div>
            )}

            <table className="w-full min-w-[600px] mt-2">
              <tbody>
                <tr
                  ref={currentUserNotInTableRef}
                  className="bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                >
                  <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-blue-700 w-[60px]">{currentUser.rank !== null ? currentUser.rank : '-'}</td>
                  <td className="py-3 md:py-4 px-2 md:px-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden ring-2 ring-blue-500 ring-offset-1 flex-shrink-0">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                          alt={currentUser.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-700 text-sm md:text-base">
                          {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}.
                          <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-blue-600">{currentUser.schoolName || '-'}</td>
                  <td className="py-3 md:py-4 px-2 md:px-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(currentUser.aiCefrLevel)} border ${isUserCurrent(currentUser.username) ? 'border-blue-300' : ''}`}>
                      {currentUser.aiCefrLevel || 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-right">
                    <div className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-sm font-medium">
                      {formatTime(currentUser.totalSeconds)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {tableUsers.length === 0 && !shouldDisplayCurrentUserSeparately && orderedPodiumUsers.length > 0 && (
          <div className="text-center py-6 text-gray-500">No other users in ranks 4-20.</div>
        )}
      </div>

      {showFixedUserBar && currentUser && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-50">
          <div className="container ml-auto">
            <table className="w-full bg-black">
              <tbody>
                <tr className="bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100">
                  <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-blue-700 w-[60px]">{currentUser.rank !== null ? currentUser.rank : '-'}</td>
                  <td className="py-3 md:py-4 px-2 md:px-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200 mr-2 md:mr-3 overflow-hidden ring-2 ring-blue-500 ring-offset-1 flex-shrink-0">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                          alt={currentUser.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-700 text-sm md:text-base">
                          {currentUser.firstName} {currentUser.lastName?.charAt(0) || ''}.
                          <span className="ml-1 text-xs text-blue-600 font-bold">(You)</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-sm text-blue-600">{currentUser.schoolName || '-'}</td>
                  <td className="py-3 md:py-4 px-2 md:px-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(currentUser.aiCefrLevel)} border ${isUserCurrent(currentUser.username) ? 'border-blue-300' : ''}`}>
                      {currentUser.aiCefrLevel || 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-right">
                    <div className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-sm font-medium">
                      {formatTime(currentUser.totalSeconds)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
