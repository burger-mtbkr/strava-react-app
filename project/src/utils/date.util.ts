import moment from 'moment';

export const getCurrentTaxYearEnding = (): Date => {
  const now: Date = new Date();
  const currentYear: number = now.getFullYear();
  const currentMonth = now.getMonth();
  const selectedYear: number = currentMonth < 3 ? currentYear : currentYear + 1;
  return new Date(`3/31/${selectedYear}`);
};

export const getCurrentTaxYearEndingString = (): string => {
  const currentYear = getCurrentTaxYearEnding();
  const yearEndString = moment(currentYear).format('DD/MM/YYYY');
  return yearEndString;
};

export const buildDates = (): Array<string> => {
  const dateList: string[] = [];
  const now: Date = new Date();
  const currentYear: number = now.getFullYear();
  const firstEntryYear = 2016; // First year we have data for

  for (let i: number = currentYear + 1; i >= firstEntryYear; i--) {
    const d: Date = new Date(`3/31/${i}`);
    dateList.push(moment(d).format('DD/MM/YYYY'));
  }
  return dateList;
};

export const getDateFromPeriod = (period?: string): Date =>
  period ? moment(period, 'DD-MM-YYYY').toDate() : getCurrentTaxYearEnding();

export const toHmsString = (seconds: number): string => {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor(seconds / 60) - hours * 60;
  const s = seconds % 60;

  if (hours && minutes && s) {
    return `${hours}h ${minutes}m ${s}s`;
  }

  if (hours && minutes) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes && s) {
    return `${minutes}m ${s}s`;
  }

  if (hours && s) {
    return `${hours}h ${0}m ${s}s`;
  }

  return `${0}h ${0}m ${0}s`;
};

export const toHmString = (seconds: number): string => {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor(seconds / 60) - hours * 60;

  if (hours && minutes) {
    return `${hours}h ${minutes}m`;
  }

  if (hours) {
    return `${hours}h`;
  }

  return `${0}h ${minutes}m`;
};

export const getFirstDayOfCurrentWeek = (): Date => {
  const d = new Date(new Date().toDateString());
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const getFirstDatOfWeek = (d: Date): Date => {
  const dateOnly = new Date(d.toDateString());
  const day = dateOnly.getDay();
  const diff = dateOnly.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const getUnix = (): number => Math.round(+new Date() / 1000);

export const getUtcDate = (date: Date) => {
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );

  return new Date(nowUtc);
};
