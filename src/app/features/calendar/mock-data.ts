import { CalendarEvent } from '../../shared';

const weekStart = new Date();
weekStart.setHours(0, 0, 0, 0);
weekStart.setDate(weekStart.getDate() - weekStart.getDay());

function at(day: number, time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date(weekStart);
  date.setDate(date.getDate() + day);
  date.setHours(hours, minutes);
  return date.toISOString();
}

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    title: 'Milky Way as Melting Pot',
    location: 'Space Center USA',
    start: at(-5, '10:00'),
    end: at(-5, '11:30')
  },
  {
    id: 2,
    title: 'Mysteries of Bermuda Triangle',
    location: 'Bermuda',
    start: at(-3, '09:30'),
    end: at(-3, '11:00')
  },
  {
    id: 3,
    title: 'Alien Civilization',
    location: 'Space Center USA',
    start: at(0, '10:30'),
    end: at(0, '12:30')
  },
  {
    id: 4,
    title: 'Explosion of Betelgeuse Star',
    location: 'New York City',
    start: at(1, '08:30'),
    end: at(1, '10:30')
  },
  {
    id: 5,
    title: 'Space Galaxies and Planets',
    location: 'Space Center USA',
    start: at(1, '13:30'),
    end: at(1, '15:00')
  },
  {
    id: 6,
    title: 'The Cycle of Seasons',
    location: 'Research Center of USA',
    start: at(2, '11:00'),
    end: at(2, '12:30')
  },
  {
    id: 7,
    title: 'Meteor Showers',
    location: 'Space Center USA',
    start: at(3, '09:30'),
    end: at(3, '11:00')
  },
  {
    id: 8,
    title: 'Glaciers and Snowflakes',
    location: 'Space Center USA',
    start: at(4, '08:30'),
    end: at(4, '10:30')
  },
  {
    id: 9,
    title: 'Alien Civilization',
    location: 'Space Center USA',
    start: at(4, '12:30'),
    end: at(4, '14:30')
  },
  {
    id: 10,
    title: 'Sky Gazers',
    location: 'Greenland',
    start: at(5, '11:00'),
    end: at(5, '12:30')
  },
  {
    id: 11,
    title: 'Facts of Humming Birds',
    location: 'California',
    start: at(6, '09:00'),
    end: at(6, '11:00')
  },
  {
    id: 12,
    title: 'Under the Sea',
    location: 'Monterey Bay Aquarium',
    start: at(9, '14:00'),
    end: at(9, '15:30')
  },
  {
    id: 13,
    title: 'Black Holes Explained',
    location: 'Research Center of USA',
    start: at(11, '10:00'),
    end: at(11, '12:00')
  }
];
