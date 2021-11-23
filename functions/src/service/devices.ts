import axios from 'axios';
import {response} from 'homeMaidApi';
import {SwitchBotAPI} from '@/config';

const devices = async (): Promise<response | void> => {
  const token = SwitchBotAPI.API_TOKEN();
  if (!token) return;

  const res = await axios.get<response>(`${SwitchBotAPI.BASE_URL}/devices`, {
    headers: {
      Authorization: token,
    },
  });
  if (!res.data.body) return;
  return res.data;
};

export default devices;
