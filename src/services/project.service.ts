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
}

const destroyProject = async (params: any) => {
  return await ProjectModel.destroy(params)
}

export {
  getProjectList,
  updateProjectInfo,
  insertProjectInfo,
  destroyProject
}