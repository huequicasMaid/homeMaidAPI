declare module 'homeMaidServices' {
  export interface scene {
    sceneId: string;
    sceneName: string;
  }

  export interface sceneResponse {
    message: string;
    statusCode?: number;
    body?: scene[];
  }
}
