const express = require("express");
const app = express();
const userRouter= require("./routes/user")
const PORT = 3000;

// app.use(express.static("pages"));
app.set("view engine", "ejs");

var router = express.Router();

// pool.jsを読み込み
const pool = require('./modules/database');

// app.get("/", (req, res) => {
//     // console.log("Hello express");
//     // res.send("<h1>こんにちは</h1>");
//     // res.sendStatus(500);
//     // res.status(500).send("エラーです");
//     pool.query('SELECT name FROM test', function(error, results){
    
//         // エラーの場合
//         if (error) {
//         //   console.log("エラーです")
//         return res.status(500).json({msg:"エラーです"});
//         }
    
//         // 正常なら取得したデータを返却
//          return res.status(200).json({
//           data: results.rows
//         });
    
//       });
// });

app.get('/', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test');
      const results = { 'results': (result) ? result.rows : null};
      res.render('/', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

// ルーティング
app.use("/user", userRouter);
// app.use("/auth", authRouter);
// app.use("/customer", customerRouter);
// app.use("/product", productRouter);

app.listen(PORT, () => console.log("サーバーが起動しました"));
