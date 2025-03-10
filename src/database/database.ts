import * as SQLite from "expo-sqlite";

export const getDb = async () => {
  return await SQLite.openDatabaseAsync("fanphil_pos_database.db");
};
