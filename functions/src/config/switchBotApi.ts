import { config } from 'firebase-functions';

export const BASE_URL = 'https://api.switch-bot.com/v1.0';
export const API_TOKEN = (): string | void => {
  const configData = config();
  if (!configData.switchbot_api_token || !configData.switchbot_api_token.key) {
    return;
  }
  return configData.switchbot_api_token.key;
};

export const Scenes = {
  comeBack: (withRoom: boolean): string | void => {
    const configData = config();
    if (
      !configData ||
      !configData.scenes.come_back_with_room ||
      !configData.scenes.come_back_without_room
    ) {
      return;
    }

    return withRoom
      ? configData.scenes.come_back_with_room
      : configData.scenes.come_back_without_room;
  },

  goingOut: (withRoom: boolean): string | void => {
    const configData = config();
    if (
      !configData ||
      !configData.scenes.going_out_with_room ||
      !configData.scenes.going_out_without_room
    ) {
      return;
    }

    return withRoom
      ? configData.scenes.going_out_with_room
      : configData.scenes.going_out_without_room;
  },
};
