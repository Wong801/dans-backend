import { MongoClient } from 'mongodb';
import env from '../config/env';

const connectionString = env('MONGO_URI', '');

const client = new MongoClient(connectionString);

export default client;
