"use client";

import { useState, useEffect } from 'react';
import { message } from 'antd';
import Calendar from '@/components/appointments/Calendar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppointmentDetailModal from '@/components/appointments/AppointmentDetailModal';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      message.error('Failed to fetch appointments');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredPermission="view_appointments">
      <div className="calendar-page">
        <h1 className="page-title">Calendar</h1>
        <Calendar
          events={events}
          onEventClick={setSelectedEvent}
        />
        {selectedEvent && (
          <AppointmentDetailModal
            appointment={selectedEvent}
            visible={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onUpdate={fetchAppointments}
          />
        )}
      </div>
    </ProtectedRoute>
  );
} 