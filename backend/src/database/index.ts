import { createConnection, getConnectionOptions } from "typeorm";

// TYPES
interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;

  /** This should be EXACTLY the name given to the database service */
  newOptions.host = "database";

  createConnection({
    ...options,
  });
});
