import { useState, useEffect } from "react";
import {
  Trophy,
  Lock,
  Star,
  Calendar,
  Clock,
  BookOpen,
  Gift,
} from "lucide-react";
import apiClient from "@/config/ApiConfig"; // Make sure this path is correct for your project

// Describes the structure of a single level
interface Level {
  name: string;
  range: string;
  points: number;
  color: "green" | "teal" | "blue" | "purple";
  minPoints: number;
  maxPoints: number;
}

// Describes a single achievement from your API
interface Achievement {
  id: string;
  key: string;
  name: string;
  description: string;
  pointValue: number;
  rewardClaimed: boolean;
  awardedAt?: string; // ISO date string
  iconUrl?: string; // The URL for the achievement's icon
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
}

// --- Main Rewards Component ---

const Rewards = (): JSX.Element => {
  const [achievements, setAchievements] = useState<AchievementCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [claimingReward, setClaimingReward] = useState<string | null>(null);

  // Static data defining the level structure
  const levelData: Level[] = [
    {
      name: "Initiate",
      range: "0-100",
      points: 100,
      color: "green",
      minPoints: 0,
      maxPoints: 100,
    },
    {
      name: "Apprentice",
      range: "100-250",
      points: 250,
      color: "green",
      minPoints: 100,
      maxPoints: 250,
    },
    {
      name: "Strategist",
      range: "250-500",
      points: 500,
      color: "teal",
      minPoints: 250,
      maxPoints: 500,
    },
    {
      name: "Specialist",
      range: "500-1000",
      points: 1000,
      color: "blue",
      minPoints: 500,
      maxPoints: 1000,
    },
    {
      name: "Virtuoso",
      range: "1000-2000",
      points: 2000,
      color: "blue",
      minPoints: 1000,
      maxPoints: 2000,
    },
    {
      name: "Mastermind",
      range: "2000+",
      points: 2000,
      color: "purple",
      minPoints: 2000,
      maxPoints: Infinity,
    },
  ];

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      const aiTutorUserString = localStorage.getItem("AiTutorUser");
      if (!aiTutorUserString) {
        setError("User not found. Please log in.");
        setLoading(false);
        return;
      }
      const aiTutorUser = JSON.parse(aiTutorUserString);
      const userId = aiTutorUser.id;
      if (!userId) {
        setError("User not found. Please log in again.");
        setLoading(false);
        return;
      }
      const response = await apiClient.get<{
        status: string;
        data: AchievementCategory[];
      }>(`/users/${userId}/achievements`);
      if (response.data.status === "success") {
        setAchievements(response.data.data);
        const earnedPoints = response.data.data.reduce((total, category) => {
          return (
            total +
            category.earned.reduce(
              (catTotal, ach) => catTotal + ach.pointValue,
              0
            )
          );
        }, 0);
        setTotalPoints(earnedPoints);
      } else {
        setError("Failed to load achievements");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to load achievements. Please try again."
      );
      console.error("Error fetching achievements:", err);
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async (achievementKey: string) => {
    try {
      setClaimingReward(achievementKey);
      setError(null);
      const aiTutorUserString = localStorage.getItem("AiTutorUser");
      if (!aiTutorUserString) {
        setError("Cannot claim reward: User not found.");
        return;
      }
      const aiTutorUser = JSON.parse(aiTutorUserString);
      const userId = aiTutorUser.id;
      if (!userId) {
        setError("Cannot claim reward: User not found.");
        return;
      }
      await apiClient.post(
        `/users/${userId}/achievements/${achievementKey}/claim`
      );
      await fetchAchievements();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to claim reward. Please try again.";
      setError(errorMessage);
      console.error("Error claiming reward:", err);
    } finally {
      setClaimingReward(null);
    }
  };

  const getCurrentLevel = (): Level => {
    return (
      levelData.find(
        (level) =>
          totalPoints >= level.minPoints && totalPoints < level.maxPoints
      ) || levelData[0]
    );
  };

  const getNextLevel = (): Level | null => {
    const currentLevel = getCurrentLevel();
    const currentIndex = levelData.indexOf(currentLevel);
    return currentIndex < levelData.length - 1
      ? levelData[currentIndex + 1]
      : null;
  };

  const getProgressToNextLevel = (): number => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    if (!nextLevel) return 100;
    const progress =
      ((totalPoints - currentLevel.minPoints) /
        (nextLevel.minPoints - currentLevel.minPoints)) *
      100;
    return Math.min(progress, 100);
  };

  // --- Reusable Sub-Components ---

  // const LevelCard = ({ level, isActive, isUnlocked }: LevelCardProps): JSX.Element => (
  //   <div className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${isActive ? 'border-2 border-blue-500 bg-blue-50 shadow-lg scale-105' : isUnlocked ? 'border border-gray-200 bg-white shadow-sm' : 'border border-gray-200 bg-gray-50 opacity-60'}`}>
  //     <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isActive ? 'bg-blue-500' : isUnlocked ? (level.color === 'green' ? 'bg-green-500' : level.color === 'teal' ? 'bg-teal-500' : level.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500') : 'bg-gray-300'} ${!isUnlocked ? 'grayscale' : ''}`}>
  //       {isUnlocked ? <Trophy className="w-8 h-8 text-white" /> : <Lock className="w-6 h-6 text-white" />}
  //     </div>
  //     <div className="text-center">
  //       <h3 className={`text-sm font-semibold mb-1 ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>{level.name}</h3>
  //       <p className={`text-xs ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>{level.range}</p>
  //     </div>
  //     {isActive && <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><Star className="w-4 h-4 text-white fill-current" /></div>}
  //   </div>
  // );

  const AchievementCard = ({
    achievement,
    isEarned,
  }: AchievementCardProps): JSX.Element => {
    const canClaim = isEarned && !achievement.rewardClaimed;

    return (
      <div
        className={`relative p-4 rounded-xl border transition-all duration-300 ${
          isEarned
            ? canClaim
              ? "border-blue-300 bg-blue-200 shadow-md"
              : "border-gray-200 bg-gray-50"
            : "border-gray-200 bg-white hover:border-blue-500"
        }`}
      >
        <div
          className={`relative flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${
            !isEarned ? "grayscale" : ""
          }`}
        >
          {achievement.iconUrl ? (
            <img
              src={achievement.iconUrl}
              alt={achievement.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <Star
              className={`w-8 h-8 ${
                isEarned ? "text-blue-600" : "text-gray-400"
              }`}
            />
          )}
        </div>

        <div className="flex-1 text-center">
          <h4
            className={`font-semibold text-sm mb-1 ${
              isEarned ? "text-gray-800" : "text-gray-600"
            }`}
          >
            {achievement.name}
          </h4>
          <p
            className={`text-xs mb-2 ${
              isEarned ? "text-gray-600" : "text-gray-500"
            }`}
          >
            {achievement.description}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                isEarned
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {achievement.pointValue} points
            </span>
            {isEarned && achievement.awardedAt && (
              <span className="text-xs text-gray-500">
                Earned {new Date(achievement.awardedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {canClaim && (
          <>
            <div className="absolute inset-0 backdrop-blur-[2.5px] rounded-xl"></div>

            <button
              onClick={() => claimReward(achievement.key)}
              disabled={claimingReward === achievement.key}
              className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-2 shadow-md w-32 h-10 drop-shadow-sm"
            >
              {claimingReward === achievement.key ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Claiming...
                </>
              ) : (
                <>Claim Reward</>
              )}
            </button>
          </>
        )}

        {isEarned && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    );
  };

  // --- Main Render Logic ---

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

  const categoryIcons: { [key: string]: JSX.Element } = {
    Topics: <BookOpen className="w-5 h-5" />,
    Usage: <Clock className="w-5 h-5" />,
    Streak: <Calendar className="w-5 h-5" />,
    Default: <Star className="w-5 h-5" />,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards & Achievements</h1>
          <p className="text-gray-600">Track your progress, earn points, and claim rewards.</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <section className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
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
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {levelData.map((level) => (
              <LevelCard key={level.name} level={level} isActive={level.name === currentLevel.name} isUnlocked={totalPoints >= level.minPoints} />
            ))}
          </div>
        </section> */}

        <main className="space-y-8">
          {achievements.map((category) => (
            <section key={category.category}>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                {categoryIcons[category.category] || categoryIcons.Default}
                {category.category} Achievements
                <span className="text-sm font-normal text-gray-500">
                  ({category.earned.length} earned, {category.available.length}{" "}
                  available)
                </span>
              </h2>
              {(category.earned.length > 0 ||
                category.available.length > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                  {category.earned.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      isEarned={true}
                    />
                  ))}
                  {category.available.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      isEarned={false}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Rewards;
