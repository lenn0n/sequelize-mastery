import { LotModel } from "@database/models/lot.model";
import { PaymentModel } from "@database/models/payment.model";
import { Op, literal, fn, col } from "@hooks/useSequelize";

type QueryParams = {
  params?: any
}
const getLotList = async ({ params }: QueryParams) => {
  return await LotModel.findAll({
    attributes: {
      include: [
        [literal(`(SELECT client_name FROM client WHERE client.client_id = lot.client_id)`), 'client_name'],
        [literal(`(SELECT project_name FROM project WHERE project.project_id = lot.project_id)`), 'project_name'],
        [literal(`(SELECT agent_name FROM agent WHERE agent.agent_id = lot.agent_id)`), 'agent_name'],
        [literal(`(SELECT SUM(amount) FROM payment as p WHERE p.lot_id = lot.lot_id AND p.project_id = lot.project_id)`), 'collectibles'],
      ],
      exclude: ['createdAt', 'updatedAt']
    }
  })
    .then((data: any) => {
      let returnData: any[] = []
      data.map((data: any) => {
        const lot = data.toJSON()
        const tcpPrice = lot.sqm * lot.price_per_sqm;
        const discount = tcpPrice * (lot.discount / 100)
        returnData.push({
          ...lot,
          tcp: tcpPrice,
          net_tcp: tcpPrice - discount,
          receivables: (tcpPrice - discount) - Number(lot.collectibles)
        })
      })
      return returnData
    })
}

const getOverallLot = async ({ params }: QueryParams) => {
  let raw_receivables = await LotModel.findAll({
    attributes: [
      [
        literal(
          `SUM( ( (sqm * price_per_sqm) - ( (sqm * price_per_sqm) * ( discount / 100) ) ) )`), 'R'
      ],
    ],
    where: params,
    raw: true
  })
  
  let collectibles = await PaymentModel.findAll({
    attributes: [
      [fn('SUM', col('amount')), 'C']
    ],
    where: params,
    raw: true
  })


  return {
    receivables: Number(raw_receivables[0]['R']) - Number(collectibles[0]['C']),
    collectibles: Number(collectibles[0]['C'])
  }
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
  lot_id: number
}

const updateLotInfo = async (payload: UpdateDiscountType) => {
  return await LotModel.update({ ...payload.fields }, {
    where: {
      [Op.and]: [
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
  destroyLot,
  getOverallLot
}