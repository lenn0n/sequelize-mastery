import { LotModel } from "@database/models/lot.model";
import { SequelizeInstance, QueryTypes } from "@hooks/useSequelize";

type QueryFilter = {
  filter: {}
}
const getLotList = async ({ filter }: QueryFilter) => {
  return await LotModel.findAll({ filter })
}

const getAvailableLot = async () => {
  return await SequelizeInstance.query(
    "SELECT * FROM lot WHERE client_id = null",
    {
      type: QueryTypes.SELECT,
      // replacements: { 
      //   year: years
      // }  
    }
  )
}

export {
  getLotList,
  getAvailableLot
}