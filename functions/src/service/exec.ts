import axios from 'axios';
import { execResponse } from 'homeMaidServices';
import { SwitchBotAPI } from '@/config';
import {
  ExecutionFailedException,
  SwitchBotAPISceneIdNotFound,
  SwitchBotAPITokenNotFoundException,
} from '@/exception';

/**
 * Call scene execute to SwitchBot API Service
 * @param {boolean} isTurnOn if enabled, switch selling light to ON
 * @param {boolean} withRoom if enabled, switch with air conditioner
 * @return {Object} API call result
 * @throws {SwitchBotAPISceneIdNotFound} SceneId not found in Firebase config
 * @throws {SwitchBotAPITokenNotFoundException} SwitchBot API token not found
 * @throws {ExecutionFailedException} Failed API request on SwitchBot
 */
const exec = async (
  isTurnOn: boolean,
  withRoom: boolean
): Promise<{ data: execResponse; execPath: string }> => {
  const sceneId = isTurnOn
    ? SwitchBotAPI.Scenes.comeBack(withRoom)
    : SwitchBotAPI.Scenes.goingOut(withRoom);

  const token = SwitchBotAPI.API_TOKEN();
  if (!sceneId) throw new SwitchBotAPISceneIdNotFound();
  if (!token) throw new SwitchBotAPITokenNotFoundException();

  const res = await axios.post<execResponse>(
    `${SwitchBotAPI.BASE_URL}/scenes/${sceneId}/execute`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  // view StatusCode of HTTP Headers
  if (res.status !== 200) throw new ExecutionFailedException();

  return {
    data: res.data,
    execPath: `${SwitchBotAPI.BASE_URL}/scenes/${sceneId}/execute`,
  };
};

export default exec;
