'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import { useWindowSize } from '@/lib/hooks';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface GoogleCalendarViewProps {
  apiKey: string;
  calendarId: string;
}

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  htmlLink: string;
}

const formatEventDate = (start: { dateTime?: string; date?: string; }) => {
    const eventDate = start.dateTime || start.date;
    if (!eventDate) return "날짜 정보 없음";

    const date = new Date(eventDate);
    if (isNaN(date.getTime())) return "유효하지 않은 날짜";
  
    // 'date'만 있는 경우 (종일 이벤트), 시간을 표시하지 않음
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
  
    if (start.dateTime) {
      options.hour = 'numeric';
      options.minute = 'numeric';
      options.hour12 = true;
    }
  
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const GoogleCalendarView: React.FC<GoogleCalendarViewProps> = ({ apiKey, calendarId }) => {
  const size = useWindowSize();
  const isMobile = size.width ? size.width < 768 : false;
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [groupedEvents, setGroupedEvents] = useState<Record<string, CalendarEvent[]>>({});
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const today = new Date();
      const timeLimit = new Date();
      timeLimit.setDate(today.getDate() + 90); // 90일치 일정을 가져옴
  
      const timeMin = today.toISOString();
      const timeMax = timeLimit.toISOString();
  
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // 응답이 실패했을 때, 본문을 텍스트로 읽어 에러 메시지를 확인
          const errorText = await response.text();
          console.error('Failed to fetch calendar events:', errorText);
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const events = data.items || [];
        setUpcomingEvents(events);
        setCurrentEventIndex(0);

        // 월별 그룹핑 로직 추가
        const groups: Record<string, CalendarEvent[]> = {};
        events.forEach((event: CalendarEvent) => {
          const eventDate = new Date(event.start.dateTime || event.start.date || new Date());
          const monthKey = `${eventDate.getFullYear()}년 ${eventDate.getMonth() + 1}월`;
          if (!groups[monthKey]) {
            groups[monthKey] = [];
          }
          groups[monthKey].push(event);
        });
        setGroupedEvents(groups);

      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
  
    if (apiKey && calendarId) {
      fetchUpcomingEvents();
    }
  }, [apiKey, calendarId]);

  const monthKeys = Object.keys(groupedEvents).sort((a, b) => new Date(a.replace('년 ', '-').replace('월', '')).getTime() - new Date(b.replace('년 ', '-').replace('월', '')).getTime());

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prevIndex => Math.min(monthKeys.length - 1, prevIndex + 1));
  };

  const handlePrevEvent = () => {
    setCurrentEventIndex(prevIndex => (prevIndex - 1 + Math.min(upcomingEvents.length, 7)) % Math.min(upcomingEvents.length, 7));
  };

  const handleNextEvent = () => {
    setCurrentEventIndex(prevIndex => (prevIndex + 1) % Math.min(upcomingEvents.length, 7));
  };

  if (!apiKey || !calendarId) {
    return (
      <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg text-center text-red-500">
        Google Calendar API 키 또는 캘린더 ID가 .env.local 파일에 설정되지 않았습니다.
      </div>
    );
  }

  const currentMonthKey = monthKeys[currentMonthIndex];
  const currentMonthEvents = groupedEvents[currentMonthKey] || [];

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg">
      {isMobile ? (
        // === 모바일: 월별 네비게이션 뷰 ===
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-center text-gray-700">
            <Calendar className="w-5 h-5 mr-2" />
            다가오는 데뷰 일정
          </h3>
          <div className="space-y-6">
            {monthKeys.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b-2">
                  <button
                    onClick={handlePrevMonth}
                    disabled={currentMonthIndex === 0}
                    className="p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-md font-bold text-gray-800">
                    {currentMonthKey}
                  </h4>
                  <button
                    onClick={handleNextMonth}
                    disabled={currentMonthIndex === monthKeys.length - 1}
                    className="p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {currentMonthEvents.map(event => (
                    <a
                      key={event.id}
                      href={event.htmlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border"
                    >
                      <p className="font-semibold text-gray-800">{event.summary}</p>
                      <p className="text-sm text-gray-600 mt-1">{formatEventDate(event.start)}</p>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">다가오는 일정이 없습니다.</p>
            )}
          </div>
        </div>
      ) : (
        // === 데스크톱: 캐러셀 + 캘린더 뷰 ===
        <>
          {upcomingEvents.length > 0 && (
            <div className="mb-8 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2" />
                다가오는 데뷰 일정
              </h3>
              <div className="relative flex items-center justify-center text-center">
                {upcomingEvents.slice(0, 7).length > 1 && (
                  <button
                    onClick={handlePrevEvent}
                    className="absolute left-0 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors z-10"
                    aria-label="이전 일정"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                <div className="w-full px-12 min-h-[80px] flex items-center justify-center">
                  {upcomingEvents.slice(0, 7).map((event, index) => (
                    <div key={event.id} className={`${index === currentEventIndex ? 'block' : 'hidden'}`}>
                      <a
                        href={event.htmlLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-white rounded-md"
                      >
                        <p className="font-semibold text-gray-800 text-lg">{event.summary}</p>
                        <p className="text-sm text-gray-600 mt-2">{formatEventDate(event.start)}</p>
                      </a>
                    </div>
                  ))}
                </div>

                {upcomingEvents.slice(0, 7).length > 1 && (
                  <button
                    onClick={handleNextEvent}
                    className="absolute right-0 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors z-10"
                    aria-label="다음 일정"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
              {upcomingEvents.slice(0, 7).length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {upcomingEvents.slice(0, 7).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentEventIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentEventIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`일정 ${index + 1} 보기`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, googleCalendarPlugin, interactionPlugin]}
            initialView={'dayGridMonth'}
            googleCalendarApiKey={apiKey}
            events={{
              googleCalendarId: calendarId,
            }}
            eventDisplay="block"
            eventTextColor="#ffffff"
            eventBackgroundColor="#13588f"
            eventBorderColor="#0e4a7a"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,listMonth'
            }}
            height={'80vh'}
            locale='ko'
            buttonText={{
              today:    '오늘',
              month:    '월',
              week:     '주',
              list:     '목록'
            }}
          />
        </>
      )}
    </div>
  );
};

export default GoogleCalendarView; 