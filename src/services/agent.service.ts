import { AgentModel } from "@database/models/agent.model";
import { LotModel } from "@database/models/lot.model";
import { SequelizeInstance, QueryTypes, Op, literal, fn, col } from "@hooks/useSequelize";

const getAgentList = async ({ params }: any) => {
  return await AgentModel.findAll({
    ...params,
    attributes: {
      ...params.attributes,
      exclude: ['createdAt', 'updateAt']
    }
  })
}

type UpdateAgentType = {
  fields: {},
  agent_id: number
}

const updateAgentInfo = async (payload: UpdateAgentType) => {
  return await AgentModel.update({ ...payload.fields }, {
    where: {
      agent_id: payload.agent_id
    }
  })
}

const insertAgentInfo = async (params: any) => {
  return await AgentModel.create(params).catch((err: any) => {
    console.log(err);
  })
}

const destroyAgent = async (params: any) => {
  return await AgentModel.destroy({
    where: {
      ...params
    }
  })
}

const retrieveTopAgent = async () => {
  // Retrieve agent with the highest sales of all time.
  return await LotModel.findOne({
    attributes: [
      [
        literal(`(SELECT SUM(amount) FROM payment as p WHERE p.lot_id = lot.lot_id AND p.project_id = lot.project_id)`),
        'collectibles'
      ],
      [
        literal(`(SELECT name FROM agent WHERE agent.agent_id = lot.agent_id)`),
        'agent_name'
      ],
    ],
    order: [
      [
        col('collectibles'), 'DESC'
      ]
    ]
  },)
}

export {
  getAgentList,
  updateAgentInfo,
  insertAgentInfo,
  destroyAgent,
  retrieveTopAgent
}