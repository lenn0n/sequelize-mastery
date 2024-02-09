import { PaymentModel } from "@database/models/payment.model";
import { SequelizeInstance, QueryTypes, Op, literal, fn, col } from "@hooks/useSequelize";

const getPaymentList = async (filter?: [], limit?: number, offset?: number) => {
  let payload = {
    attributes: {
      include: [
        [literal(`(SELECT method_name FROM method WHERE method.method_id = payment.method_id)`), 'method'],
        [literal(`(SELECT C.client_name FROM lot as L JOIN client as C USING(client_id) WHERE L.lot_id = payment.lot_id )`), 'client'],
        [literal(`(SELECT A.agent_name FROM lot as L JOIN agent as A USING(agent_id) WHERE L.lot_id = payment.lot_id )`), 'agent'],
      ]
    },
    where: {
      [Op.and]: filter
    },
    limit,
    offset 
  }

  return await PaymentModel.findAll(payload)
}

const updatePaymentInfo = async (payload: any) => {
  return await PaymentModel.update({ ...payload.fields }, {
    where: {
      payment_id: payload.payment_id
    }
  })
}

const insertPaymentInfo = async (params: any) => {
  return await PaymentModel.create(params)
}

const destroyPayment = async (params: any) => {
  return await PaymentModel.destroy({
    where: {
      ...params
    }
  })
}

const retrieveTotalCollectibles = async (params: any) => {
  return await PaymentModel.findAll({
    attributes: [
      [fn("SUM", col("amount")), 'total'],
    ],
    where: {
      ...params // WHERE method_id = 1 (Bank Transfer)
    }
  })
}


export {
  getPaymentList,
  updatePaymentInfo,
  destroyPayment,
  insertPaymentInfo,
  retrieveTotalCollectibles
}