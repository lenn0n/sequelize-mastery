import { MethodModel } from "@database/models/method.model";

const getMethodList = async ({ params }: any) => {
  return await MethodModel.findAll({
    ...params,
    attributes: {
      ...params.attributes,
      exclude: ['createdAt', 'updateAt']
    }
  })
}

type UpdateMethodType = {
  fields: {},
  method_id: number
}

const updateMethodInfo = async (payload: UpdateMethodType) => {
  return await MethodModel.update({ ...payload.fields }, {
    where: {
      method_id: payload.method_id
    }
  })
}

const insertMethodInfo = async (params: any) => {
  return await MethodModel.create(params)
}

const destroyMethod = async (params: any) => {
  return await MethodModel.destroy({
    where: {
      ...params
    }
  })
}

export {
  getMethodList,
  updateMethodInfo,
  insertMethodInfo,
  destroyMethod
}