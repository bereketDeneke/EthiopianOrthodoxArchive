import React from 'react';
import { Box, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const PlayerControls = ({
  isPlaying,
  handlePlayPause,
  handleNext,
  handlePrevious,
  handlePiP,
  currentSong,
  isLiked,
  handleLikeToggle,
  volume,
  handleVolumeChange,
  isMinimized, // New prop for handling minimized state
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        mt: 2,
        flexDirection: isMinimized ? 'row' : 'row', // Adjust layout for minimized view
      }}
    >
      {/* Play/Pause Button */}
      <IconButton
        onClick={handlePlayPause}
        aria-label="play/pause"
        sx={{ color: '#1DB954', fontSize: isMinimized ? '1rem' : '1.5rem' }}
      >
        {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
      </IconButton>

      {/* Previous Button */}
      <IconButton
        onClick={handlePrevious}
        aria-label="Previous"
        sx={{ color: '#1DB954', fontSize: isMinimized ? '1rem' : '1.5rem' }}
      >
        <SkipPreviousIcon fontSize={isMinimized ? 'medium' : 'large'} />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={handleNext}
        aria-label="Next"
        sx={{ color: '#1DB954', fontSize: isMinimized ? '1rem' : '1.5rem' }}
      >
        <SkipNextIcon fontSize={isMinimized ? 'medium' : 'large'} />
      </IconButton>

      {/* Picture-in-Picture Button */}
      {!isMinimized && currentSong.videoSrc && (
        <IconButton onClick={handlePiP} aria-label="Picture-in-Picture" sx={{ color: '#1DB954' }}>
          <PictureInPictureIcon fontSize="large" />
        </IconButton>
      )}

      {/* Like/Unlike Button */}
      <IconButton
        onClick={handleLikeToggle}
        aria-label="Like"
        sx={{ color: '#1DB954', fontSize: isMinimized ? '1rem' : '1.5rem' }}
      >
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      {/* Volume Control */}
      {!isMinimized && (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <IconButton aria-label="Volume" sx={{ color: '#ffffff' }}>
            {volume > 0 ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
            sx={{
              width: 100,
              color: '#1DB954',
              ml: 1,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PlayerControls;
