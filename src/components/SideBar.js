import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, CalendarToday, Folder, LibraryMusic, RecordVoiceOver} from '@mui/icons-material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Sidebar = ({ onSelect }) => {
  const [open, setOpen] = useState(false); // Collapsible state

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  // List of sidebar items with updated icons and corresponding views
  const sidebarItems = [
    { text: 'Archives', icon: <Folder />, view: 'Archives' },
    { text: 'Sebeket (Preaching)', icon: <RecordVoiceOver />, view: 'Sebeket' },
    { text: 'Mezmure (Holy Music)', icon: <LibraryMusic />, view: 'Music' },
    { text: 'Holiday and Calendars', icon: <CalendarToday />, view: 'Calendar' },
    { text: 'AskAI', icon: <AutoAwesomeIcon />, view: 'AskAI' },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: { xs: 250, sm: 300 }, // Width for mobile and desktop
        padding: 2,
      }}
      role="presentation"
      // Remove the onClick and onKeyDown handlers here
    >
      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      {/* List of Sidebar Items */}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              onSelect(item.view); // Pass the selected view back to the HomePage
              toggleDrawer(false)(); // Close the drawer after selection
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Menu button to toggle the sidebar */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ position: 'fixed', top: 10, left: 10 }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)} // Only closes when interacting outside the drawer
        variant="temporary" // Makes it responsive and collapsible
        sx={{
          display: { xs: 'block', sm: 'block' }, // Responsive display for mobile and desktop
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
