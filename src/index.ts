import cron from 'node-cron';
import { getHolidays, getVacation } from './utils/downtimes';
import { Ponto, PontoTest } from './services/Ponto';

const isHoliday = getHolidays();
const isVacation = getVacation();
const timezone = 'America/Sao_Paulo';

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

cron.schedule('12 20 * * 0', runPontoTest, {
  timezone,
});

cron.schedule('58 7 * * 1-5', runPonto, {
  timezone,
});
cron.schedule('00 13 * * 1-5', runPonto, {
  timezone,
});
cron.schedule('00 14 * * 1-5', runPonto, {
  timezone,
});
cron.schedule('00 18 * * 1-5', runPonto, {
  timezone,
});
