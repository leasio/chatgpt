import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaStatic from "koa-static";
import apiRouter from "./router/api";
import appRouter from "./router/app";

const port = process.env.PORT || 3000;
const app = new Koa();

app.use(
  koaStatic("dist", {
    gzip: true,
    maxage: 10,
  })
);

app.use(bodyParser());  // 解析request的body的功能(post请求)
app.use(apiRouter.routes());
app.use(appRouter.routes());

app.listen(port);

console.log(`Application is running on http://127.0.0.1:${port}`);
