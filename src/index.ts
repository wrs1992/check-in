import { getHolidays, getVacation } from './utils/downtimes';
import { Ponto, PontoTest } from './services/Ponto';

const isHoliday = getHolidays();
const isVacation = getVacation();

const runPonto = (): void => {
  if (!isHoliday && !isVacation) {
    Ponto();
  }
};

const runPontoTest = () => {
  if (!isHoliday && !isVacation) {
     PontoTest();
  }
};

runPonto();

