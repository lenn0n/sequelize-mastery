import { destroyClient, getClientList, insertClientInfo, updateClientInfo } from "@services/client.service";
import { Request, Response } from "express";

const retrieveClient = async (req: Request, res: Response) => {
  let query : { client_id?: number } = {};

  if (req.query.client_id){
    query['client_id'] = Number(req.query.client_id)
  }
  return await getClientList({ 
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

const updateClient = async (req: Request, res: Response) => {
  if (!req.body.client_id) {
    return res.status(422).send("Please provide client id.")
  }

  const payload = {
    fields: {
      ...req.body,
      client_id: undefined
    },
    client_id: req.body.client_id
  }

  return await updateClientInfo(payload)
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: "Successfully updated client information.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this client. " +
            "ERR: client.controlller.ts (updateClient)",
        })
      }
    })
}

const insertClient = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(422).send("Please provide client name.")
  }

  const payload = {
    ...req.body
  }

  return await insertClientInfo(payload)
    .then((inserted) => {
      if (inserted) {
        res.status(200).json({
          message: "Client added successfully",
        })
      } else {
        res.status(422).json({
          message: "Couldn't create client. " +
            "ERR: client.controlller.ts (insertClient)",
        })
      }
    })
}

const removeClient = async (req: Request, res: Response) => {
  if (!req.body.client_id) {
    return res.status(422).send("Please provide client id.")
  }

  return await destroyClient({ client_id: req.body.client_id })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          message: "Successfully deleted client data.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this client. " +
            "ERR: client.controlller.ts (deleteClient)",
        })
      }
    })
}

export {
  retrieveClient,
  updateClient,
  removeClient,
  insertClient
}