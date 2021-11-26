declare module 'homeMaidApi' {
  import express from 'express';

  export interface execRequest extends express.Request {
    body: {
      // API TOKEN(WIP)
      token?: string;

      // Enable Light
      isTurnOn?: true;

      // Enable huequica's Room Air Conditioner, Light
      withRoom?: true;
    };
  }
}
