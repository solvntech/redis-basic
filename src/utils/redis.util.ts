import { createClient, RedisClientType } from 'redis';
import { LoggerUtil } from '@utils/logger.util';

export class RedisUtil {
    private static _Instance: RedisClientType = null as any;
    static connect(host: string, port: string, pass: string) {
        if (RedisUtil._Instance) {
            return RedisUtil._Instance;
        }
        const instance: RedisClientType = createClient({
            url: `redis://${host}:${port}`,
        });
        instance.connect().then(
            () => {
                LoggerUtil.info(`⚡️[Redis]: connected!`);
                RedisUtil._Instance = instance;
            },
            (reason) => {
                LoggerUtil.error(`[Redis]: Connect failed. reason: ${reason}`);
            }
        )
    }

    static get instance() {
        return RedisUtil._Instance;
    }
}
