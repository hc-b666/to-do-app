export const parseTimeFromTitle = (title: string) => {
  const timePattern = /(?:at|by)\s(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i;
  const match = title.match(timePattern);

  if (match) {
    let hour = parseInt(match[1]);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const period = match[3]?.toLowerCase(); 

    if (period === "pm" && hour < 12) {
      hour += 12;
    } else if (period === "am" && hour === 12) {
      hour = 0;
    }

    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - timezoneOffset);
    return localTime.toISOString().slice(0, 16);
  }
  return "";
};
