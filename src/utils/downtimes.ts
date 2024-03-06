import { getFormattedDate } from './getFormattedDate';
import { VACATION } from '../constants';
import Holidays from '../data/holidays.json'

const today = getFormattedDate('date', true);
const isVacation =  VACATION as Boolean;

export const getHolidays = () => {
  return Holidays.includes(today);
};
export const getVacation = () => {
  return isVacation;
}

