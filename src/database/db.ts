import { ConnectOptions, connect } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async () => {
  try {
    const connection = await connect('mongodb://localhost:27017/continuum', {
      useNewUrlParser: true
    } as ConnectOptions);

    console.log(`MongoDB Connected ${connection.connection.host}`);
    return connection;
  } catch (err) {
    console.error(err);
  }
};
