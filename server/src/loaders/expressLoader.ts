import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import v1RouteHandler from "../routes/v1";

class Express {
    public express: express.Application;
    public port: number | string;

    constructor() {
        this.port = process.env.PORT || 3000;
        this.express = express();
    }

    public init() {
        process.on("uncaughtException", (err) => {
            console.log(err);
        });

        //middlewares
        this.express.use(express.json({ limit: '10mb' }));
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors());

        //handle uncaught error
        this.express.use((err, req: Request, res: Response, next: NextFunction) => {
            if (err) {
                console.error(err);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                    message: "Internal server error occurred.",
                    details: err.message
                });
            } else {
                next();
            }
        })

        this.express.use('/api/v1', v1RouteHandler());

        this.express.listen(this.port, () => {
            console.log(`server is running... on port ${process.env.PORT}`);
        });
    }
}

export default Express