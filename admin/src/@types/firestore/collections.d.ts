declare module 'homeMaidAdminFirestore' {
  export interface user {
    userName: string;
    tokenId: string;
    createdAt: Date;
  }

  export interface token {
    token: string;
    createdAt: Date;
  }
}
