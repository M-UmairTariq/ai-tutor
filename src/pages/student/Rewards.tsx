// // import YellowSplash from "../../assets/images/rewards/yellow-splash.png"
// // import InitiateBadge from "../../assets/images/rewards/inititae-badge.png"

// // const Rewards = () => {
// //   const levelData = [
// //     {
// //       name: 'Initiate',
// //       range: '1-1000',
// //       points: 1000,
// //       badgeImage: '/initiate-badge.png',
// //       splashImage: '/yellow-splash.png',
// //       color: 'green',
// //       isUnlocked: true,
// //       isCurrent: false
// //     },
// //     {
// //       name: 'Apprentice',
// //       range: '1000-2000',
// //       points: 2000,
// //       badgeImage: '/apprentice-badge.png',
// //       splashImage: '/apprentice-green-splash.png',
// //       color: 'green',
// //       isUnlocked: true,
// //       isCurrent: false
// //     },
// //     {
// //       name: 'Strategist',
// //       range: '3000-4000',
// //       points: 4000,
// //       badgeImage: '/strategist-badge.png',
// //       splashImage: '/strategist-teal-splash.png',
// //       color: 'teal',
// //       isUnlocked: true,
// //       isCurrent: true
// //     },
// //     {
// //       name: 'Specialist',
// //       range: '4000-5000',
// //       points: 5000,
// //       badgeImage: '/specialist-badge.png',
// //       splashImage: '/specialist-blue-splash.png',
// //       color: 'blue',
// //       isUnlocked: false,
// //       isCurrent: false
// //     },
// //     {
// //       name: 'Virtuoso',
// //       range: '6000-7000',
// //       points: 7000,
// //       badgeImage: '/virtuoso-badge.png',
// //       splashImage: '/virtuoso-blue-splash.png',
// //       color: 'blue',
// //       isUnlocked: false,
// //       isCurrent: false
// //     },
// //     {
// //       name: 'Mastermind',
// //       range: '7000-8000',
// //       points: 8000,
// //       badgeImage: '/mastermind-badge.png',
// //       splashImage: '/mastermind-purple-splash.png',
// //       color: 'purple',
// //       isUnlocked: false,
// //       isCurrent: false
// //     }
// //   ];

// //   const LevelCard = ({ level}: any) => {
// //     const isLocked = !level.isUnlocked;

// //     return (
// //       <div className={`relative flex flex-col items-center ${level.isCurrent ? 'border-2 border-blue-500 rounded-2xl p-4 bg-blue-50' : ''}`}>
// //         {/* Badge Container */}
// //         <div className="relative mb-4">
// //           {/* Splash Background */}
// //           <div className="relative w-24 h-24 flex items-center justify-center">
// //             <img 
// //             //   src={level.splashImage}
// //             src={YellowSplash}
// //               alt=""
// //               className="absolute inset-0 w-full h-full object-contain"
// //             />
// //             {/* Badge */}
// //             <div className={`relative w-16 h-16 flex items-center justify-center rounded-full ${isLocked ? 'grayscale opacity-50' : ''}`}>
// //               <img 
// //                 src={InitiateBadge}
// //                 alt={level.name}
// //                 className="w-full h-full object-contain"
// //               />
// //               {/* Lock overlay for locked items */}
// //               {isLocked && (
// //                 <div className="absolute inset-0 flex items-center justify-center">
// //                   <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
// //                     <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
// //                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
// //                     </svg>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Level Info */}
// //         <div className="text-center">
// //           <h3 className={`text-lg font-semibold mb-1 ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
// //             {level.name}
// //           </h3>
// //           <div className="flex items-center justify-center mb-2">
// //             <div className={`h-1 w-16 rounded-full ${
// //               level.color === 'green' ? 'bg-green-500' :
// //               level.color === 'teal' ? 'bg-teal-500' :
// //               level.color === 'blue' ? 'bg-blue-500' :
// //               level.color === 'purple' ? 'bg-purple-500' : 'bg-gray-300'
// //             } ${isLocked ? 'opacity-30' : ''}`}></div>
// //           </div>
// //           <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
// //             {level.range}
// //           </p>
// //         </div>

// //         {/* Claim Reward Button - only for current level */}
// //         {level.isCurrent && (
// //           <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
// //             Claim Reward
// //           </button>
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <div className="max-w-7xl mx-auto">

// //         {/* Levels Grid */}
// //         <div className="space-y-8">
// //           {/* First Row - Levels Section */}
// //           <div>
// //             <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// //               {levelData.map((level, index) => (
// //                 <LevelCard key={level.name} level={level} index={index} />
// //               ))}
// //             </div>
// //           </div>

// //           {/* Second Row - Duplicate for demonstration */}
// //           <div>
// //             <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// //               {levelData.map((level, index) => (
// //                 <LevelCard key={`second-${level.name}`} level={{...level, isCurrent: false, isUnlocked: index < 4}} index={index} />
// //               ))}
// //             </div>
// //           </div>

// //           {/* Third Row - Duplicate for demonstration */}
// //           <div>
// //             <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// //               {levelData.map((level, index) => (
// //                 <LevelCard key={`third-${level.name}`} level={{...level, isCurrent: false, isUnlocked: index < 2}} index={index} />
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Stats at bottom */}
// //         <div className="mt-12 flex justify-center">
// //           <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
// //             1512 🏆 964
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Rewards;
// import { useState, useEffect } from 'react';
// import { Trophy, Lock, Star, Calendar, Clock, BookOpen, Gift } from 'lucide-react';
// import apiClient from '@/config/ApiConfig';

// // Import your actual apiClient

// // Temporary mock - replace this with your actual import
// // const apiClient = {
// //   get: async (url) => {
// //     // Mock implementation - remove this when you import your real apiClient
// //     const response = await fetch("https://malamute-content-cougar.ngrok-free.app" + url, {
// //       headers: {
// //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //         'Content-Type': 'application/json',
// //         'ngrok-skip-browser-warning': '69420'
// //       }
// //     });
// //     return { data: await response.json() };
// //   }
// // };

// const Rewards = () => {
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [claimingReward, setClaimingReward] = useState(null);

//   // Level system data
//   const levelData = [
//     {
//       name: 'Initiate',
//       range: '0-100',
//       points: 100,
//       color: 'green',
//       minPoints: 0,
//       maxPoints: 100
//     },
//     {
//       name: 'Apprentice',
//       range: '100-250',
//       points: 250,
//       color: 'green',
//       minPoints: 100,
//       maxPoints: 250
//     },
//     {
//       name: 'Strategist',
//       range: '250-500',
//       points: 500,
//       color: 'teal',
//       minPoints: 250,
//       maxPoints: 500
//     },
//     {
//       name: 'Specialist',
//       range: '500-1000',
//       points: 1000,
//       color: 'blue',
//       minPoints: 500,
//       maxPoints: 1000
//     },
//     {
//       name: 'Virtuoso',
//       range: '1000-2000',
//       points: 2000,
//       color: 'blue',
//       minPoints: 1000,
//       maxPoints: 2000
//     },
//     {
//       name: 'Mastermind',
//       range: '2000+',
//       points: 2000,
//       color: 'purple',
//       minPoints: 2000,
//       maxPoints: Infinity
//     }
//   ];

//   useEffect(() => {
//     fetchAchievements();
//   }, []);

//   const fetchAchievements = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Get user ID from localStorage or your auth system
//       const userId = localStorage.getItem('userId') || '184780e7-a8a4-42ae-b62a-d159f23f059f';

//       const response = await apiClient.get(`/users/${userId}/achievements`);

//       if (response.data.status === 'success') {
//         setAchievements(response.data.data);

//         // Calculate total points from earned achievements
//         const earnedPoints = response.data.data.reduce((total, category) => {
//           return total + category.earned.reduce((catTotal, achievement) => {
//             return catTotal + achievement.pointValue;
//           }, 0);
//         }, 0);

//         setTotalPoints(earnedPoints);
//       } else {
//         setError('Failed to load achievements');
//       }
//     } catch (err) {
//       setError('Failed to load achievements. Please try again.');
//       console.error('Error fetching achievements:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const claimReward = async (achievementId) => {
//     try {
//       setClaimingReward(achievementId);

//       // Implement your claim reward API call here
//       // await apiClient.post(`/api/v1/achievements/${achievementId}/claim`);

//       console.log('Claiming reward for achievement:', achievementId);

//       // Refresh achievements after claiming
//       await fetchAchievements();
//     } catch (err) {
//       console.error('Error claiming reward:', err);
//       setError('Failed to claim reward. Please try again.');
//     } finally {
//       setClaimingReward(null);
//     }
//   };

//   const getCurrentLevel = () => {
//     return levelData.find(level => 
//       totalPoints >= level.minPoints && totalPoints < level.maxPoints
//     ) || levelData[0];
//   };

//   const getNextLevel = () => {
//     const currentLevel = getCurrentLevel();
//     const currentIndex = levelData.indexOf(currentLevel);
//     return currentIndex < levelData.length - 1 ? levelData[currentIndex + 1] : null;
//   };

//   const getProgressToNextLevel = () => {
//     const currentLevel = getCurrentLevel();
//     const nextLevel = getNextLevel();

//     if (!nextLevel) return 100;

//     const progress = ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;
//     return Math.min(progress, 100);
//   };

//   const getCategoryIcon = (category:any) => {
//     switch (category) {
//       case 'Topics':
//         return <BookOpen className="w-5 h-5" />;
//       case 'Usage':
//         return <Clock className="w-5 h-5" />;
//       case 'Streak':
//         return <Calendar className="w-5 h-5" />;
//       default:
//         return <Star className="w-5 h-5" />;
//     }
//   };

//   const LevelCard = ({ level, isActive, isUnlocked }: any) => {
//     return (
//       <div className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
//         isActive 
//           ? 'border-2 border-blue-500 bg-blue-50 shadow-lg scale-105' 
//           : isUnlocked 
//             ? 'border border-gray-200 bg-white shadow-sm' 
//             : 'border border-gray-200 bg-gray-50 opacity-60'
//       }`}>
//         {/* Level Badge */}
//         <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
//           isActive ? 'bg-blue-500' : 
//           isUnlocked ? 
//             level.color === 'green' ? 'bg-green-500' :
//             level.color === 'teal' ? 'bg-teal-500' :
//             level.color === 'blue' ? 'bg-blue-500' :
//             level.color === 'purple' ? 'bg-purple-500' : 'bg-gray-300'
//           : 'bg-gray-300'
//         } ${!isUnlocked ? 'grayscale' : ''}`}>
//           {isUnlocked ? (
//             <Trophy className="w-8 h-8 text-white" />
//           ) : (
//             <Lock className="w-6 h-6 text-white" />
//           )}
//         </div>

//         {/* Level Info */}
//         <div className="text-center">
//           <h3 className={`text-sm font-semibold mb-1 ${
//             isUnlocked ? 'text-gray-800' : 'text-gray-400'
//           }`}>
//             {level.name}
//           </h3>
//           <p className={`text-xs ${
//             isUnlocked ? 'text-gray-600' : 'text-gray-400'
//           }`}>
//             {level.range}
//           </p>
//         </div>

//         {/* Active Level Indicator */}
//         {isActive && (
//           <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//             <Star className="w-4 h-4 text-white fill-current" />
//           </div>
//         )}
//       </div>
//     );
//   };

//   const AchievementCard = ({ achievement, isEarned, category }) => {
//     const canClaim = isEarned && !achievement.rewardClaimed;

//     return (
//       <div className={`relative p-4 rounded-xl border transition-all duration-300 ${
//         isEarned 
//           ? canClaim 
//             ? 'border-green-300 bg-green-50 shadow-md' 
//             : 'border-gray-200 bg-gray-50'
//           : 'border-gray-200 bg-white hover:shadow-md'
//       }`}>
//         {/* Achievement Icon */}
//         <div className="flex items-start gap-3">
//           <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
//             isEarned 
//               ? 'bg-green-100 text-green-600' 
//               : 'bg-gray-100 text-gray-400'
//           }`}>
//             {achievement.iconUrl ? (
//               <img 
//                 src={achievement.iconUrl} 
//                 alt={achievement.name}
//                 className={`w-8 h-8 ${!isEarned ? 'grayscale opacity-50' : ''}`}
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextSibling.style.display = 'block';
//                 }}
//               />
//             ) : null}
//             <div style={{ display: achievement.iconUrl ? 'none' : 'block' }}>
//               {getCategoryIcon(category)}
//             </div>
//           </div>

//           <div className="flex-1">
//             <h4 className={`font-semibold text-sm mb-1 ${
//               isEarned ? 'text-gray-800' : 'text-gray-600'
//             }`}>
//               {achievement.name}
//             </h4>
//             <p className={`text-xs mb-2 ${
//               isEarned ? 'text-gray-600' : 'text-gray-500'
//             }`}>
//               {achievement.description}
//             </p>

//             {/* Points */}
//             <div className="flex items-center gap-2">
//               <span className={`text-xs font-medium px-2 py-1 rounded-full ${
//                 isEarned 
//                   ? 'bg-green-100 text-green-700' 
//                   : 'bg-gray-100 text-gray-600'
//               }`}>
//                 {achievement.pointValue} points
//               </span>

//               {/* Earned Date */}
//               {isEarned && achievement.awardedAt && (
//                 <span className="text-xs text-gray-500">
//                   Earned {new Date(achievement.awardedAt).toLocaleDateString()}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Claims Button */}
//         {canClaim && (
//           <button
//             onClick={() => claimReward(achievement.id)}
//             disabled={claimingReward === achievement.id}
//             className="mt-3 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
//           >
//             {claimingReward === achievement.id ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Claiming...
//               </>
//             ) : (
//               <>
//                 <Gift className="w-4 h-4" />
//                 Claim Reward
//               </>
//             )}
//           </button>
//         )}

//         {/* Earned Badge */}
//         {isEarned && (
//           <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//             <Trophy className="w-4 h-4 text-white" />
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading your achievements...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <p className="text-red-600 mb-4">{error}</p>
//               <button
//                 onClick={fetchAchievements}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentLevel = getCurrentLevel();
//   const nextLevel = getNextLevel();
//   const progress = getProgressToNextLevel();

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards & Achievements</h1>
//           <p className="text-gray-600">Track your progress and unlock rewards</p>
//         </div>

//         {/* Progress Overview */}
//         <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
//               <p className="text-gray-600">Current Level: {currentLevel.name}</p>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
//               <div className="text-sm text-gray-500">Total Points</div>
//             </div>
//           </div>

//           {nextLevel && (
//             <div>
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>{currentLevel.name}</span>
//                 <span>{nextLevel.name}</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div 
//                   className="bg-blue-600 h-3 rounded-full transition-all duration-500"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//               <div className="text-center text-sm text-gray-500 mt-2">
//                 {nextLevel.minPoints - totalPoints} points to next level
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Levels Section */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {levelData.map((level) => (
//               <LevelCard
//                 key={level.name}
//                 level={level}
//                 isActive={level.name === currentLevel.name}
//                 isUnlocked={totalPoints >= level.minPoints}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Achievements Section */}
//         <div className="space-y-8">
//           {achievements.map((category) => (
//             <div key={category.category}>
//               <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//                 {getCategoryIcon(category.category)}
//                 {category.category} Achievements
//                 <span className="text-sm font-normal text-gray-500">
//                   ({category.earned.length} earned, {category.available.length} available)
//                 </span>
//               </h2>

//               {/* Earned Achievements */}
//               {category.earned.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="text-lg font-medium text-green-700 mb-4">Earned</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {category.earned.map((achievement) => (
//                       <AchievementCard
//                         key={achievement.id}
//                         achievement={achievement}
//                         isEarned={true}
//                         category={category.category}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Available Achievements */}
//               {category.available.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-700 mb-4">Available</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {category.available.map((achievement) => (
//                       <AchievementCard
//                         key={achievement.id}
//                         achievement={achievement}
//                         isEarned={false}
//                         category={category.category}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Rewards;

import { useState, useEffect } from 'react';
import { Trophy, Lock, Star, Calendar, Clock, BookOpen, Gift } from 'lucide-react';
import apiClient from '@/config/ApiConfig'; // Assuming you have this configured

// --- TypeScript Interfaces ---

// Describes the structure of a single level
interface Level {
  name: string;
  range: string;
  points: number;
  color: 'green' | 'teal' | 'blue' | 'purple';
  minPoints: number;
  maxPoints: number;
}

// Describes a single achievement
interface Achievement {
  id: string; // This is used as the unique 'key' for the API call
  name: string;
  description: string;
  pointValue: number;
  rewardClaimed: boolean;
  awardedAt?: string; // ISO date string
  iconUrl?: string;
}

// Describes the categorized data structure from the achievements API
interface AchievementCategory {
  category: string;
  earned: Achievement[];
  available: Achievement[];
}

// --- Component Props ---

interface LevelCardProps {
  level: Level;
  isActive: boolean;
  isUnlocked: boolean;
}

interface AchievementCardProps {
  achievement: Achievement;
  isEarned: boolean;
  category: string;
}

// --- Main Component ---

const Rewards = (): JSX.Element => {
  const [achievements, setAchievements] = useState<AchievementCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [claimingReward, setClaimingReward] = useState<string | null>(null); // Holds the ID of the achievement being claimed

  // Static data defining the level structure
  const levelData: Level[] = [
    { name: 'Initiate', range: '0-100', points: 100, color: 'green', minPoints: 0, maxPoints: 100 },
    { name: 'Apprentice', range: '100-250', points: 250, color: 'green', minPoints: 100, maxPoints: 250 },
    { name: 'Strategist', range: '250-500', points: 500, color: 'teal', minPoints: 250, maxPoints: 500 },
    { name: 'Specialist', range: '500-1000', points: 1000, color: 'blue', minPoints: 500, maxPoints: 1000 },
    { name: 'Virtuoso', range: '1000-2000', points: 2000, color: 'blue', minPoints: 1000, maxPoints: 2000 },
    { name: 'Mastermind', range: '2000+', points: 2000, color: 'purple', minPoints: 2000, maxPoints: Infinity }
  ];

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);

      const aiTutorUserString = localStorage.getItem('AiTutorUser');
      console.log(aiTutorUserString, "aiTutor");

      if (!aiTutorUserString) return;

      const aiTutorUser = JSON.parse(aiTutorUserString); // ✅ This is your real object now
      const userId = aiTutorUser.id;
      console.log(userId, aiTutorUser);
      if (!userId) {
        setError("User not found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await apiClient.get<{ status: string; data: AchievementCategory[] }>(`/users/${userId}/achievements`);

      if (response.data.status === 'success') {
        setAchievements(response.data.data);

        const earnedPoints = response.data.data.reduce((total, category) => {
          return total + category.earned.reduce((catTotal, ach) => catTotal + ach.pointValue, 0);
        }, 0);

        setTotalPoints(earnedPoints);
      } else {
        setError('Failed to load achievements');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load achievements. Please try again.');
      console.error('Error fetching achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the API call to claim a reward for an earned achievement.
   * @param achievementKey - The unique key (ID) of the achievement.
   */
  const claimReward = async (achievementKey: string) => {
    try {
      setClaimingReward(achievementKey);
      setError(null);

      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError("Cannot claim reward: User not found.");
        return;
      }

      // Call the POST endpoint as per the API documentation
      await apiClient.post(`/api/v1/users/${userId}/achievements/${achievementKey}/claim`);

      // On success, refresh the entire achievement list to reflect the change
      await fetchAchievements();

    } catch (err: any) {
      // Set the error message from the API response to display it in the UI
      const errorMessage = err.response?.data?.message || 'Failed to claim reward. Please try again.';
      setError(errorMessage);
      console.error('Error claiming reward:', err);
    } finally {
      // Stop the loading state for this specific achievement
      setClaimingReward(null);
    }
  };

  const getCurrentLevel = (): Level => {
    return levelData.find(level => totalPoints >= level.minPoints && totalPoints < level.maxPoints) || levelData[0];
  };

  const getNextLevel = (): Level | null => {
    const currentLevel = getCurrentLevel();
    const currentIndex = levelData.indexOf(currentLevel);
    return currentIndex < levelData.length - 1 ? levelData[currentIndex + 1] : null;
  };

  const getProgressToNextLevel = (): number => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();

    if (!nextLevel) return 100;

    const progress = ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;
    return Math.min(progress, 100);
  };

  const getCategoryIcon = (category: string): JSX.Element => {
    switch (category) {
      case 'Topics': return <BookOpen className="w-5 h-5" />;
      case 'Usage': return <Clock className="w-5 h-5" />;
      case 'Streak': return <Calendar className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const LevelCard = ({ level, isActive, isUnlocked }: LevelCardProps): JSX.Element => {
    return (
      <div className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${isActive ? 'border-2 border-blue-500 bg-blue-50 shadow-lg scale-105'
          : isUnlocked ? 'border border-gray-200 bg-white shadow-sm'
            : 'border border-gray-200 bg-gray-50 opacity-60'
        }`}>
        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isActive ? 'bg-blue-500' :
            isUnlocked ?
              level.color === 'green' ? 'bg-green-500' :
                level.color === 'teal' ? 'bg-teal-500' :
                  level.color === 'blue' ? 'bg-blue-500' :
                    level.color === 'purple' ? 'bg-purple-500' : 'bg-gray-300'
              : 'bg-gray-300'
          } ${!isUnlocked ? 'grayscale' : ''}`}>
          {isUnlocked ? <Trophy className="w-8 h-8 text-white" /> : <Lock className="w-6 h-6 text-white" />}
        </div>
        <div className="text-center">
          <h3 className={`text-sm font-semibold mb-1 ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>{level.name}</h3>
          <p className={`text-xs ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>{level.range}</p>
        </div>
        {isActive && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-current" />
          </div>
        )}
      </div>
    );
  };

  const AchievementCard = ({ achievement, isEarned, category }: AchievementCardProps): JSX.Element => {
    // A reward can only be claimed if the achievement is earned AND the reward has not been claimed yet.
    const canClaim = isEarned && !achievement.rewardClaimed;

    return (
      <div className={`relative p-4 rounded-xl border transition-all duration-300 ${isEarned ? (canClaim ? 'border-green-300 bg-green-50 shadow-md' : 'border-gray-200 bg-gray-50')
          : 'border-gray-200 bg-white hover:shadow-md'
        }`}>
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isEarned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {getCategoryIcon(category)}
          </div>
          <div className="flex-1">
            <h4 className={`font-semibold text-sm mb-1 ${isEarned ? 'text-gray-800' : 'text-gray-600'}`}>{achievement.name}</h4>
            <p className={`text-xs mb-2 ${isEarned ? 'text-gray-600' : 'text-gray-500'}`}>{achievement.description}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${isEarned ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {achievement.pointValue} points
              </span>
              {isEarned && achievement.awardedAt && (
                <span className="text-xs text-gray-500">
                  Earned {new Date(achievement.awardedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {canClaim && (
          <button
            onClick={() => claimReward(achievement.id)}
            disabled={claimingReward === achievement.id}
            className="mt-3 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {claimingReward === achievement.id ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Claiming...
              </>
            ) : (
              <>
                <Gift className="w-4 h-4" />
                Claim Reward
              </>
            )}
          </button>
        )}

        {isEarned && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your achievements...</p>
        </div>
      </div>
    );
  }

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progress = getProgressToNextLevel();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards & Achievements</h1>
          <p className="text-gray-600">Track your progress, earn points, and claim rewards.</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
              <p className="text-gray-600">Current Level: {currentLevel.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
              <div className="text-sm text-gray-500">Total Points</div>
            </div>
          </div>
          {nextLevel && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{currentLevel.name}</span>
                <span>{nextLevel.name}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-center text-sm text-gray-500 mt-2">
                {nextLevel.minPoints - totalPoints} points to next level
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {levelData.map((level) => (
              <LevelCard key={level.name} level={level} isActive={level.name === currentLevel.name} isUnlocked={totalPoints >= level.minPoints} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {achievements.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                {getCategoryIcon(category.category)}
                {category.category} Achievements
                <span className="text-sm font-normal text-gray-500">
                  ({category.earned.length} earned, {category.available.length} available)
                </span>
              </h2>
              {category.earned.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-green-700 mb-4">Earned</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.earned.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} isEarned={true} category={category.category} />
                    ))}
                  </div>
                </div>
              )}
              {category.available.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Available</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.available.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} isEarned={false} category={category.category} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;