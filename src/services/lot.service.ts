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
      data.map((data: any) => {
        const lot = data.toJSON()
        const tcpPrice = lot.sqm * lot.price_per_sqm;
        returnData.push({
          ...lot,
          tcp: tcpPrice,
          net_tcp: tcpPrice - (tcpPrice * (lot.discount / 100))
        })
      })
      return returnData
    })
}

const countAvailableUnits = async (params?: {}) => {
  return await LotModel.count({
    where: {
      [Op.and]: {
        client_id: null,
        ...params
      }
    }
  })
    .then((count: number) => {
      return {
        ...params,
        available: count
      }
    })
}

type UpdateDiscountType = {
  fields: {},
  project_id: number,
  lot_id: number
}

const updateLotInfo = async (payload: UpdateDiscountType) => {
  return await LotModel.update({ ...payload.fields }, {
    where: {
      [Op.and]: [
        { project_id: payload.project_id },
        { lot_id: payload.lot_id },
      ]
    }
  })
}

const insertLotInformation = async (params: any) => {
  return await LotModel.create(params)
}

const destroyLot = async (params: any) => {
  return await LotModel.destroy({
    where: {
      ...params
    }
  })
}

export {
  getLotList,
  countAvailableUnits,
  insertLotInformation,
  updateLotInfo,
  destroyLot
}