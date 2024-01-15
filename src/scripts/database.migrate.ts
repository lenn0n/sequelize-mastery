require('@utils/custom.console');

import { createDatabase } from "@hooks/useMysql";
import { StudentModel } from "@database/models/student.model";

const syncTableModels = async () => {
  console.warn("Syncing models...");

  StudentModel.sync({ alter: true })
    .then(() => {
      console.info("Student model synced successfully!");
      process.exit(0);
    })
    .catch(() => {
      console.log("ERR: An error occured while trying to sync student model.");
      process.exit(0);
    })
}

createDatabase()
  .then(()=>{ 
    syncTableModels()
  })
