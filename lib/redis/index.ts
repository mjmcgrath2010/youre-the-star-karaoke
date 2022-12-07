import Redis from "ioredis";
const redisUrl: string = process.env.REDIS_URL || "";

const redis = new Redis(redisUrl);

export default redis;
