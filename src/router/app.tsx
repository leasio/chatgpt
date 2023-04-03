import * as React from "react";
import * as fs from "fs";
import Router, { RouterContext } from "koa-router";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "@/App";

const appRouter = new Router();
const template = fs.readFileSync("public/template.html", "utf8");

appRouter.get("(.*)", (ctx: RouterContext) => {
  const str = ReactDOMServer.renderToString(
    <StaticRouter location={ctx.req.url}>
      <App />
    </StaticRouter>
  );
  ctx.body = template.replace("<slot />", str);
  ctx.type = "html";
});

export default appRouter