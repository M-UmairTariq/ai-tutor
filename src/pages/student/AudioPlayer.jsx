// import React, { useState, useRef, useEffect } from 'react';
// import { Play, Pause } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface WhatsAppAudioPlayerProps {
//   audioUrl: string | undefined;
//   isUserMessage: boolean;
// }

// const WhatsAppAudioPlayer: React.FC<WhatsAppAudioPlayerProps> = ({ audioUrl, isUserMessage }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [waveformData, setWaveformData] = useState<number[]>([]);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // Generate waveform data when component mounts
//   useEffect(() => {
//     generateWaveform();
//   }, [audioUrl]);

//   // Update current time while playing
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => setDuration(audio.duration);
//     const handleEnded = () => setIsPlaying(false);

//     audio.addEventListener('timeupdate', updateTime);
//     audio.addEventListener('loadedmetadata', updateDuration);
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('timeupdate', updateTime);
//       audio.removeEventListener('loadedmetadata', updateDuration);
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, []);

//   // Generate mock waveform data (in real app, you'd analyze the actual audio)
//   const generateWaveform = () => {
//     const bars = 40;
//     const data = Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
//     setWaveformData(data);
//   };

//   // Draw waveform on canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || waveformData.length === 0) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const { width, height } = canvas;
//     ctx.clearRect(0, 0, width, height);

//     const barWidth = width / waveformData.length;
//     const progress = duration > 0 ? currentTime / duration : 0;

//     waveformData.forEach((bar, index) => {
//       const barHeight = bar * height * 0.8;
//       const x = index * barWidth;
//       const y = (height - barHeight) / 2;

//       // Determine color based on progress and message type
//       const isPlayed = index / waveformData.length < progress;
//       let color;
      
//       if (isUserMessage) {
//         color = isPlayed ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
//       } else {
//         color = isPlayed ? '#6250E9' : 'rgba(98, 80, 233, 0.3)';
//       }

//       ctx.fillStyle = color;
//       ctx.fillRect(x, y, barWidth - 1, barHeight);
//     });
//   }, [waveformData, currentTime, duration, isUserMessage]);

//   const togglePlayPause = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     const audio = audioRef.current;
//     if (!canvas || !audio || duration === 0) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const progress = x / canvas.width;
//     const newTime = progress * duration;
    
//     audio.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   return (
//     <div className={`flex items-center gap-2 p-2 rounded-lg max-w-[280px] ${
//       isUserMessage ? 'bg-primary text-white' : 'bg-white'
//     }`}>
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={togglePlayPause}
//         className={`p-1 rounded-full ${
//           isUserMessage 
//             ? 'hover:bg-white/20 text-white' 
//             : 'hover:bg-gray-100 text-primary'
//         }`}
//       >
//         {isPlaying ? (
//           <Pause className="h-4 w-4" />
//         ) : (
//           <Play className="h-4 w-4" />
//         )}
//       </Button>

//       <div className="flex-1 min-w-0">
//         <canvas
//           ref={canvasRef}
//           width={160}
//           height={32}
//           className="w-full h-8 cursor-pointer"
//           onClick={handleCanvasClick}
//         />
//       </div>

//       <div className={`text-xs font-mono ${
//         isUserMessage ? 'text-white/80' : 'text-gray-500'
//       }`}>
//         {formatTime(currentTime)} / {formatTime(duration)}
//       </div>

//       <audio
//         ref={audioRef}
//         src={audioUrl}
//         preload="metadata"
//         className="hidden"
//       />
//     </div>
//   );
// };

// export default WhatsAppAudioPlayer;

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

export const BetterAudioPlayer = ({ src, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio play error:', error);
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bg-white rounded-lg p-3 shadow-sm border ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        playsInline
        className="hidden"
      />
      
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white ml-0.5" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="flex-1">
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative"
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-sm transition-all duration-100"
              style={{ left: `calc(${progressPercentage}% - 6px)` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gray-500" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

// Simple Waveform-style player
export const WaveformAudioPlayer = ({ src, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio play error:', error);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Generate fake waveform bars
  const generateWaveform = () => {
    const bars = [];
    const numBars = 50;
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    for (let i = 0; i < numBars; i++) {
      const height = Math.random() * 20 + 5; // Random height between 5-25px
      const isActive = (i / numBars) * 100 <= progressPercentage;
      
      bars.push(
        <div
          key={i}
          className={`w-1 rounded-full transition-colors duration-150 ${
            isActive ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          style={{ height: `${height}px` }}
        />
      );
    }
    
    return bars;
  };

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm border ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        playsInline
        className="hidden"
      />
      
      <div className="flex items-center gap-4">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>

        {/* Waveform */}
        <div className="flex-1">
          <div className="flex items-center justify-center gap-0.5 h-8 mb-2">
            {generateWaveform()}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Minimal WhatsApp-style player
export const WhatsAppStylePlayer = ({ src, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio play error:', error);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bg-gray-100 rounded-lg p-3 max-w-xs ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        playsInline
        className="hidden"
      />
      
      <div className="flex items-center gap-3">
        {/* Play Button */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 transition-colors"
        >
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-3 h-3 text-white" />
          ) : (
            <Play className="w-3 h-3 text-white ml-0.5" />
          )}
        </button>

        {/* Progress and Time */}
        <div className="flex-1">
          <div className="w-full h-1 bg-gray-300 rounded-full mb-1">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-600">
            {formatTime(isPlaying ? currentTime : duration)}
          </div>
        </div>
      </div>
    </div>
  );
};