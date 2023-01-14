import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { RedisUtil } from '@utils/redis.util';
import { MorganMiddleware } from '@middlewares/morgan.middleware';
import { LoggerUtil } from '@utils/logger.util';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;
const redisHost = process.env.REDIS_HOST as string;
const redisPort = process.env.REDIS_PORT as string;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(MorganMiddleware.logger());

RedisUtil.connect(redisHost, redisPort, '');

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'hello',
    });
});

app.listen(port, () => {
    LoggerUtil.info(
        `⚡️[server]: Server is running at http://localhost:${port}`
    );
});
