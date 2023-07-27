import Cryptr from "cryptr";

const secret = process.env.SECRET;
const cryptr = new Cryptr(secret || "");

export const encrypt = (data: string) => cryptr.encrypt(data);
export const decrypt = (data: string) => cryptr.decrypt(data);
