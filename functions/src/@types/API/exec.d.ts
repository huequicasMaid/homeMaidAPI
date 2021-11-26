import express from 'express';
declare module 'homeMaidApi' {
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
