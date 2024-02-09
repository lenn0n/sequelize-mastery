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
import { SequelizeInstance } from "@hooks/useSequelize";

const syncTableModels = async () => {
  console.warn("Syncing models...");

  LotModel.belongsTo(ClientModel, { foreignKey: 'client_id'})
  LotModel.belongsTo(AgentModel, { foreignKey: 'agent_id'})
  LotModel.belongsTo(ProjectModel, { foreignKey: 'project_id'})
  PaymentModel.belongsTo(MethodModel, { foreignKey: 'method_id'})
  PaymentModel.belongsTo(LotModel, { foreignKey: 'lot_id'})
  PaymentModel.belongsTo(ProjectModel, { foreignKey: 'project_id'})

  SequelizeInstance.sync()
}

createDatabase()
  .then(() => {
    syncTableModels()
  })
