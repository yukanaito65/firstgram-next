import express, { Request, Response } from "express";
import next from "next";
import { sqlExecuter } from "../modules/database";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
  });

	// server.use(express.json());
	// //message情報を全て取得するapi(シンさん)
	// server.get("/message", (req, res)=> {
	// 	sqlExecuter.query("SELECT * FROM message", (error:any, results:any)=>{
	// 		if(error) throw error;
	// 		return res.status(200).json(results.rows);
	// 	})
	// })
  // server.use('/message', require('./routes/message'));
});
