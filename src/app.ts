import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { RedisUtil } from '@utils/redis.util';
import { MorganMiddleware } from '@middlewares/morgan.middleware';
import { LoggerUtil } from '@utils/logger.util';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ConnectDatabaseUtil } from '@utils/connect-database.util';
import compression from 'compression';
import * as fs from 'fs';

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;
const redisHost = process.env.REDIS_HOST as string;
const redisPort = process.env.REDIS_PORT as string;

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(MorganMiddleware.logger());

RedisUtil.connect(redisHost, redisPort, '');
ConnectDatabaseUtil.connect();

app.get('/', (req: Request, res: Response) => {
    fs.readFile('./src/mocks/MOCK_DATA.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data as unknown as string));
        }
    })
});

app.listen(port, () => {
    LoggerUtil.info(
        `⚡️[server]: Server is running at http://localhost:${port}`
    );
});
