import { PaymentModel } from "@database/models/payment.model";
import { SequelizeInstance, QueryTypes, Op, literal, fn, col } from "@hooks/useSequelize";

const getPaymentList = async (params: {}) => {
  return await PaymentModel.findAll({
    ...params
  })
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