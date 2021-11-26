import axios from 'axios';
import { execResponse } from 'homeMaidApi';
import { SwitchBotAPI } from '@/config';

const exec = async (
  isTurnOn: boolean,
  withRoom: boolean
): Promise<execResponse | void> => {
  const sceneId = isTurnOn
    ? SwitchBotAPI.Scenes.comeBack(withRoom)
    : SwitchBotAPI.Scenes.goingOut(withRoom);

  const token = SwitchBotAPI.API_TOKEN();
  if (!sceneId || !token) return;

  const res = await axios.post<execResponse>(
    `${SwitchBotAPI.BASE_URL}/scenes/${sceneId}/execute`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  // view StatusCode of HTTP Headers
  if (res.status !== 200) return;
  return res.data;
};

export default exec;
