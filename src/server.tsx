import * as React from "react";
import * as fs from "fs";
import Koa from "koa";
import Router from "koa-router";
import koaStatic from "koa-static";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import api from './apis'
import App from "./App";

const app = new Koa();
const router = new Router();

const template = fs.readFileSync("public/template.html", "utf8");
const port = process.env.PORT || 50000

app.use(
  koaStatic("dist", {
    gzip: true,
    maxage: 10,
  })
);

router.post("/api/chat", async (ctx: any) => {
  console.log(ctx)

  ctx.body = { code: 0 }

  // try {
  //   const response = await api.createChatCompletion(ctx.query)
  //   console.log("response:", response)
  //   // ctx.body = response.data
  // } catch (e) {
  //   ctx.body = e
  // }
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

app.use(router.routes());

app.listen(port);

console.log(`Application is running on http://127.0.0.1:${port}`);
