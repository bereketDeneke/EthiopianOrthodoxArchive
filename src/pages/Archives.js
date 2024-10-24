import React from 'react';
import Quote from '../components/quote';
import { Card, CardMedia, CardContent, Typography, Grid, Box } from '@mui/material';

const Archives = ({ archives }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        {archives.map((archive, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{
                maxWidth: 345,
                transition: 'transform 0.3s ease-in-out', // Add smooth transition
                '&:hover': {
                  transform: 'scale(1.05)', // Slightly enlarge the card when hovered
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={archive.thumbnail} // Dynamically get thumbnail from archives list
                alt={archive.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {archive.title} {/* Dynamically get title from archives list */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Quote 
        verse="For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." 
        reference="John 3:16" 
      />
    </Box>
  );
};

export default Archives;
