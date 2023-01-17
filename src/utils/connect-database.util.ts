import { createPool, Pool } from 'mysql2';
import * as process from 'process';
import _ from 'lodash';
import { LoggerUtil } from '@utils/logger.util';

export class ConnectDatabaseUtil {
    private static _connection: Pool;
    static connect() {
        if (ConnectDatabaseUtil._connection) {
            return ConnectDatabaseUtil._connection;
        }

        const host = process.env.MYSQL_HOST;
        const port = _.toNumber(process.env.MYSQL_PORT);
        const user = process.env.MYSQL_USER;
        const password = process.env.MYSQL_PASSWORD;
        const database = process.env.MYSQL_DATABASE;

        ConnectDatabaseUtil._connection = createPool({
            host,
            port,
            user,
            password,
            database,
            connectionLimit: 10,
        });

        ConnectDatabaseUtil._connection.query(
            'show variables like "version%"',
            (err, result) => {
                if (err) {
                    LoggerUtil.error(err);
                } else {
                    LoggerUtil.info(
                        `⚡️[Database]: connected! \n${_.join(
                            _.map(result as any[], (record) => {
                                return `${record.Variable_name}: ${record.Value}`;
                            }),
                            '\n'
                        )}`
                    );
                }
            }
        );

        return ConnectDatabaseUtil._connection;
    }
}
