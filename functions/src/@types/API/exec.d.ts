declare module 'homeMaidApi' {
  import express from 'express';

  export interface execRequest extends express.Request {
    body: {
      // Enable Light
      isTurnOn?: true;

      // Enable huequica's Room Air Conditioner, Light
      withRoom?: true;
    };

    headers: {
      authorization?: string;
    };
  }
}
