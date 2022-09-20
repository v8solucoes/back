import { Irequest } from "@domain/interface";
import * as express from "express";
import { TestCompose } from "../../../domain/src/shared/validator-local";
import { TestDocument } from "../../../domain/src/shared/validator-remote";

export const testRequestPost = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const request: Irequest = req.body as Irequest
  const test = new TestCompose(request).testRequest
  console.clear()
  if (test == null) {
    console.log('TEST Post REQUEST Aprovated');
    next();

  } else {
    console.log('TEST Post REQUEST Reprovated');
    /* next(); */
    res.json(test);
  }

};
export const testRequestGet = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const request = JSON.parse(req.headers['request'] as any)
  const test = new TestCompose(request).testRequestLogin
  console.clear()
  if (test == null) {
    console.log('TEST Get REQUEST Aprovated');
    next();

  } else {
    console.log('TEST Get REQUEST Reprovated');
    /* next(); */
    res.json(test);
  }

};

export const testDocument = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const request: Irequest = req.body as Irequest

  try {

    const test = await new TestDocument(request).permisionDomain()

    console.clear()
    if (test == null) {
      console.log('TEST DOCUMENT Aprovated');
      next();

    }

  } catch (error) {
    console.log('TEST DOCUMENT Reprovated');
    res.json(error);
  }

};