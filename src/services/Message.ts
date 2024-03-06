import { Telegraf } from 'telegraf';
import { BOT_TOKEN, BOT_CHAT_ID } from '../constants';

const bot = new Telegraf(BOT_TOKEN);

export const sendMessage = async (msg: string) => {
  await bot.telegram.sendMessage(BOT_CHAT_ID, msg);
};

export const sendImageWithText = async (imagePath: string, msg: string) => {
  await bot.telegram.sendPhoto(
    BOT_CHAT_ID,
    { source: Buffer.from(imagePath, 'base64') },
    { caption: msg }
  );
};
