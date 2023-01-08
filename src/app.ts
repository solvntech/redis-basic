import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { RedisUtil } from '@utils/redis.util';

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;
const redisHost = process.env.REDIS_HOST as string;
const redisPort = process.env.REDIS_PORT as string;

RedisUtil.connect(redisHost, redisPort, '');

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
