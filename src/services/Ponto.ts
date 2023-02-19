import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';
import { Browser, Page, executablePath } from 'puppeteer';

import { getFormattedDate } from '../utils/getFormattedDate';
import {
  PAGE_URL,
  USER_LOGIN,
  USER_PASSWORD,
  PONTO_URL,
  DEFAULT_TIMEOUT,
} from '../constants';
import { sendMessage, sendImageWithText } from './Message';

const timeout = DEFAULT_TIMEOUT as number;

puppeteer.use(pluginStealth());

const getOptions = async () => {
    return {
      args: ['--no-sandbox'],
      defaultViewport: {
        width: 1200,
        height: 800,
        deviceScaleFactor: 1
    },
      executablePath: executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
    };
};

export const Ponto = async () => {
  try {
    const options = await getOptions();

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();

    // Configure the navigation timeout - Pass 0 to disable the timeout
    page.setDefaultNavigationTimeout(timeout);

    await page.goto(PAGE_URL);

    await sleepFor(page, 20000, 60000);

    await page.waitForSelector('.card-body.p-md-0');
    console.log('>Página de Login Carregada!');

    //user
    await page.waitForSelector('#Login');
    await page.type('#Login', USER_LOGIN, { delay: 200 });

    await page.click('.login__botao-continuar');

    //pass
    await page.waitForSelector('#Senha');
    await page.type('#Senha', USER_PASSWORD, { delay: 200 });

    await page.click('.login__botao-pronto');
    console.log('>Realizando Login...');

    await page.waitForSelector('#divdadosareatrabalho');
    console.log('>Página Principal Carregada!');

    await page.goto(PONTO_URL);
    console.log('>Página Ponto Carregada!');
    await sleepFor(page, 2000, 3000);

    await page.waitForSelector('#botaoMarcarPonto');

    await page.click('#botaoMarcarPonto');
    console.log('>Realizando Ponto...');
    await sleepFor(page, 4000, 5000);

    const msgSucesso = await page.evaluate(() => {
      const element = document.querySelector('#divMensagemWeb');
      return element ? element.textContent : '';
    });

    if (msgSucesso === 'Marcação registrada com sucesso.') {
      console.log('>Ponto Registrado com sucesso!');
    } else {
      console.log('>Ocorreu algum erro na marcação de ponto');
    }

    await sleepFor(page, 500, 600);

    await makeScreenshotAndSendMessage(
      page,
      '#divMensagemWeb',
      'Ponto registrado'
    );

    console.log('>Operação Concluída!');

    await browser.close();
    return;
  } catch (error) {
    console.log(error);
  }
};

export const PontoTest = async () => {
  try {
    const options = await getOptions();

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();

    // Configure the navigation timeout - Pass 0 to disable the timeout
    page.setDefaultNavigationTimeout(timeout);
    console.log('timeout: '+ timeout);
    await page.goto(PAGE_URL);

    console.log('>Teste iniciado!');

    await sleepFor(page, 20000, 60000);

    await page.waitForSelector('.card-body.p-md-0');
    console.log('>Página de Login Carregada!');

    //user
    await page.waitForSelector('#Login');
    await page.type('#Login', USER_LOGIN, { delay: 200 });

    await page.click('.login__botao-continuar');

    //pass
    await page.waitForSelector('#Senha');
    await page.type('#Senha', USER_PASSWORD, { delay: 200 });

    await page.click('.login__botao-pronto');
    console.log('>Realizando Login...');

    await page.waitForSelector('#divdadosareatrabalho');
    console.log('>Página Principal Carregada!');

    await page.goto(PONTO_URL);
    console.log('>Página Ponto Carregada!');
    await sleepFor(page, 2000, 3000);

    await page.waitForSelector('#botaoMarcarPonto');

    await makeScreenshotAndSendMessage(
      page,
      '#botaoMarcarPonto',
      'Teste Realizado'
    );

    console.log('>Teste Concluído!');

    await browser.close();
    return;
  } catch (error) {
    console.log(error);
  }
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

let sleepFor = async (page: any, min: number, max: number) => {
  let sleep_duration = randomIntFromInterval(min, max);
  console.log('Aguardando por', sleep_duration / 1000, 'segundos');
  await page.waitForTimeout(sleep_duration);
};

const makeScreenshotAndSendMessage = async (
  page: any,
  elementName: string,
  messsage: string
) => {
  const data = getFormattedDate('datetime');
  const msg = `${messsage}: ${data}`;
  const element = await page.$(elementName);

  if (element) {
    const clip = await page.evaluate((el: any) => {
      const { width, height, top: y, left: x } = el.getBoundingClientRect();
      return { width, height, x, y };
    }, element);

    const b64string = (await page.screenshot({
      clip,
      encoding: 'base64',
    })) as string;

    await sendImageWithText(b64string, msg);
  } else {
    await sendMessage(msg);
  }
};
