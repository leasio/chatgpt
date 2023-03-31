import * as React from "react";
import * as fs from "fs";
import Koa from "koa";
import Router from "koa-router";
// 解析request的body的功能(post请求)
import bodyParser from "koa-bodyparser";
import koaStatic from "koa-static";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import api from "./apis";
import App from "./App";

const app = new Koa();
const router = new Router();

const template = fs.readFileSync("public/template.html", "utf8");
const port = process.env.PORT || 3000;

app.use(
  koaStatic("dist", {
    gzip: true,
    maxage: 10,
  })
);

router.post("/api/chat", async (ctx: any) => {
  try {
    const response = await api.createChatCompletion(ctx.request.body);

    ctx.body = response.data;
  } catch (e) {
    ctx.body = e;
  }
});

router.get("/api/chat", async (ctx: any) => {
  ctx.body = "none";
});

router.get("(.*)", (ctx: any) => {
  const str = ReactDOMServer.renderToString(
    <StaticRouter location={ctx.req.url}>
      <App />
    </StaticRouter>
  );
  ctx.body = template.replace("<slot />", str);
  ctx.type = "html";
});

app.use(bodyParser());
app.use(router.routes());

app.listen(port);

console.log(`Application is running on http://127.0.0.1:${port}`);
