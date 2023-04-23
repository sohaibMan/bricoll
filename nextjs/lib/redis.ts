// import { createClient } from 'redis';
import {Redis} from "ioredis"

const getRedisUrl = () => {
  if(process.env.REDIS_URL) return process.env.REDIS_URL;

  throw new Error("REDIS_URL is not defined!")
}


export const redis = new Redis(getRedisUrl())


// const client = createClient();

// client.on('connect', () => console.log('Connected to redis...'));

// await client.connect();