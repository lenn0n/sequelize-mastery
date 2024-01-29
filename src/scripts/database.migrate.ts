require('@utils/custom.console');
// DB
import { createDatabase } from "@hooks/useMysql";
// Models
import { LotModel } from "@database/models/lot.model";
import { ClientModel } from "@database/models/client.model";
import { AgentModel } from "@database/models/agent.model";
import { ProjectModel } from "@database/models/project.model";
import { PaymentModel } from "@database/models/payment.model";
import { MethodModel } from "@database/models/method.model";

const syncTableModels = async () => {
  console.warn("Syncing models...");

  await ProjectModel.sync({ alter: true })
    .then(() => {
      console.info("Project model synced successfully!");
    })
    .catch(() => {
      console.log("ERR: An error occured while trying to sync project model.");

    })

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
    })
    .catch((err: any) => {
      console.log("ERR: An error occured while trying to sync agent model.", err);
    })

  await PaymentModel.sync({ alter: true })
    .then(() => {
      console.info("Payment model synced successfully!");
    })
    .catch(() => {
      console.log("ERR: An error occured while trying to sync Payment model.");

    })

  await MethodModel.sync({ alter: true })
    .then(() => {
      console.info("Method model synced successfully!");

    })
    .catch(() => {
      console.log("ERR: An error occured while trying to sync Method model.");

    })

}

createDatabase()
  .then(() => {
    syncTableModels()
  })
