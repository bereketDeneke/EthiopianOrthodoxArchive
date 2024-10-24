import React from 'react';
import { Drawer, Tabs, Tab, List, ListItem, ListItemText } from '@mui/material';

const PlaylistDrawer = ({
  isDrawerOpen,
  toggleDrawer,
  currentTab,
  setCurrentTab,
  playlist,
  isLiked,
  currentSongIndex,
  setCurrentSongIndex,
  resetPlayer,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      sx={{ '& .MuiDrawer-paper': { width: 300, backgroundColor: '#282828' } }}
    >
      <Tabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
        centered
        sx={{ backgroundColor: '#1DB954', color: '#fff' }}
      >
        <Tab label="Playlist" />
        <Tab label="Liked Songs" />
      </Tabs>

      {currentTab === 0 ? (
        <List sx={{ width: '100%', color: '#ffffff', mt: 2 }}>
          {playlist.map((song, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                setCurrentSongIndex(index);
                resetPlayer();
                toggleDrawer(false); // Close the drawer when a song is selected
              }}
              selected={index === currentSongIndex}
              sx={{ backgroundColor: index === currentSongIndex ? '#333' : 'transparent' }}
            >
              <ListItemText primary={song.title} secondary={song.artist} />
            </ListItem>
          ))}
        </List>
      ) : (
        <List sx={{ width: '100%', color: '#ffffff', mt: 2 }}>
          {playlist
            .filter((song, index) => isLiked[index])
            .map((song, index) => (
              <ListItem key={index} sx={{ backgroundColor: '#333' }}>
                <ListItemText primary={song.title} secondary={song.artist} />
              </ListItem>
            ))}
        </List>
      )}
    </Drawer>
  );
};

export default PlaylistDrawer;
