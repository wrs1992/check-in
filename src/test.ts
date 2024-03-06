import { PontoTest } from './services/Ponto';
import {sleep } from './utils/sleep';


const runPontoTest = async () => {
     await sleep();
     PontoTest();
};

runPontoTest();

