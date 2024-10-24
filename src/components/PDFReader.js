import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Typography, IconButton, Slider, Fab } from '@mui/material';
import { ArrowBack, ArrowForward, ZoomIn, ZoomOut } from '@mui/icons-material';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

const PdfViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0); // Default scale
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    adjustScale(); // Adjust scale once the document is loaded
  };

  // Adjust scale to fit the width of the screen
  const adjustScale = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scaleFactor = containerWidth / 800; // Assuming the default page width of the PDF is 800
      setScale(scaleFactor);
    }
  };

  // Handle window resize to adjust the scale dynamically
  useEffect(() => {
    const handleResize = () => adjustScale();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcuts for navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' && pageNumber < numPages) {
        setPageNumber((prev) => prev + 1);
      } else if (event.key === 'ArrowLeft' && pageNumber > 1) {
        setPageNumber((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, numPages]);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',  // Align content to the left
        justifyContent: 'center',
        width: '100vw',  // Occupies full width of the viewport
        height: '80vh',  // Limit height to 80vh
        overflowY: 'auto', // Enable vertical scrolling
        overflowX: 'hidden', // Disable horizontal scrolling to maintain full width
        position: 'fixed',  // Ensure the PDF stays in a fixed position relative to the viewport
        left: 0,  // Align the content to the far left edge
        margin: 0,  // Remove any margin
        padding: 0,  // Remove any padding
        backgroundColor: '#f0f0f0',  // Light background to contrast PDF
      }}
    >
      {/* PDF Document */}
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<Typography>Loading PDF...</Typography>}
        sx={{margin: '0 auto'}}  
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>

      {/* Page navigation buttons positioned at the left and right of the screen */}
      <Fab
        color="primary"
        onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
        disabled={pageNumber <= 1}
        sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
      >
        <ArrowBack />
      </Fab>

      <Fab
        color="primary"
        onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
        disabled={pageNumber >= numPages}
        sx={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)' }}
      >
        <ArrowForward />
      </Fab>

      {/* Zoom Controls positioned at the bottom */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <IconButton
          onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
        >
          <ZoomOut />
        </IconButton>
        <Slider
          value={scale}
          min={0.5}
          max={2.0}
          step={0.1}
          onChange={(e, newValue) => setScale(newValue)}
          sx={{ width: '200px', marginX: 2 }}
        />
        <IconButton
          onClick={() => setScale((prev) => Math.min(prev + 0.2, 2.0))}
        >
          <ZoomIn />
        </IconButton>
      </Box>

      {/* Page number display */}
      {/* <Typography sx={{ position: 'absolute', top: 16 }}>
        Page {pageNumber} of {numPages}
      </Typography> */}
    </Box>
  );
};

export default PdfViewer;
