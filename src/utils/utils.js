import moment from "moment/moment";

const startDateObj = moment().subtract(6, "days");
const startDate = startDateObj.format("YYYY-MM-DD");

const endDateObj = moment();
const endDate = endDateObj.format("YYYY-MM-DD");

const dates = [];

while (startDateObj.isSameOrBefore(endDateObj, "day")) {
  dates.push(startDateObj.format("YYYY-MM-DD"));
  startDateObj.add(1, "day");
}

const formattedDates = dates.map((date) => moment(date).format("ddd D"));

const currentMonthYear = moment().format("MMMM YYYY");

export { startDate, endDate, dates, currentMonthYear, formattedDates };
