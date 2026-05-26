import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const log = `Time - Method - URL --> ${new Date().toISOString()} - ${req.method} - ${req.url}\n`;

  fs.appendFile("logger.txt", log, (err) => {
    if (err) throw err;
    //console.log('log: ', log);
  });

  next();
};

export default logMiddleware;