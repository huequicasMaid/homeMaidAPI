import axios, { AxiosResponse } from 'axios';
import { execResponse } from 'homeMaidServices';
import { SwitchBotAPI } from '@/config';

/**
 * SwitchBot のAPIリクエストの保管場所
 */
export class SwitchBotRepository {
  private readonly token: string = '';

  /**
   * @param {string} token API token
   */
  constructor(token: string) {
    this.token = token;
  }

  /**
   * request executing scene for switchBotAPI
   * @param {string} sceneId executing sceneId
   * @return {Promise} native axios object
   */
  async execScene(sceneId: string): Promise<AxiosResponse<execResponse>> {
    return await axios.post<execResponse>(
      `${SwitchBotAPI.BASE_URL}/scenes/${sceneId}/execute`,
      {},
      {
        headers: {
          Authorization: this.token,
        },
      }
    );
  }
}
