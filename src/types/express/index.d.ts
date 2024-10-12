import express from 'express';
import { JwtPayload } from '../../interfaces';
export interface MulterFile {
  name: string;
  mv: (path: string, callback: (err: any) => void) => void;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      files?: {
        [fieldname: string]: MulterFile[];
      };
    }
  }
}
