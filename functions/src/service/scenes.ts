import axios from 'axios';
import { sceneResponse } from 'homeMaidApi';
import { SwitchBotAPI } from '@/config';

const scenes = async (): Promise<sceneResponse | void> => {
  const token = SwitchBotAPI.API_TOKEN();
  if (!token) return;

  const res = await axios.get<sceneResponse>(
    `${SwitchBotAPI.BASE_URL}/scenes`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (!res.data.body) return;
  return res.data;
};

export default scenes;
