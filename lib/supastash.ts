import { openDatabaseAsync } from "expo-sqlite";
import { configureSupastash } from "supastash";
import { supabase } from "./supabase";
import { initializeSchemas } from "./supastashSchema";

configureSupastash({
  supabaseClient: supabase,
  dbName: "fanphil_pos_app.db",
  sqliteClient: { openDatabaseAsync },
  sqliteClientType: "expo",
  debugMode: true,
  onSchemaInit: initializeSchemas,
});
