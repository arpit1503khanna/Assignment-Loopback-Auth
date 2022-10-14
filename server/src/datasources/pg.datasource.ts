import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'pg',
  connector: 'postgresql',
  // url: 'postgres://postgres:leomessi@localhost/sf_loopback',
  host: 'HOST',
  port: 'PORT',
  user: 'DBUSERNAME',
  password: 'PASSWORD',
  database: 'DATABASE',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'pg';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pg', {optional: true})
    dsConfig: object = config,
  ) {
    Object.assign(dsConfig, {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
    super(dsConfig);
  }
}
