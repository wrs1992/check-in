import * as dotenv from 'dotenv';
dotenv.config();

//Puppeteer
export const DEFAULT_TIMEOUT = process.env.DEFAULT_TIMEOUT ? process.env.DEFAULT_TIMEOUT : 0;

//App
export const PONTO_TOKEN = process.env.PONTO_TOKEN ?? '';

//Telegram
export const BOT_TOKEN = process.env.BOT_TOKEN ?? '';
export const BOT_CHAT_ID = process.env.BOT_CHAT_ID ?? '';

//Pg Ponto
export const PAGE_URL = process.env.PAGE_URL ?? '';
export const PONTO_URL = process.env.PONTO_URL ?? '';
export const USER_LOGIN = process.env.USER_LOGIN ?? '';
export const USER_PASSWORD = process.env.USER_PASSWORD ?? '';

//downtimes
export const VACATION = process.env.VACATION === 'TRUE';
