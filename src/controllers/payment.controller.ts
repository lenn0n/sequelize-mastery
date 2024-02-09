import { Request, Response, NextFunction } from "express"
import { destroyPayment, getPaymentList, insertPaymentInfo, retrieveTotalCollectibles, updatePaymentInfo } from "@services/payment.service"

const retrievePayment = async (req: Request, res: Response, next: NextFunction) => {
  let filter: any = [], limit = 10, offset = 0, reqQuery = req.query;

  // Filter by Payment ID
  if (reqQuery?.payment_id) {
    filter.push({ payment_id: reqQuery.payment_id })
  }

  // Filter by Lot ID
  if (reqQuery?.lot_id) {
    filter.push({ lot_id: reqQuery.lot_id })
  }

  // Limit return items
  if (reqQuery?.limit) {
    limit = Number(reqQuery.limit)
  }

  // Set Offset
  if (reqQuery?.page) {
    offset = (Number(reqQuery?.page) - 1) * limit
  }

  return await getPaymentList(filter, limit, offset)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next()
    })
}

const insertPayment = async (req: Request, res: Response, next: NextFunction) => {
  // Check if project ID is present.
  if (!req.body.project_id) {
    return res.status(422).send("Please provide project ID.")
  }

  // Check if method ID is present. [Bank Transfer, GCash, etc...]
  if (!req.body.method_id) {
    return res.status(422).send("Please provide method ID.")
  }

  // Check if lot id is present.
  if (!req.body.lot_id) {
    return res.status(422).send("Please provide lot ID.")
  }

  // Check if type is present.
  if (!req.body.type) {
    return res.status(422).send("Please provide type of payment. Eg. RSV, DP, etc..")
  }

  // Check if amount is present.
  if (!req.body.amount) {
    return res.status(422).send("Please provide the amount.")
  }

  const payload = {
    ...req.body
  }
  return await insertPaymentInfo(payload)
    .then((inserted) => {
      if (inserted) {
        return res.status(200).json({
          message: "Payment created successfully",
        })
      } else {
        return res.status(422).json({
          message: "Couldn't insert payment. " +
            "ERR: payment.controlller.ts (insertPayment)",
        })
      }
    })
    .catch((err) => {
      res.status(422).json({
        message: "Couldn't insert payment. " +
          "ERR: payment.controlller.ts (insertPayment)",
      })
      next()
    })
}

const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.payment_id) {
    return res.status(422).send("Please provide payment ID.")
  }

  const payload = {
    fields: {
      ...req.body,
      payment_id: undefined
    },
    payment_id: req.body.payment_id
  }

  return await updatePaymentInfo(payload)
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: "Successfully updated payment information.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this payment. " +
            "ERR: payment.controlller.ts (updatePayment)",
        })
      }
    })
    .catch((err) => {
      next()
    })
}

const removePayment = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.payment_id) {
    return res.status(422).send("Please provide payment ID.")
  }

  return await destroyPayment({ payment_id: req.query.payment_id })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          message: "Successfully deleted payment data.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this payment. " +
            "ERR: payment.controlller.ts (removePayment)",
        })
      }
    })
    .catch((err) => {
      next()
    })
}

const getTotalCollectibles = async (req: Request, res: Response, next: NextFunction) => { 
  return await retrieveTotalCollectibles(req.query)
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    next()
  })
}

export {
  retrievePayment,
  insertPayment,
  updatePayment,
  removePayment,
  getTotalCollectibles
}