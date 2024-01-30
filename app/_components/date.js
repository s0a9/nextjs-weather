function Days(day) {
  // Create a new Date object for January 29, 2024
  const days = new Date(day);

  // Get the day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const dayOfWeek = days.getDay();

  // Define an array of day names
  const daysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];

  // Get the name of the day using the array
  const dayName = daysOfWeek[dayOfWeek];

  return <>{dayName}</>;
}

export default Days;
