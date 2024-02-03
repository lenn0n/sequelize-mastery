import { ClientModel } from "@database/models/client.model";

const getClientList = async ({ params }: any) => {
  return await ClientModel.findAll({
    ...params,
    attributes: {
      ...params.attributes,
      exclude: ['createdAt', 'updateAt']
    }
  })
}

type UpdateClientType = {
  fields: {},
  client_id: number
}

const updateClientInfo = async (payload: UpdateClientType) => {
  return await ClientModel.update({ ...payload.fields }, {
    where: {
      client_id: payload.client_id
    }
  })
}

const insertClientInfo = async (params: any) => {
  return await ClientModel.create(params)
    .then(() => {
      return {
        result: true
      }
    })
    .catch((err: any) => {
      let messageError = ""
      err.errors.map((data: any) => {
        if (data.type == 'unique violation') {
          messageError = `The client name was already taken. (${data.value})`
        } else {
          messageError = data.message
        }
      })
      return {
        result: false,
        message: messageError
      }
    })
}

const destroyClient = async (params: any) => {
  return await ClientModel.destroy({
    where: {
      ...params
    }
  })
}

const countClient = async () => {
  return await ClientModel.count()
}

export {
  getClientList,
  updateClientInfo,
  insertClientInfo,
  destroyClient,
  countClient
}