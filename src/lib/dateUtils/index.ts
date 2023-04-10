export function nextDay() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

export const beginningOfToday = () => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const beginningOfThisMonth = () => {
  let today = new Date();
  today.setDate(1);
  today.setHours(0, 0, 0, 0);
  return today;
};

export function nextMonth() {
  let nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  nextMonthDate.setHours(0, 0, 0, 0);
  return nextMonthDate;
}
