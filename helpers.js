export const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currDate = getStartOfDay(new Date(startDate));
  const end = getStartOfDay(new Date(endDate));
  
  while (currDate <= end) {
    dates.push(new Date(currDate));
    currDate.setUTCDate(currDate.getUTCDate() + 1);
  }
  return dates;
};

export const calculateStreak = async (HabitLogModel, habitId) => {
  const logs = await HabitLogModel.find({ habit: habitId, completed: true }).sort({ date: -1 });
  let streak = 0;
  let currDate = getStartOfDay(new Date());
  
  for (let log of logs) {
    const logDate = getStartOfDay(log.date);
    if (logDate.getTime() === currDate.getTime()) {
      streak++;
      currDate.setUTCDate(currDate.getUTCDate() - 1);
    } else if (logDate.getTime() > currDate.getTime()) {
      continue;
    } else {
      break;
    }
  }
  return streak;
};
