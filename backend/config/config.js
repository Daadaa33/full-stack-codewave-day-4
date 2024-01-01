import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const dbURL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET
export const CLOUDINART_CLOULD_NAME = process.env.CLOUDINART_CLOULD_NAME;
export const CLOUDINART_API_KEY = process.env.CLOUDINART_API_KEY;
export const CLOUDINART_API_SECRET = process.env.CLOUDINART_API_SECRET;