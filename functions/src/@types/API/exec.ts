declare module 'homeMaidApi' {
  export interface execRequest {
    // API TOKEN(WIP)
    token?: string;

    // Enable Light
    isTurnOn?: 'true';

    // Enable huequica's Room Air Conditioner, Light
    withRoom?: 'true';
  }
}
