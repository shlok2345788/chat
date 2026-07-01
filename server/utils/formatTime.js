/**
 * Formats a Date object or timestamp into a clean 12-hour string: HH:MM AM/PM
 * @param {Date|number|string} dateInput - The input date or timestamp
 * @returns {string} Formatted time string (e.g., "12:34 PM")
 */
function formatTime(dateInput = new Date()) {
  const date = new Date(dateInput);
  
  // Return empty string if date is invalid
  if (isNaN(date.getTime())) {
    return '';
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
}

module.exports = formatTime;
