import React, { useRef, useState, useEffect } from 'react';
import { Box, Slider, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SheetContainer from './MusicSheet'; // This loads your sheet

const MusicVideoPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState({});
  const [songs, setSongs] = useState([]); // Empty initial playlist
  const [title, setTitle] = useState('Loading');
  const [artist, setArtist] = useState('Loading');

  const size = songs.length;
 
  useEffect(() => {
    // Fetch updated playlist from the SheetContainer
    const fetchUpdatedPlaylist = async () => {
      const data = await fetch('./data/sheet.json'); // Assuming the file is static for now
      const parsedData = await data.json();
      setSongs(parsedData); // Update the songs with the sheet data
    };

    fetchUpdatedPlaylist().then((parsedData) => {
      if(parsedData){
        console.log(parsedData);
        const artist = parsedData[1].values[currentSongIndex]; // Use parsedData directly
        const title = parsedData[2].values[currentSongIndex];
        const src = parsedData[parsedData.length - 1].values[currentSongIndex]; 
    
        setArtist(artist);
        setSongs(src); 
        setTitle(title);
        if (audioRef && audioRef.current) {
          audioRef.current.load();  // Load the new source
          audioRef.current.play();  // Then play the new source
        }
      }
    });
  }, []);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      const updateProgress = () => {

      if(audioRef && audioRef.current)
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
      };

      if (audioRef && audioRef.current)
        audioRef.current.addEventListener('timeupdate', updateProgress);

      return () => {
        if (audioRef && audioRef.current)
          audioRef.current.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [currentSongIndex]);

  // Ensure play/pause syncing across SheetContainer and MusicVideoPlayer
  const handlePlayPause = (playFromSheetContainer = false) => {
    if(!audioRef || !audioRef.current)
      return;

    if (playFromSheetContainer) {
      // If SheetContainer triggered play
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // If MusicVideoPlayer controls play/pause
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    resetPlayer();
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    resetPlayer();
  };

  const handleLikeToggle = (index) => {
    const updatedLikedStatus = { ...isLiked, [index]: !isLiked[index] };
    setIsLiked(updatedLikedStatus);

    // Reflect the liked status back to the music sheet
    const updatedSongs = songs.map((song, idx) =>
      idx === index ? { ...song, liked: updatedLikedStatus[idx] } : song
    );
    setSongs(updatedSongs);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);

    if(audioRef && audioRef.current)
    audioRef.current.volume = newValue / 100;
  };

  const handleSeek = (event, newValue) => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      const seekTime = (newValue / 100) * audioRef.current.duration;
      if (audioRef && audioRef.current && !isNaN(seekTime) && isFinite(seekTime)) {
        audioRef.current.currentTime = seekTime;
        setProgress(newValue);
      }
    }
  };

  const resetPlayer = () => {
    setIsPlaying(false);
    if(audioRef && audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  const handleSongSelection = (index) => {
    setCurrentSongIndex(index);
    // resetPlayer();
    // handlePlayPause(true); // Play automatically when selecting a new song from SheetContainer
  };

  if (!songs || songs.length === 0) {
    return <Typography sx={{ color: '#ffffff' }}>No songs available</Typography>;
  }

  return (
    <Box sx={{ width: '100%', position: 'fixed', left: 0, padding: 3, color: '#ffffff' }}>
      {/* Pass relevant handlers to SheetContainer */}
      <SheetContainer 
        jsonFile={'./data/sheet.json'} 
        currentSongIndex={currentSongIndex} 
        onSongSelect={handleSongSelection} 
        onLikeToggle={handleLikeToggle}
        isLiked={isLiked}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause} // Pass down play/pause handler to SheetContainer
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center the content horizontally
          justifyContent: 'center',
          backgroundColor:'dark'
        }}
      >
        {/* Song Details */}
        {/* <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', marginBottom: '8px' }}>
          {title} - {artist}
        </Typography> */}

        {/* Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
          <IconButton color="primary" onClick={handlePrevious}>
            <SkipPreviousIcon />
          </IconButton>

          <IconButton color="primary" onClick={() => handlePlayPause(false)}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />} {/* Toggle between Play and Pause */}
          </IconButton>

          <IconButton color="primary" onClick={handleNext}>
            <SkipNextIcon />
          </IconButton>

          {/* Like Button */}
          <IconButton color="secondary" onClick={() => handleLikeToggle(currentSongIndex)}>
            <FavoriteIcon color={isLiked[currentSongIndex] ? 'error' : 'inherit'} />
          </IconButton>
        </Box>

        {/* Seek/Status Bar */}
        <Box sx={{ width: '80%', marginBottom: '12px' }}>
          <Slider value={progress} onChange={handleSeek}/>
        </Box>

        {/* Volume Control */}
        <Box sx={{ width: '200px' }}>
          <Slider value={volume} onChange={handleVolumeChange} min={0} max={100} aria-labelledby="volume-slider" />
        </Box>

        {/* Audio Element */}
        <audio ref={audioRef} src={(songs && songs.length > 2) ? songs[size - 1].values[currentSongIndex]: ''} autoPlay={isPlaying} />
      </Box>
    </Box>
  );
};

export default MusicVideoPlayer;
