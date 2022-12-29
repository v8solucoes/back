import { Irequest } from "@domain/interface";
import * as express from "express";
import { Firebase } from "../../../domain/src/domain/api/firebase";
import { TestCompose } from "../../../domain/src/shared/validator-local";
import { TestDocument } from "../../../domain/src/shared/validator-remote";

export const testRequestPost = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.clear()
  console.log('TEST Post REQUEST');
  const request: Irequest = req.body as Irequest
  const test = new TestCompose(request).testRequest

  if (test == null) {
    console.log('Aprovated');
    next();

  } else {
    console.log('Reprovated');
    res.json(test);
  }

};
export const testRequestGet = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.clear()
  console.log('TEST Get REQUEST');
  const request = req.params['request'] as any
  const test = new TestCompose(JSON.parse(request)).testRequest
 
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
 
  console.clear()
  console.log('TEST Get DOCUMENT');

  const request = req.params['request'] as any
  const test = new TestCompose(JSON.parse(request)).testRequestDocument
  
  if (test == null) {
    console.log('Aprovated');
    next();

  } else {
    console.log('Reprovated');
    /* next(); */
    res.json(test);
  }

};

export const testPostDocument = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  console.clear()
  console.log('TEST Post DOCUMENT');

  const request: Irequest = req.body as Irequest

  try {

    const test = await new TestDocument(request).permisionDomain()

    console.clear()
    if (test == null) {
      console.log('Aprovated');
      return next();
    } else {
      throw new Error(`${JSON.stringify(test)}`);
    }

  } catch (error) {
    console.log('Reprovated');
    console.log(error);
   return res.json(error);
  }

};

export const securityGetDocument = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {

  console.clear()
  console.log('TEST Security Get DOCUMENT');
  const token = req.params['token'] as string
  const request = JSON.parse(req.params['request']) as Irequest

  try {

    const user = await Firebase.userPermissionAndModelAsync(token, request)

    const test = Firebase.securityColectionAndDocumentAcessIsValid(user.permission, request)

    if (test == true) {
      console.log('Aprovated');
     const document = await Firebase.document(request)
      res.json(document)
    }

  } catch (error) {
    console.log('Reprovated');
    console.log(error);
    res.json({error: `security-reprovated: ${error}`});
  }

}
export const securityGetColection = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {
  console.clear()
  console.log('TEST Security Get COLECTION');
  const token = req.params['token'] as string
  const request = JSON.parse(req.params['request']) as Irequest

  try {

    const user = await Firebase.userPermissionAndModelAsync(token, request)

    const test = Firebase.securityColectionAndDocumentAcessIsValid(user.permission, request)

    if (test == true) {
      console.log('Aprovated');
     const colection = await Firebase.colection(request)
      res.json(colection)
    }

  } catch (error) {
    console.log('Reprovated');
    console.log(error);
    res.json({error: `security-reprovated: ${error}`});
  }

}
export const securityCrudPermission = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {
  console.clear()
  console.log('Security Crud Permission');

  const request: Irequest = req.body as Irequest
  const token:string = ''

  try {

    const user = await Firebase.userPermissionAndModelAsync(token, request)

    const test = Firebase.securityColectionAndDocumentAcessIsValid(user.permission, request)

    if (test == true) {
      console.log('Aprovated');
     const colection = await Firebase.colection(request)
      res.json(colection)
    }

  } catch (error) {
    console.log('Reprovated');
    console.log(error);
    res.json({error: `security-reprovated: ${error}`});
  }

}