import { LotModel } from "@database/models/lot.model";
import { SequelizeInstance, QueryTypes, Op } from "@hooks/useSequelize";

type QueryParams = {
  params?: any
}
const getLotList = async ({ params }: QueryParams) => {
  return await LotModel.findAll({
    ...params,
    attributes: {
      ...params.attributes,
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then((data: any) => {
      let returnData: any[] = []
      data.map((lot: any) => {
        returnData.push({
          ...lot.toJSON(),
          tcp: lot.toJSON().sqm * lot.toJSON().price_per_sqm
        })
      })
      return returnData
    })
}

const countAvailableUnits = async (params?: any) => {
  // return await SequelizeInstance.query(
  //   "SELECT COUNT(*) FROM lot WHERE client_id IS null",
  //   {
  //     type: QueryTypes.SELECT,
  //     // nest: true
  //     // replacements: { 
  //     //   year: years
  //     // }  
  //   }
  // )

  return await LotModel.count({
    where: {
     [Op.and]: {
      client_id: null,
      ...params
     }
    }
  })
  .then((count : number) => {
    return {
      ...params,
      available: count
    }
  })
}

const insertLotInformation = async (params: any) => {
  return await LotModel.create(params)
}

export {
  getLotList,
  countAvailableUnits,
  insertLotInformation
}