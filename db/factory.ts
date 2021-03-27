import mongoose from 'mongoose';
import { Config } from '../config'

let db: mongoose.Connection;
class DbFactory{

  private config: Config;

  constructor(config: Config) {
      this.config = config;
  }

  init = async() => {
    const dbConnectionString = this.config.getValue('DB_CONNECTION_STRING');
    db = mongoose.createConnection(dbConnectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
  });
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('DB connected');
    });
  }
}

export {DbFactory, db};