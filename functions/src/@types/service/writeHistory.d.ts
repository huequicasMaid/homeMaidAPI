declare module 'homeMaidServices' {
  import { user as userDocument } from 'homeMaidFirestore';
  import { execResponse } from 'homeMaidServices';
  export interface writeHistory {
    category: 'apiExecute';
    user: userDocument;
    endpoint: string;
    result: execResponse;
  }
}
