import { destroyAgent, getAgentList, insertAgentInfo, updateAgentInfo } from "@services/agent.service";
import { Request, Response } from "express";

const retrieveAgent = async (req: Request, res: Response) => {
  let query : { agent_id?: number } = {};

  if (req.query.agent_id){
    query['agent_id'] = Number(req.query.agent_id)
  }
  return await getAgentList({ 
    params: {
      attributes: {},
      where: {
        ...query
      }
    }
  })
    .then((data) => {
      return res.status(200).json(data)
    })
}

const updateAgent = async (req: Request, res: Response) => {
  if (!req.body.agent_id) {
    return res.status(422).send("Please provide agent id.")
  }

  const payload = {
    fields: {
      ...req.body,
      agent_id: undefined
    },
    agent_id: req.body.agent_id
  }

  return await updateAgentInfo(payload)
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: "Successfully updated agent information.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this agent. " +
            "ERR: agent.controlller.ts (updateAgent)",
        })
      }
    })
}

const insertAgent = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(422).send("Please provide agent name.")
  }

  const payload = {
    ...req.body
  }

  return await insertAgentInfo(payload)
    .then((inserted) => {
      if (inserted) {
        res.status(200).json({
          message: "Agent added successfully",
        })
      } else {
        res.status(422).json({
          message: "Couldn't create agent. " +
            "ERR: agent.controlller.ts (insertAgent)",
        })
      }
    })
}

const removeAgent = async (req: Request, res: Response) => {
  if (!req.body.agent_id) {
    return res.status(422).send("Please provide agent id.")
  }

  return await destroyAgent({ agent_id: req.body.agent_id })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          message: "Successfully deleted agent data.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this agent. " +
            "ERR: agent.controlller.ts (deleteAgent)",
        })
      }
    })
}

export {
  retrieveAgent,
  updateAgent,
  removeAgent,
  insertAgent
}