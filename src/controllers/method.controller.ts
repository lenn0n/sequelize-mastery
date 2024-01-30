import { NextFunction, Request, Response } from "express";
import { destroyMethod, getMethodList, insertMethodInfo, updateMethodInfo } from "@services/method.service";

const retrieveMethod = async (req: Request, res: Response, next: NextFunction) => {
  let query: { method_id?: number } = {};

  if (req.query.method_id) {
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
    .catch((err) => {
      next()
    })
}

const updateMethod = async (req: Request, res: Response, next: NextFunction) => {
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
    .catch((err) => {
      next()
    })
}

const insertMethod = async (req: Request, res: Response, next: NextFunction) => {
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
    .catch((err) => {
      next()
    })
}

const removeMethod = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.method_id) {
    return res.status(422).send("Please provide method id.")
  }

  return await destroyMethod({ method_id: req.query.method_id })
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
    .catch((err) => {
      next()
    })
}

export {
  retrieveMethod,
  updateMethod,
  removeMethod,
  insertMethod
}