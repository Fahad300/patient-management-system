"use client";

import { useState } from 'react';
import { Calendar as AntCalendar, Badge, Modal, Button, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import AppointmentForm from './AppointmentForm';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  type: string;
  patient: {
    firstName: string;
    lastName: string;
  };
}

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateSelect?: (date: Dayjs) => void;
}

const Calendar = ({ events, onEventClick, onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dayEventsVisible, setDayEventsVisible] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'gold',
      CONFIRMED: 'green',
      COMPLETED: 'blue',
      CANCELLED: 'red',
    };
    return colors[status as keyof typeof colors];
  };

  const getListData = (value: Dayjs) => {
    return events.filter(event => 
      dayjs(event.start).format('YYYY-MM-DD') === value.format('YYYY-MM-DD')
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="calendar-events">
        {listData.map(item => (
          <li key={item.id} onClick={(e) => {
            e.stopPropagation();
            onEventClick?.(item);
          }}>
            <Badge
              color={getStatusColor(item.status)}
              text={`${dayjs(item.start).format('HH:mm')} ${item.patient.firstName} ${item.patient.lastName}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleDateSelect = (date: Dayjs) => {
    const dayEvents = getListData(date);
    if (dayEvents.length > 0) {
      setSelectedDayEvents(dayEvents);
      setDayEventsVisible(true);
    } else {
      setSelectedDate(date);
      setModalVisible(true);
    }
  };

  return (
    <div className="calendar-container">
      <AntCalendar
        cellRender={dateCellRender}
        onSelect={handleDateSelect}
      />

      {/* Day Events Modal */}
      <Modal
        title={selectedDayEvents[0] ? 
          dayjs(selectedDayEvents[0].start).format('MMMM D, YYYY') : 
          ''}
        open={dayEventsVisible}
        onCancel={() => setDayEventsVisible(false)}
        footer={[
          <Button 
            key="new" 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setDayEventsVisible(false);
              setModalVisible(true);
            }}
          >
            New Appointment
          </Button>
        ]}
        width={600}
      >
        <div className="day-events">
          {selectedDayEvents.map(event => (
            <div key={event.id} className="day-event-item">
              <Space align="start">
                <Badge color={getStatusColor(event.status)} />
                <div>
                  <div className="event-time">
                    {dayjs(event.start).format('HH:mm')} - {dayjs(event.end).format('HH:mm')}
                  </div>
                  <div className="event-title">
                    {event.patient.firstName} {event.patient.lastName}
                  </div>
                  <div className="event-type">{event.type}</div>
                </div>
              </Space>
              <Space>
                <Button 
                  type="link" 
                  onClick={() => onEventClick?.(event)}
                >
                  View Details
                </Button>
              </Space>
            </div>
          ))}
        </div>
      </Modal>

      {/* New Appointment Modal */}
      <AppointmentForm
        visible={modalVisible}
        initialDate={selectedDate}
        onCancel={() => {
          setModalVisible(false);
          setSelectedDate(null);
        }}
        onSuccess={() => {
          setModalVisible(false);
          setSelectedDate(null);
        }}
      />
    </div>
  );
};

export default Calendar; 