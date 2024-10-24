import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TextField } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import './SheetContainer.css'; 

const SheetContainer = ({ jsonFile, currentSongIndex, onSongSelect, onLikeToggle, isLiked, isPlaying, onPlayPause }) => {
  const [tableData, setTableData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);

  // Fetch JSON data dynamically
  useEffect(() => {
    const loadJson = async () => {
      const response = await fetch(jsonFile);
      const data = await response.json();

      // Format the table data with full row data
      const formattedData = data[0].values.map((_, index) => ({
        artist: data.find((col) => col.ColumnName === 'Artist name')?.values[index],
        thumbnail: data.find((col) => col.ColumnName === 'Thumbnail')?.values[index],
        action: data.find((col) => col.ColumnName === 'Action')?.values[index]
      }));

      setTableData(formattedData);
      setFilteredData(formattedData);
    };
    loadJson();
  }, [jsonFile]);

  // Sort by artist name
  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return sortDirection === 'asc'
        ? a.artist.localeCompare(b.artist)
        : b.artist.localeCompare(a.artist);
    });

    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setFilteredData(sortedData);
  };

  // Searching
  useEffect(() => {
    if (tableData) {
      const filtered = tableData.filter((row) =>
        row.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, tableData]);

  if (!tableData) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search by artist..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '250px',
            backgroundColor: '#555',
            borderRadius: '17px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',  
                borderWidth: 0, 
              },
              '&:hover fieldset': {
                borderColor: 'transparent',  // No border on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',  // No border on focus
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>


      {/* Sorting Button */}
      <Button onClick={handleSort} variant="contained" color="primary">
        {sortDirection === 'asc' ? 'Sort by Artist Name (A-Z)' : 'Sort by Artist Name (Z-A)'}
      </Button>

      {/* Table */}
      <TableContainer component={Box} sx={{ maxHeight: '450px', overflowY: 'auto' }} className="dark-table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="dark-table-header">Thumbnail</TableCell>
              <TableCell className="dark-table-header">Artist name</TableCell>
              <TableCell className="dark-table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="dark-table-row">
                <TableCell className="dark-table-cell">
                  <img
                    src={row.thumbnail}
                    alt="thumbnail"
                    className="dark-thumbnail-image"
                    style={{ width: '80px', height: '80px' }}
                  />
                </TableCell>
                <TableCell className="dark-table-cell">
                  {row.artist}
                </TableCell>
                <TableCell className="dark-table-cell">
                  <IconButton color="primary" aria-label="play" onClick={() => onSongSelect(rowIndex)}>
                    {isPlaying && currentSongIndex === rowIndex ? (
                      <PauseIcon onClick={() => onPlayPause(false)} />
                    ) : (
                      <PlayArrowIcon onClick={() => onPlayPause(true)} />
                    )}
                  </IconButton>
                  <IconButton color="secondary" aria-label="like" onClick={() => onLikeToggle(rowIndex)}>
                    <FavoriteIcon color={isLiked[rowIndex] ? 'error' : 'inherit'} />
                  </IconButton>
                  <IconButton color="default" aria-label="download" href={row.action} download>
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SheetContainer;
