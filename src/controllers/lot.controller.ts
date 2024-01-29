import { Request, Response } from "express";
import { countAvailableUnits, destroyLot, getLotList, insertLotInformation, updateLotInfo } from "@services/lot.service"
import { literal } from "@hooks/useSequelize";

const retrieveLot = async (req: Request, res: Response) => {
  return await getLotList({
    params: {
      attributes: {
        include: [
          [literal(`(SELECT name FROM client WHERE client.client_id = lot.client_id)`), 'client_name'],
          [literal(`(SELECT name FROM project WHERE project.project_id = lot.project_id)`), 'project_name'],
          [literal(`(SELECT name FROM agent WHERE agent.agent_id = lot.agent_id)`), 'agent_name'],
        ]
      }
    }
  }).then((data) => {
    res.status(200).json(data)
  })
}

const handleCountAvailableLot = async (req: Request, res: Response) => {
  // Check if category is present
  if (!req.query.category) {
    return res.status(422).send("Please provide category.")
  }

  // Check if project id is present
  if (!req.query.project_id) {
    return res.status(422).send("Please provide project.")
  }

  // Construct payload
  const payload = {
    category: req.query.category,
    project_id: req.query.project_id,
  }

  return await countAvailableUnits(payload).then((data) => {
    res.status(200).json(data)
  })
}

const updateLot = async (req: Request, res: Response) => {
  // Check if project id is present
  if (!req.body.project_id) {
    return res.status(422).send("Please provide project.")
  }

  // Check if lot id is present
  if (!req.body.lot_id) {
    return res.status(422).send("Please provide lot.")
  }

  // Construct payload
  const payload = {
    lot_id: req.body.lot_id,
    project_id: req.body.project_id,
    fields: {
      ...req.body,
      project_id: undefined,
      lot_id: undefined
    }
  }

  return await updateLotInfo(payload)
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: "Successfully updated lot information.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this project. " +
            "ERR: lot.controlller.ts (updateLot)",
        })
      }
    })
    .catch((err) => {
      res.status(422).send("There was a problem while updating lot information. " + "ERR: lot.controlller.ts (updateLotInfo)",)
    })

}

const insertLot = async (req: Request, res: Response) => {
  // Check if 'AREA' is present.
  if (!req.body.project_id) {
    return res.status(422).send("Please provide project id.")
  }

  // Check if 'AREA' is present.
  if (!req.body.area) {
    return res.status(422).send("Please provide lot area.")
  }

  // Check if 'CATEGORY' is present.
  if (!req.body.category) {
    return res.status(422).send("Please provide lot category.")
  }

  // Check if 'SQM' is present.
  if (!req.body.sqm) {
    return res.status(422).send("Please provide lot sqm.")
  }

  // Check if 'PRICE_PER_SQM' is present.
  if (!req.body.price_per_sqm) {
    return res.status(422).send("Please provide lot price per sqm.")
  }

  return await insertLotInformation(req.body)
    .then((data) => {
      res.status(200).json({
        message: "Successfully added lot.",
        data: data
      })
    })
    .catch((err) => {
      res.status(422).send("There was a problem inserting lot information." +
        "ERR: lot.controlller.ts (insertLot)" + err)
    })
}

const removeLot = async (req: Request, res: Response) => {
  if (!req.body.agent_id) {
    return res.status(422).send("Please provide agent id.")
  }

  return await destroyLot({ agent_id: req.body.agent_id })
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: "Successfully deleted agent data.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this agent. " +
            "ERR: agent.controlller.ts (deleteLot)",
        })
      }
    })
}


export {
  retrieveLot,
  insertLot,
  handleCountAvailableLot,
  updateLot,
  removeLot
}