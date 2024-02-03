import { AgentModel } from "@database/models/agent.model";
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
  return await AgentModel.create(params)
    .then(() => {
      return {
        result: true
      }
    })
    .catch((err: any) => {
      let messageError = ""
      err.errors.map((data: any) => {
        if (data.type == 'unique violation') {
          messageError = `The agent name was already taken. (${data.value})`
        } else {
          messageError = data.message
        }
      })
      return {
        result: false,
        message: messageError
      }
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
  return await AgentModel.findAll({
    attributes: [
      [
        literal("(SELECT SUM(amount) FROM payment as P JOIN lot as L ON P.lot_id = L.lot_id WHERE agent.agent_id = L.agent_id)",), 'collectibles'
      ],
      "agent_name"
    ],
    order: [
      [
        col('collectibles'), 'DESC'
      ]
    ]
  },)
}

const countAgent = async () => {
  return await AgentModel.count()
}

export {
  getAgentList,
  updateAgentInfo,
  insertAgentInfo,
  destroyAgent,
  retrieveTopAgent,
  countAgent
}