import { LotModel } from "@database/models/lot.model";
import { SequelizeInstance, QueryTypes, Op, literal } from "@hooks/useSequelize";

type QueryParams = {
  params?: any
}
const getLotList = async ({ params }: QueryParams) => {
  return await LotModel.findAll({
    attributes: {
      include: [
        [literal(`(SELECT name FROM client WHERE client.client_id = lot.client_id)`), 'client_name'],
        [literal(`(SELECT name FROM project WHERE project.project_id = lot.project_id)`), 'project_name'],
        [literal(`(SELECT name FROM agent WHERE agent.agent_id = lot.agent_id)`), 'agent_name'],
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
  let raw_receivables = await SequelizeInstance.query(`
  SELECT SUM(( (sqm * price_per_sqm) - ( (sqm * price_per_sqm) * ( discount / 100) ) )) 
  as r FROM lot WHERE project_id = ${params?.project_id}`,
    {
      raw: true,
      type: QueryTypes.SELECT
    })
  let collectibles = await SequelizeInstance.query(`
    SELECT SUM(amount) as c FROM payment WHERE project_id = ${params?.project_id}`,
    {
      raw: true,
      type: QueryTypes.SELECT
    })

  return {
    receivables: Number(raw_receivables[0]['r'] ) - Number(collectibles[0]['c'] ),
    collectibles: Number(collectibles[0]['c'] )
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
  destroyLot,
  getOverallLot
}