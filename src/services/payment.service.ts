import { PaymentModel } from "@database/models/payment.model";

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

const deletePayment = async (params: any) => {
  return await PaymentModel.destroy(params)
} 

export {
  getPaymentList,
  updatePaymentInfo,
  deletePayment,
  insertPaymentInfo
}