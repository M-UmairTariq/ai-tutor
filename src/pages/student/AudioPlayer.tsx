import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppAudioPlayerProps {
  audioUrl: string | undefined;
  isUserMessage: boolean;
}

const WhatsAppAudioPlayer: React.FC<WhatsAppAudioPlayerProps> = ({ audioUrl, isUserMessage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate waveform data when component mounts
  useEffect(() => {
    generateWaveform();
  }, [audioUrl]);

  // Update current time while playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Generate mock waveform data (in real app, you'd analyze the actual audio)
  const generateWaveform = () => {
    const bars = 40;
    const data = Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
    setWaveformData(data);
  };

  // Draw waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / waveformData.length;
    const progress = duration > 0 ? currentTime / duration : 0;

    waveformData.forEach((bar, index) => {
      const barHeight = bar * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;

      // Determine color based on progress and message type
      const isPlayed = index / waveformData.length < progress;
      let color;
      
      if (isUserMessage) {
        color = isPlayed ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
      } else {
        color = isPlayed ? '#6250E9' : 'rgba(98, 80, 233, 0.3)';
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
  }, [waveformData, currentTime, duration, isUserMessage]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio || duration === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = x / canvas.width;
    const newTime = progress * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg max-w-[280px] ${
      isUserMessage ? 'bg-primary text-white' : 'bg-white'
    }`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlayPause}
        className={`p-1 rounded-full ${
          isUserMessage 
            ? 'hover:bg-white/20 text-white' 
            : 'hover:bg-gray-100 text-primary'
        }`}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      <div className="flex-1 min-w-0">
        <canvas
          ref={canvasRef}
          width={160}
          height={32}
          className="w-full h-8 cursor-pointer"
          onClick={handleCanvasClick}
        />
      </div>

      <div className={`text-xs font-mono ${
        isUserMessage ? 'text-white/80' : 'text-gray-500'
      }`}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        className="hidden"
      />
    </div>
  );
};

export default WhatsAppAudioPlayer;