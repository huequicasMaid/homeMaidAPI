import { config } from 'firebase-functions';

export const BASE_URL = 'https://api.switch-bot.com/v1.0';
export const API_TOKEN = (): string | void => {
  const configData = config();
  if (!configData.switchbot_api_token || !configData.switchbot_api_token.key) {
    return;
  }
  return configData.switchbot_api_token.key;
};
