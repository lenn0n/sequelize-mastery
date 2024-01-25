require('@utils/custom.console');

import { createDatabase } from "@hooks/useMysql";
import { LotModel } from "@database/models/lot.model";
import { ClientModel } from "@database/models/client.model";
import { AgentModel } from "@database/models/agent.model";

const syncTableModels = async () => {
  console.warn("Syncing models...");

  await LotModel.sync({ alter: true })
    .then(() => {
      console.info("Lot model synced successfully!");
    })
    .catch(() => {
      console.log("ERR: An error occured while trying to sync lot model.");
 
    })

  await ClientModel.sync({ alter: true })
    .then(() => {
      console.info("Client model synced successfully!");
    })
    .catch(() => {
      console.log("ERR: An error occured while trying to sync client model.");
    })

  await AgentModel.sync({ alter: true })
    .then(() => {
      console.info("Agent model synced successfully!");
      process.exit(0);
    })
    .catch((err: any) => {
      console.log("ERR: An error occured while trying to sync agent model.", err);
      process.exit(0);
    })
}

createDatabase()
  .then(() => {
    syncTableModels()
  })
