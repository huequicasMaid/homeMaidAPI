import axios from 'axios';
import { devicesResponse } from 'homeMaidServices';
import { SwitchBotAPI } from '@/config';

const devices = async (): Promise<devicesResponse | void> => {
  const token = SwitchBotAPI.API_TOKEN();
  if (!token) return;

  const res = await axios.get<devicesResponse>(
    `${SwitchBotAPI.BASE_URL}/devices`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (!res.data.body) return;
  return res.data;
};

export default devices;
