import React from 'react';
import { Box, Typography } from '@mui/material';

const SongDetails = ({ currentSong, videoRef }) => {
  return (
    <Box>
      {/* Title and Artist */}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        {currentSong.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, color: '#b3b3b3' }}>
        {currentSong.artist}
      </Typography>

      {/* Conditionally render video if videoSrc is provided, otherwise show poster */}
      {currentSong.videoSrc ? (
        <video
          ref={videoRef}
          src={currentSong.videoSrc}
          poster={currentSong.poster}
          controls
          style={{
            width: '100%',
            borderRadius: '12px',
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      ) : (
        <Box
          component="img"
          src={currentSong.poster}
          alt={currentSong.title}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            mb: 2,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
    </Box>
  );
};

export default SongDetails;
