import { destroyMethod, getMethodList, insertMethodInfo, updateMethodInfo } from "@services/method.service";
import { Request, Response } from "express";

const retrieveMethod = async (req: Request, res: Response) => {
  let query : { method_id?: number } = {};

  if (req.query.method_id){
    query['method_id'] = Number(req.query.method_id)
  }
  return await getMethodList({ 
    params: {
      attributes: {},
      where: {
        ...query
      }
    }
  })
    .then((data) => {
      return res.status(200).json(data)
    })
}

const updateMethod = async (req: Request, res: Response) => {
  if (!req.body.method_id) {
    return res.status(422).send("Please provide method id.")
  }

  const payload = {
    fields: {
      ...req.body,
      method_id: undefined
    },
    method_id: req.body.method_id
  }

  return await updateMethodInfo(payload)
    .then((data) => {
      if (data[0]) {
        res.status(200).json({
          message: "Successfully updated method information.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this method. " +
            "ERR: method.controlller.ts (updateMethod)",
        })
      }
    })
}

const insertMethod = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(422).send("Please provide method name.")
  }

  const payload = {
    ...req.body
  }

  return await insertMethodInfo(payload)
    .then((inserted) => {
      if (inserted) {
        res.status(200).json({
          message: "Method added successfully",
        })
      } else {
        res.status(422).json({
          message: "Couldn't create method. " +
            "ERR: method.controlller.ts (insertMethod)",
        })
      }
    })
}

const removeMethod = async (req: Request, res: Response) => {
  if (!req.body.method_id) {
    return res.status(422).send("Please provide method id.")
  }

  return await destroyMethod({ method_id: req.body.method_id })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          message: "Successfully deleted method data.",
        })
      } else {
        res.status(422).json({
          message: "Couldn't find any information on this method. " +
            "ERR: method.controlller.ts (deleteMethod)",
        })
      }
    })
}

export {
  retrieveMethod,
  updateMethod,
  removeMethod,
  insertMethod
}