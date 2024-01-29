import { AgentModel } from "@database/models/agent.model";

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
  return await AgentModel.create(params).catch((err: any)=> {  console.log(err);
  })
}

const destroyAgent = async (params: any) => {
  return await AgentModel.destroy({
    where: {
      ...params
    }
  })
}


export {
  getAgentList,
  updateAgentInfo,
  insertAgentInfo,
  destroyAgent
}