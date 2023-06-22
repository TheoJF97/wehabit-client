export function getCurrentWeekDates() {
  const today = new Date();
  const firstDayOfWeek = new Date(today); // Create a new date object with the current date
  firstDayOfWeek.setDate(today.getDate() - 6); // Subtract 6 days to get the first day of the week

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i); // Add the loop index to get each day of the week
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1 and pad with 0 if needed
    const day = String(date.getDate()).padStart(2, "0"); // Pad day with 0 if needed
    const formattedDate = `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
    weekDates.push(formattedDate);
  }

  return weekDates;
}

// function to get current month + year
export function getCurrentMonthYear() {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" }); // Get the current month as a string
  const year = today.getFullYear(); // Get the current year

  return `${month} ${year}`; // Return the current month and year as a formatted string
}
