import moment from "moment/moment";

// startDateObj is today's date minus 6 days (as a Moment Object)
const startDateObj = moment().subtract(6, "days");
const startDate = startDateObj.format("YYYY-MM-DD");

// endDateObj is today's date (as a Moment Object)
const endDateObj = moment();
const endDate = endDateObj.format("YYYY-MM-DD");

// Create an array to store the dates
const dates = [];

// Loop from last Friday's date until today's date
while (startDateObj.isSameOrBefore(endDateObj, "day")) {
  dates.push(startDateObj.format("YYYY-MM-DD"));
  startDateObj.add(1, "day");
}

console.log(dates);

export { startDate, endDate, dates };
