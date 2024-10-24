import React, { useState, useEffect } from 'react';
import { format, isSameDay, parse, addYears, addMonths } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Tooltip, Typography } from '@mui/material';
import './HolidayCalendar.css'; // Add custom styles if needed

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

// Initialize date-fns localizer for the calendar
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => new Date(),
  getDay: date => date.getDay(),
  locales,
});

const HolidayCalendar = ({ jsonFile }) => {
  const [holidays, setHolidays] = useState([]);

  // Fetch holidays from the JSON file dynamically
  useEffect(() => {
    const fetchHolidays = async () => {
      const response = await fetch(jsonFile);
      const data = await response.json();

      // Format data into events for the calendar
      const formattedHolidays = data.flatMap((holiday) => createRecurringEvents(holiday));

      setHolidays(formattedHolidays);
    };

    fetchHolidays();
  }, [jsonFile]);

  // Helper function to parse date in "month-day" format into a Date object in the current year
  const parseHolidayDate = (holidayDate) => {
    const currentYear = new Date().getFullYear();
    return parse(`${currentYear}-${holidayDate}`, 'yyyy-MM-dd', new Date());
  };

  // Helper function to handle recurring events
  const createRecurringEvents = (holiday) => {
    const baseDate = parseHolidayDate(holiday.date);
    const today = new Date();
    const events = [];

    if (holiday.recurrence === "yearly") {
      // Create yearly recurring event
      for (let yearOffset = 0; yearOffset < 5; yearOffset++) { // Display for the next 5 years
        const eventDate = addYears(baseDate, yearOffset);
        events.push(createEventObject(holiday, eventDate));
      }
    } else if (holiday.recurrence === "monthly") {
      // Create monthly recurring event
      for (let monthOffset = 0; monthOffset < 12; monthOffset++) { // Display for the next 12 months
        const eventDate = addMonths(baseDate, monthOffset);
        if (eventDate >= today) {
          events.push(createEventObject(holiday, eventDate));
        }
      }
    } else {
      // One-time event (no recurrence)
      events.push(createEventObject(holiday, baseDate));
    }

    return events;
  };

  // Helper function to create an event object
  const createEventObject = (holiday, date) => {
    return {
      title: holiday.eventName,
      start: date,
      end: date,
      description: holiday.description
    };
  };

  // Event renderer to include tooltip or description when a holiday is clicked or hovered
  const EventComponent = ({ event }) => (
    <Tooltip title={event.description || 'No description'} arrow>
      <Typography variant="body2" sx={{ color: '#ffffff' }}>
        {event.title}
      </Typography>
    </Tooltip>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Calendar
        localizer={localizer}
        events={holidays}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          event: EventComponent
        }}
      />
    </Box>
  );
};

export default HolidayCalendar;
