declare module 'homeMaidApi' {
  import express from 'express';
  export interface helloRequest extends express.Request {
    query: {
      token?: string;
    };
  }
}
