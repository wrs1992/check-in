import { getHolidays, getVacation } from './utils/downtimes';
import { Ponto, PontoTest } from './services/Ponto';
import {sleep } from './utils/sleep';

const isHoliday = getHolidays();
const isVacation = getVacation();

const runPonto = async () => {
  if (!isHoliday && !isVacation) {
    await sleep();
    Ponto();
  }
};

runPonto();

