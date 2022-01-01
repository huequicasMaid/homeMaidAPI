declare module 'homeMaidFirestore' {
  import { user as userDocument } from 'homeMaidFirestore';
  import { execResponse } from 'homeMaidServices';
  export interface user {
    userName: string;
    tokenId: string;
  }

  export interface token {
    token: string;
  }

  export interface history {
    category: 'apiExecute';
    user: userDocument;
    endpoint: string;
    result: execResponse;
    createdAt: Date;
  }
}
