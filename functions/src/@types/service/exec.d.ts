declare module 'homeMaidServices' {
  export interface execResponse {
    message: string;

    statusCode?: number;

    // when return success, that is empty object
    body?: unknown;
  }
}
