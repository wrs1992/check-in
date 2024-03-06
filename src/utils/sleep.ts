export function sleep(): Promise<void> {
  const randomDelay = [0, 15, 35, 40]; // Array contendo os valores possíveis

  const index = Math.floor(Math.random() * randomDelay.length); // Seleciona aleatoriamente um índice do array
  const selectedDelay = randomDelay[index]; // Obtém o valor correspondente ao índice selecionado
  console.log('waiting for ' + selectedDelay + ' seconds')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, selectedDelay * 1000); // Multiplica por 1000 para converter de segundos para milissegundos
  });
}
