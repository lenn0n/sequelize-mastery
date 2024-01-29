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

const destroyPayment = async (params: any) => {
  return await PaymentModel.destroy({
    where: {
      ...params
    }
  })
}

export {
  getPaymentList,
  updatePaymentInfo,
  destroyPayment,
  insertPaymentInfo
}