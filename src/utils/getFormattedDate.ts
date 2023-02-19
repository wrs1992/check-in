export const getFormattedDate = (format: 'date' | 'datetime', replaceSlash: boolean = false) => {
  const date = new Date();

  const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  } as const;

  const datetimeOptions = {
    ...dateOptions,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }  as const;

  let formattedDate = format === 'date'
    ? new Intl.DateTimeFormat('pt-BR', dateOptions).format(date)
    : new Intl.DateTimeFormat('pt-BR', datetimeOptions).format(date);

  if (replaceSlash) {
    formattedDate = formattedDate.replace(new RegExp('/', 'g'), '-');
  }

  return formattedDate;

};
