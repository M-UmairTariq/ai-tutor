// import React, { useEffect, useState } from 'react';
// import { Crown } from "lucide-react";
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// // You'll need to implement this hook in your project
// // Example implementation:
// // export const useAppDispatch = () => useDispatch<AppDispatch>();
// // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// interface LeaderboardProps {
//   userId?: string;
// }

// const Leaderboard: React.FC<LeaderboardProps> = ({ userId = "84cae2a4-63bf-4dfb-8d38-12f388104d09" }) => {
//   const dispatch = useAppDispatch();
//   const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);
//   console.log(leaderboard, currentUser, isLoading, error, "ALL")
  
//   // Filter states
//   const [school, setSchool] = useState<string>('');
//   const [level, setLevel] = useState<string>('');
//   const [section, setSection] = useState<string>('');
//   const [ranking, setRanking] = useState<string>('');
//   if(!leaderboard) return (<div>NOT FEDINCED</div>)
  
//   // Get unique schools, levels, and sections for filters
//   const schools = [...new Set(leaderboard.map(user => user.schoolName))];
//   const levels = [...new Set(leaderboard.map(user => user.cefrLevel))];
//   const sections = [...new Set(leaderboard.map(user => user.class))];

//   // For client-side ranking filtering (since backend doesn't handle this)
//   const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);
  
//   // Get top 3 users for the podium display
//   const topUsers = leaderboard.filter(user => user.rank <= 3)
//     .sort((a: any, b: any) => a.rank - b.rank);
  
//   // Get remaining users for the table
//   const tableUsers = filteredUsers.filter(user => user.rank > 3)
//     .sort((a, b) => a.rank - b.rank);

//   // Fetch leaderboard data on component mount
//   useEffect(() => {
//     fetchLeaderboardData();
//   }, []);
  
//   // Fetch data when filters change
//   useEffect(() => {
//     // We don't want to fetch on the initial render since that's handled by the first useEffect
//     if (leaderboard.length > 0) {
//       fetchLeaderboardData();
//     }
//   }, [school, level, section]);
  
//   // Update filtered users for ranking filter (client-side)
//   useEffect(() => {
//     let filtered = [...leaderboard];
    
//     if (ranking) {
//       if (ranking === "top10") {
//         filtered = filtered.filter(user => user.rank <= 10);
//       } else if (ranking === "top20") {
//         filtered = filtered.filter(user => user.rank <= 20);
//       }
//     }
    
//     setFilteredUsers(filtered);
//   }, [leaderboard, ranking]);
  
//   // Fetch leaderboard data with filters
//   const fetchLeaderboardData = () => {
//     const filters: LeaderboardFilters = {
//       userId: userId
//     };
    
//     if (school) {
//       filters.school = school;
//     }
    
//     if (level) {
//       filters.cefrLevel = level;
//     }
    
//     if (section) {
//       filters.class = section;
//     }
    
//     dispatch(fetchLeaderboard(filters));
//   };

//   // Apply filters
//   const handleApplyFilter = () => {
//     fetchLeaderboardData();
//   };

//   // Reorder top users for display (2nd, 1st, 3rd)
//   const getOrderedTopUsers = () => {
//     if (topUsers.length < 3) return topUsers;
    
//     const first = topUsers.find(user => user.rank === 1);
//     const second = topUsers.find(user => user.rank === 2);
//     const third = topUsers.find(user => user.rank === 3);
    
//     return [second, first, third].filter(Boolean) as LeaderboardUser[];
//   };

//   // Get crown color based on rank
//   const getCrownColor = (rank: number) => {
//     if (rank === 1) return "text-yellow-400";
//     if (rank === 2) return "text-gray-400";
//     if (rank === 3) return "text-amber-600";
//     return "text-gray-400";
//   };

//   // Get circle color based on rank
//   const getCircleColor = (rank: number) => {
//     if (rank === 1) return "bg-yellow-100 border-yellow-400";
//     if (rank === 2) return "bg-gray-100 border-gray-400";
//     if (rank === 3) return "bg-amber-100 border-amber-600";
//     return "bg-gray-100 border-gray-300";
//   };

//   // Get badge color for CEFR level
//   const getLevelBadgeColor = (level: string) => {
//     const levels: Record<string, string> = {
//       'A1': 'bg-green-100 text-green-800',
//       'A2': 'bg-blue-100 text-blue-800',
//       'B1': 'bg-purple-100 text-purple-800',
//       'B2': 'bg-pink-100 text-pink-800',
//       'C1': 'bg-yellow-100 text-yellow-800',
//       'C2': 'bg-red-100 text-red-800',
//     };
    
//     return levels[level] || 'bg-gray-100 text-gray-800';
//   };

//   // Determine if a user is the current user
//   const isCurrentUser = (username: string) => {
//     return currentUser?.username === username;
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="mx-auto">
//         <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <Skeleton className="h-6 w-24 mb-6" />
//             <div className="space-y-4">
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//           </div>
//           <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex justify-center mb-10 gap-6">
//               <Skeleton className="h-32 w-24" />
//               <Skeleton className="h-40 w-24" />
//               <Skeleton className="h-32 w-24" />
//             </div>
//             <Skeleton className="h-6 w-full mb-4" />
//             <Skeleton className="h-16 w-full mb-2" />
//             <Skeleton className="h-16 w-full mb-2" />
//             <Skeleton className="h-16 w-full mb-2" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <div className="mx-auto">
//         <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
//         <div className="bg-red-100 p-4 rounded-lg text-red-800">
//           Failed to load leaderboard: {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto">
//       {/* <h1 className="text-2xl font-bold mb-8">Leader Board</h1> */}
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Filter Section */}
//         {/* <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-bold mb-6">Filter</h2>
          
//           <div className="space-y-4">
//             <div className="w-full">
//               <Select value={school} onValueChange={setSchool}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="School" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="All">All Schools</SelectItem>
//                   {schools.map((school) => (
//                     <SelectItem key={school} value={school}>{school}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div className="w-full">
//               <Select value={level} onValueChange={setLevel}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="All">All Levels</SelectItem>
//                   {levels.map((level) => (
//                     <SelectItem key={level} value={level}>{level}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div className="w-full">
//               <Select value={ranking} onValueChange={setRanking}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Ranking" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="All">All Rankings</SelectItem>
//                   <SelectItem value="top10">Top 10</SelectItem>
//                   <SelectItem value="top20">Top 20</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div className="w-full">
//               <Select value={section} onValueChange={setSection}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Section" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="All">All Sections</SelectItem>
//                   {sections.map((section) => (
//                     <SelectItem key={section} value={section}>Section {section}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <Button 
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
//               onClick={handleApplyFilter}
//             >
//               Apply Filter
//             </Button>
//           </div>
//         </div> */}
        
//         {/* Main Content */}
//         <div className="md:col-span-4 bg-white p-6 rounded-lg shadow-sm">
//           {/* Top 3 Users */}
//           <div className="flex flex-wrap justify-center mb-10 gap-6">
//             {getOrderedTopUsers().map((user: any, index: number) => (
//               <div 
//                 key={user.username} 
//                 className={`flex flex-col items-center ${index === 1 ? 'mt-0' : index == 2 ? 'mt-8' : "mt-4"}`}
//               >
//                 <div className="relative">
//                   {user.rank === 1 && (
//                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
//                       <Crown className="w-10 h-10 text-yellow-400" />
//                     </div>
//                   )}
//                   <div className={`relative w-24 h-24 rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)}`}>
//                   {/* <div className={`relative ${index === 1 ? "w-36 h-36": index == 2 ? "w-28 h-28" : "w-32 h-32"} rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)}`}> */}
//                     {/* Using placeholder avatar - replace with actual user avatars if available */}
//                     <img 
//                       src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
//                       alt={user.firstName} 
//                       className="w-full h-full object-cover" 
//                     />
//                     <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center font-bold text-white">
//                       <span className={`w-full h-full flex items-center justify-center rounded-full ${
//                         user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
//                       }`}>
//                         {user.rank}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2 text-center">
//                   <h3 className="font-semibold">
//                     {user.firstName} {user.lastName} 
//                     {isCurrentUser(user.username) && (
//                       <span className="ml-1 text-xs text-blue-600">(You)</span>
//                     )}
//                   </h3>
//                   <div className="flex items-center justify-center text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       {formatTime(user.totalSeconds)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Table for remaining users */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-gray-500 border-b">
//                   <th className="py-3 px-2">Rank</th>
//                   <th className="py-3 px-2">Student</th>
//                   <th className="py-3 px-2">School</th>
//                   <th className="py-3 px-2">Section</th>
//                   <th className="py-3 px-2">Level</th>
//                   <th className="py-3 px-2">Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableUsers.map((user) => (
//                   <tr 
//                     key={user.username} 
//                     className={`border-b hover:bg-gray-50 ${isCurrentUser(user.username) ? 'bg-blue-50' : ''}`}
//                   >
//                     <td className="py-4 px-2 font-medium">{user.rank}</td>
//                     <td className="py-4 px-2">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
//                           <img 
//                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
//                             alt={user.firstName} 
//                             className="w-full h-full object-cover" 
//                           />
//                         </div>
//                         <div>
//                           <div className="font-medium">
//                             {user.firstName} {user.lastName}
//                             {isCurrentUser(user.username) && (
//                               <span className="ml-1 text-xs text-blue-600">(You)</span>
//                             )}
//                           </div>
//                           <div className="text-xs text-blue-600">View Profile →</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-2">{user.schoolName}</td>
//                     <td className="py-4 px-2">{user.class}</td>
//                     <td className="py-4 px-2">
//                       <div className="flex items-center">
//                         <span className={`flex items-center justify-center px-2 py-1 rounded-full text-xs ${getLevelBadgeColor(user.cefrLevel)}`}>
//                           {user.cefrLevel}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-2">
//                       <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                         {formatTime(user.totalSeconds)}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {tableUsers.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="py-4 px-2 text-center text-gray-500">
//                       No users match the current filters
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Type check for component
// export default Leaderboard as React.FC<LeaderboardProps>;
import React, { useEffect, useState } from 'react';
import { Crown } from "lucide-react";
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchLeaderboard, formatTime, LeaderboardFilters, LeaderboardUser } from '@/redux/slices/leaderboardSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface LeaderboardProps {
  userId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ userId = "84cae2a4-63bf-4dfb-8d38-12f388104d09" }) => {
  const dispatch = useAppDispatch();
  const { leaderboard, currentUser, isLoading, error } = useAppSelector(state => state.leaderboard);
  console.log(leaderboard, currentUser, isLoading, error, "ALL")

  // Commented out filter states
  // const [school, setSchool] = useState<string>('');
  // const [level, setLevel] = useState<string>('');
  // const [section, setSection] = useState<string>('');
  // const [ranking, setRanking] = useState<string>('');

  if(!leaderboard) return (<div>NOT FEDINCED</div>)

  // Get unique schools, levels, and sections for filters
  // const schools = [...new Set(leaderboard.map(user => user.schoolName))];
  // const levels = [...new Set(leaderboard.map(user => user.cefrLevel))];
  // const sections = [...new Set(leaderboard.map(user => user.class))];

  // For client-side ranking filtering (since backend doesn't handle this)
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);

  // Get top 3 users for the podium display
  const topUsers = leaderboard.filter(user => user.rank <= 3)
    .sort((a: any, b: any) => a.rank - b.rank);

  // Get remaining users for the table
  const tableUsers = filteredUsers.filter(user => user.rank > 3)
    .sort((a, b) => a.rank - b.rank);

  // Fetch leaderboard data on component mount
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  // Commented out fetch data when filters change
  // useEffect(() => {
  //   // We don't want to fetch on the initial render since that's handled by the first useEffect
  //   if (leaderboard.length > 0) {
  //     fetchLeaderboardData();
  //   }
  // }, [school, level, section]);

  // Update filtered users for ranking filter (client-side)
  useEffect(() => {
    let filtered = [...leaderboard];

    // Commented out ranking filter
    // if (ranking) {
    //   if (ranking === "top10") {
    //     filtered = filtered.filter(user => user.rank <= 10);
    //   } else if (ranking === "top20") {
    //     filtered = filtered.filter(user => user.rank <= 20);
    //   }
    // }

    setFilteredUsers(filtered);
  }, [leaderboard]);

  // Fetch leaderboard data with filters
  const fetchLeaderboardData = () => {
    const filters: LeaderboardFilters = {
      userId: userId
    };

    // Commented out school filter
    // if (school) {
    //   filters.school = school;
    // }

    // Commented out level filter
    // if (level) {
    //   filters.cefrLevel = level;
    // }

    // Commented out section filter
    // if (section) {
    //   filters.class = section;
    // }

    dispatch(fetchLeaderboard(filters));
  };

  // Commented out apply filters
  // const handleApplyFilter = () => {
  //   fetchLeaderboardData();
  // };

  // Reorder top users for display (2nd, 1st, 3rd)
  const getOrderedTopUsers = () => {
    if (topUsers.length < 3) return topUsers;

    const first = topUsers.find(user => user.rank === 1);
    const second = topUsers.find(user => user.rank === 2);
    const third = topUsers.find(user => user.rank === 3);

    return [second, first, third].filter(Boolean) as LeaderboardUser[];
  };

  // // Get crown color based on rank
  // const getCrownColor = (rank: number) => {
  //   if (rank === 1) return "text-yellow-400";
  //   if (rank === 2) return "text-gray-400";
  //   if (rank === 3) return "text-amber-600";
  //   return "text-gray-400";
  // };

  // Get circle color based on rank
  const getCircleColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 border-yellow-400";
    if (rank === 2) return "bg-gray-100 border-gray-400";
    if (rank === 3) return "bg-amber-100 border-amber-600";
    return "bg-gray-100 border-gray-300";
  };

  // Get badge color for CEFR level
  const getLevelBadgeColor = (level: string) => {
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

  // Determine if a user is the current user
  const isCurrentUser = (username: string) => {
    return currentUser?.username === username;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Skeleton className="h-6 w-24 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-10 gap-6">
              <Skeleton className="h-32 w-24" />
              <Skeleton className="h-40 w-24" />
              <Skeleton className="h-32 w-24" />
            </div>
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-16 w-full mb-2" />
            <Skeleton className="h-16 w-full mb-2" />
            <Skeleton className="h-16 w-full mb-2" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-8">Leader Board</h1>
        <div className="bg-red-100 p-4 rounded-lg text-red-800">
          Failed to load leaderboard: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {/* Commented out filter section */}
      {/* <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6">Filter</h2>

        <div className="space-y-4">
          <div className="w-full">
            <Select value={school} onValueChange={setSchool}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Schools</SelectItem>
                {schools.map((school) => (
                  <SelectItem key={school} value={school}>{school}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Select value={ranking} onValueChange={setRanking}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ranking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Rankings</SelectItem>
                <SelectItem value="top10">Top 10</SelectItem>
                <SelectItem value="top20">Top 20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sections</SelectItem>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>Section {section}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            onClick={handleApplyFilter}
          >
            Apply Filter
          </Button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="md:col-span-4 bg-white p-6 rounded-lg shadow-sm">
        {/* Top 3 Users */}
        <div className="flex flex-wrap justify-center mb-10 gap-6">
          {getOrderedTopUsers().map((user: any, index: number) => (
            <div
              key={user.username}
              className={`flex flex-col items-center ${index === 1 ? 'mt-0' : index == 2 ? 'mt-8' : "mt-4"}`}
            >
              <div className="relative">
                {user.rank === 1 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-10 h-10 text-yellow-400" />
                  </div>
                )}
                <div className={`relative w-24 h-24 rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)}`}>
                {/* <div className={`relative ${index === 1 ? "w-36 h-36": index == 2 ? "w-28 h-28" : "w-32 h-32"} rounded-full border-4 overflow-hidden ${getCircleColor(user.rank)}`}> */}
                  {/* Using placeholder avatar - replace with actual user avatars if available */}
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                    alt={user.firstName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center font-bold text-white">
                    <span className={`w-full h-full flex items-center justify-center rounded-full ${
                      user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
                    }`}>
                      {user.rank}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                  {isCurrentUser(user.username) && (
                    <span className="ml-1 text-xs text-blue-600">(You)</span>
                  )}
                </h3>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTime(user.totalSeconds)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table for remaining users */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-2">Rank</th>
                <th className="py-3 px-2">Student</th>
                <th className="py-3 px-2">School</th>
                <th className="py-3 px-2">Section</th>
                <th className="py-3 px-2">Level</th>
                <th className="py-3 px-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {tableUsers.map((user) => (
                <tr
                  key={user.username}
                  className={`border-b hover:bg-gray-50 ${isCurrentUser(user.username) ? 'bg-blue-50' : ''}`}
                >
                  <td className="py-4 px-2 font-medium">{user.rank}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                          alt={user.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                          {isCurrentUser(user.username) && (
                            <span className="ml-1 text-xs text-blue-600">(You)</span>
                          )}
                        </div>
                        <div className="text-xs text-blue-600">View Profile →</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">{user.schoolName}</td>
                  <td className="py-4 px-2">{user.class}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center">
                      <span className={`flex items-center justify-center px-2 py-1 rounded-full text-xs ${getLevelBadgeColor(user.cefrLevel)}`}>
                        {user.cefrLevel}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {formatTime(user.totalSeconds)}
                    </div>
                  </td>
                </tr>
              ))}
              {tableUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 px-2 text-center text-gray-500">
                    No users match the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Type check for component
export default Leaderboard as React.FC<LeaderboardProps>;
