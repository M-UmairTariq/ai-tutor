import YellowSplash from "../../assets/images/rewards/yellow-splash.png"
import InitiateBadge from "../../assets/images/rewards/inititae-badge.png"

const Rewards = () => {
  const levelData = [
    {
      name: 'Initiate',
      range: '1-1000',
      points: 1000,
      badgeImage: '/initiate-badge.png',
      splashImage: '/yellow-splash.png',
      color: 'green',
      isUnlocked: true,
      isCurrent: false
    },
    {
      name: 'Apprentice',
      range: '1000-2000',
      points: 2000,
      badgeImage: '/apprentice-badge.png',
      splashImage: '/apprentice-green-splash.png',
      color: 'green',
      isUnlocked: true,
      isCurrent: false
    },
    {
      name: 'Strategist',
      range: '3000-4000',
      points: 4000,
      badgeImage: '/strategist-badge.png',
      splashImage: '/strategist-teal-splash.png',
      color: 'teal',
      isUnlocked: true,
      isCurrent: true
    },
    {
      name: 'Specialist',
      range: '4000-5000',
      points: 5000,
      badgeImage: '/specialist-badge.png',
      splashImage: '/specialist-blue-splash.png',
      color: 'blue',
      isUnlocked: false,
      isCurrent: false
    },
    {
      name: 'Virtuoso',
      range: '6000-7000',
      points: 7000,
      badgeImage: '/virtuoso-badge.png',
      splashImage: '/virtuoso-blue-splash.png',
      color: 'blue',
      isUnlocked: false,
      isCurrent: false
    },
    {
      name: 'Mastermind',
      range: '7000-8000',
      points: 8000,
      badgeImage: '/mastermind-badge.png',
      splashImage: '/mastermind-purple-splash.png',
      color: 'purple',
      isUnlocked: false,
      isCurrent: false
    }
  ];

  const LevelCard = ({ level}: any) => {
    const isLocked = !level.isUnlocked;
    
    return (
      <div className={`relative flex flex-col items-center ${level.isCurrent ? 'border-2 border-blue-500 rounded-2xl p-4 bg-blue-50' : ''}`}>
        {/* Badge Container */}
        <div className="relative mb-4">
          {/* Splash Background */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <img 
            //   src={level.splashImage}
            src={YellowSplash}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Badge */}
            <div className={`relative w-16 h-16 flex items-center justify-center rounded-full ${isLocked ? 'grayscale opacity-50' : ''}`}>
              <img 
                src={InitiateBadge}
                alt={level.name}
                className="w-full h-full object-contain"
              />
              {/* Lock overlay for locked items */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Level Info */}
        <div className="text-center">
          <h3 className={`text-lg font-semibold mb-1 ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
            {level.name}
          </h3>
          <div className="flex items-center justify-center mb-2">
            <div className={`h-1 w-16 rounded-full ${
              level.color === 'green' ? 'bg-green-500' :
              level.color === 'teal' ? 'bg-teal-500' :
              level.color === 'blue' ? 'bg-blue-500' :
              level.color === 'purple' ? 'bg-purple-500' : 'bg-gray-300'
            } ${isLocked ? 'opacity-30' : ''}`}></div>
          </div>
          <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
            {level.range}
          </p>
        </div>

        {/* Claim Reward Button - only for current level */}
        {level.isCurrent && (
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Claim Reward
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Levels Grid */}
        <div className="space-y-8">
          {/* First Row - Levels Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {levelData.map((level, index) => (
                <LevelCard key={level.name} level={level} index={index} />
              ))}
            </div>
          </div>

          {/* Second Row - Duplicate for demonstration */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {levelData.map((level, index) => (
                <LevelCard key={`second-${level.name}`} level={{...level, isCurrent: false, isUnlocked: index < 4}} index={index} />
              ))}
            </div>
          </div>

          {/* Third Row - Duplicate for demonstration */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Levels</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {levelData.map((level, index) => (
                <LevelCard key={`third-${level.name}`} level={{...level, isCurrent: false, isUnlocked: index < 2}} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats at bottom */}
        <div className="mt-12 flex justify-center">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            1512 🏆 964
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;