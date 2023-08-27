import CryptoJS from 'crypto-js';
import { SECRET_KEY } from './constants';

export const getEncryptedData = (data: unknown) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

export const getDecryptedData = (ciphertext: string) =>
  JSON.parse(
    CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(CryptoJS.enc.Utf8),
  );
