import { NextFunction, Request, Response } from "express";
import { destroyAgent, getAgentList, insertAgentInfo, updateAgentInfo } from "@services/agent.service";

const retrieveAgent = async (req: Request, res: Response, next: NextFunction) => {
  let query: { agent_id?: number } = {};

  if (req.query.agent_id) {
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
    .catch((err) => {
      next()
    })
}

const updateAgent = async (req: Request, res: Response, next: NextFunction) => {
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
    .catch((err) => {
      next()
    })
}

const insertAgent = async (req: Request, res: Response, next: NextFunction) => {
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
    .catch((err) => {
      next()
    })
}

const removeAgent = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.agent_id) {
    return res.status(422).send("Please provide agent id.")
  }

  return await destroyAgent({ agent_id: req.query.agent_id })
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
    .catch((err) => {
      next()
    })
}

export {
  retrieveAgent,
  updateAgent,
  removeAgent,
  insertAgent
}