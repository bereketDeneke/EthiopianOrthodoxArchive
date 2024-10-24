import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { CSSTransition, SwitchTransition } from 'react-transition-group'; // Import for transitions
import MusicVideoPlayer from './MusicPlayer'; // Your music player component
import PdfViewer from '../components/PDFReader'; // Your PDF viewer component
import SideBar from '../components/SideBar'; // Your sidebar component
import Archives from './Archives'; // Your archives component
import SebeketView from './Sebeket'; // Sebeket view component
import CalendarView from './Calendar'; // Calendar view component
import './HomePage.css'; // Custom CSS for transitions
import { fetchArchivesData } from '../utils/ArchiveHelper';
import { fetchPlaylist } from '../utils/PlaylistHelper';
import AIPage from './AskAI';
import HolidayCalendar from './Calendar';

const SAMPLE_PDF = "./webDoc/amharic/abeyetbealat/baherehasab.pdf";

const HomePage = () => {
  const [currentView, setCurrentView] = useState('Archives'); // Default to 'Archives'
  const [playlist, setPlaylist] = useState([]);
  const [archivesData, setArchivesData] = useState([]);
  const [isPreloading, setIsPreloading] = useState(false); // Track if preloading

  useEffect(() => {
    // Fetch playlist data
    const loadPlaylist = async () => {
      const data = await fetchPlaylist();
      setPlaylist(data);
    };

    // Fetch archives data
    const loadArchivesData = async () => {
      const data = await fetchArchivesData();
      setArchivesData(data);
    };

    loadPlaylist();
    loadArchivesData();
  }, []);

  // Handle sidebar selection and preload the content before switching view
  const handleSideBarSelection = async (view) => {
    if (view === currentView) return; // No need to reload the same view

    setIsPreloading(true); // Indicate that we are starting to load the new view

    // Simulate the loading process for the new view data
    setTimeout(() => {
      setCurrentView(view);
      setIsPreloading(false); // Transition after the new view is loaded
    }, 500); // A short delay to preload before switching
  };

  return (
    <Container maxWidth="lg">
      <SideBar onSelect={handleSideBarSelection} />

      {/* Keep the current view while loading the next view */}
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentView} // Key to indicate which view is being transitioned
          timeout={300} // Duration of the transition in ms
          classNames="fade" // Reference to CSS class for the transition
        >
          <div>
            {currentView === 'Archives' && <Archives archives={archivesData} />}
            {currentView === 'Music' && <MusicVideoPlayer playlist={playlist} />}
            {currentView === 'Sebeket' && <PdfViewer pdfFile={SAMPLE_PDF} />}
            {currentView === 'Calendar' && <HolidayCalendar jsonFile={"./data/calendar.json"} />}
            {currentView === 'AskAI' && <AIPage />}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Container>
  );
};

export default HomePage;
