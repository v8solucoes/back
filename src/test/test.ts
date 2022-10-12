import { Irequest } from "@domain/interface";
import * as express from "express";
import { Firebase } from "../../../domain/src/domain/api/firebase";
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
  console.log('TEST Get REQUEST');
/*   console.log(req.params); */
  const request = req.params['request'] as any
  const test = new TestCompose(JSON.parse(request)).testRequest
  console.clear()
  if (test == null) {
    console.log('Aprovated');
    next();

  } else {
    console.log('Reprovated');
    /* next(); */
    res.json(test);
  }

};
export const testRequestGetDocument = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('TEST Get Document');
/*   console.log(req.params); */
  const request = req.params['request'] as any
  const test = new TestCompose(JSON.parse(request)).testRequestDocument
  console.clear()
  if (test == null) {
    console.log('Aprovated');
    next();

  } else {
    console.log('Reprovated');
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

export const securityDocument = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {

  const token = req.params['token'] as string
  const request = JSON.parse(req.params['request']) as Irequest

  try {

    const user = await Firebase.userPermissionAndModelAsync(token, request)

    const test = Firebase.securityColectionAndDocumentAcessIsValid(user.permission, request)

    if (test == true) {
      console.log('Security Document Aprovated');
     const document = await Firebase.document(request)
      res.json(document)
    }

  } catch (error) {
    console.log('Security Reprovated');
    console.log(error);
    res.json({error: `security-reprovated: ${error}`});
  }

}
export const securityColection = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {

  const token = req.params['token'] as string
  const request = JSON.parse(req.params['request']) as Irequest

  try {

    const user = await Firebase.userPermissionAndModelAsync(token, request)

    const test = Firebase.securityColectionAndDocumentAcessIsValid(user.permission, request)

    if (test == true) {
      console.log('Security Aprovated');
     const colection = await Firebase.colection(request)
      res.json(colection)
    }

  } catch (error) {
    console.log('Security Reprovated');
    console.log(error);
    res.json({error: `security-reprovated: ${error}`});
  }

}