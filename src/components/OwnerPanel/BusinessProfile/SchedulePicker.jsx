import React from 'react';
import './SchedulePicker.css';

const SchedulePicker = ({ handleScheduleChange, placeDetailsInfo }) => {
  const daysOfWeek = [
    { name: 'Lunes', key: 'monday' },
    { name: 'Martes', key: 'tuesday' },
    { name: 'Miércoles', key: 'wednesday' },
    { name: 'Jueves', key: 'thursday' },
    { name: 'Viernes', key: 'friday' },
    { name: 'Sábado', key: 'saturday' },
    { name: 'Domingo', key: 'sunday' },
  ];

  const timeSlots = [
    '',
    '24/7',
    'Cerrado',
    ...Array.from({ length: 24 * 2 }, (_, index) => {
      const hour = Math.floor(index / 2);
      const minute = index % 2 === 0 ? '00' : '30';
      return `${hour.toString().padStart(2, '0')}:${minute}`;
    }),
  ];

  const handleScheduleChangeSpecial = (e, dayKey, type) => {
    const value = e.target.value;
    const oppositeType = type === 'open' ? 'close' : 'open';
    const oppositeValue = placeDetailsInfo.schedule[dayKey][oppositeType];

    if (value === '24/7' || value === 'Cerrado' || value === '') {
      handleScheduleChange({ target: { name: `${dayKey}${type}`, value } }, dayKey, type);
      handleScheduleChange({ target: { name: `${dayKey}${oppositeType}`, value } }, dayKey, oppositeType);
    } else {
      if (oppositeValue === '24/7' || oppositeValue === 'Cerrado' || oppositeValue === '') {
        handleScheduleChange({ target: { name: `${dayKey}${oppositeType}`, value: '00:00' } }, dayKey, oppositeType);
      }
      handleScheduleChange(e, dayKey, type);
    }
  };

  return (
    <div className="schedule-table-container">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Día</th>
            <th>Apertura</th>
            <th>Cierre</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, index) => (
            <tr key={day.key} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{day.name}</td>
              <td>
                <select
                  name={`${day.key}Open`}
                  value={placeDetailsInfo.schedule[day.key].open}
                  onChange={(e) => handleScheduleChangeSpecial(e, day.key, 'open')}
                >
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  name={`${day.key}Close`}
                  value={placeDetailsInfo.schedule[day.key].close}
                  onChange={(e) => handleScheduleChangeSpecial(e, day.key, 'close')}
                >
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePicker;
