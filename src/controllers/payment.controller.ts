import { getPaymentList } from "@services/payment.service"
import { Request, Response } from "express"
import { Op } from "@hooks/useSequelize"

const retrievePayment = async (req: Request, res: Response) => {
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
  if (reqQuery?.limit){
    limit = Number(reqQuery.limit)
  }

  // Set Offset
  if (reqQuery?.page){
    offset = (Number(reqQuery?.page) - 1) * limit
  }

  let payload = {
    where: {
      [Op.and]: filter
    },
    limit,
    offset
  }

  return await getPaymentList(payload)
    .then((data) => {
      res.status(200).json(data)
    })
}


export {
  retrievePayment
}