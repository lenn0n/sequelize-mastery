import { ProjectModel } from "@database/models/project.model";

const getProjectList = async ({ params }: any) => {
  return await ProjectModel.findAll({
    ...params,
    attributes: {
      ...params.attributes,
      exclude: ['createdAt', 'updateAt']
    }
  })
}

type UpdateProjectType = {
  fields: {},
  project_id: number
}

const updateProjectInfo = async (payload: UpdateProjectType) => {
  return await ProjectModel.update({ ...payload.fields }, {
    where: {
      project_id: payload.project_id
    }
  })
}

const insertProjectInfo = async (params: any) => {
  return await ProjectModel.create(params)
  .then(() => {
    return {
      result: true
    }
  })
  .catch((err: any) => {
    let messageError = ""
    err.errors.map((data: any) => {
      if (data.type == 'unique violation') {
        messageError = `The project name was already in the system. (${data.value})`
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

const destroyProject = async (params: any) => {
  return await ProjectModel.destroy({
    where: {
      ...params
    }
  })
}

export {
  getProjectList,
  updateProjectInfo,
  insertProjectInfo,
  destroyProject
}