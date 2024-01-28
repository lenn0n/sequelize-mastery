import { Request, Response } from "express";
import { countAvailableUnits, getLotList, insertLotInformation } from "@services/lot.service"
import { literal } from "@hooks/useSequelize";

const retrieveLot = async (req: Request, res: Response) => {
  return await getLotList({
    params: {
      attributes: {
        include: [
          [literal(`(SELECT name FROM client WHERE client.client_id = lot.client_id)`), 'client_name']
        ]
      }
    }
  }).then((data) => {
    res.status(200).json(data)
  })
}

const handleCountAvailableLot = async  (req: Request, res: Response) => {
  if (!req.query.category){
    return res.status(422).send("Please provide category.")
  }
  
  return await countAvailableUnits({ category: req.query.category}).then((data) => {
    res.status(200).json(data)
  })
}

const insertLot = async (req: Request, res: Response) => {
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
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err);

      res.status(422).send("There was a problem inserting lot information.")
    })
}

export {
  retrieveLot,
  insertLot,
  handleCountAvailableLot
}