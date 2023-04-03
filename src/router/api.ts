import Router from "koa-router";
import api from "@/apis";

const apiRouter = new Router();

// 接口：模型列表
apiRouter.get("/api/models", async (ctx: any) => {
  try {
    const response = await api.listModels();

    ctx.body = response.data;
  } catch (e: any) {
    ctx.body = e;
  }
});

// 接口：对话
apiRouter.post("/api/chat", async (ctx: any) => {
  try {
    const response = await api.createChatCompletion(ctx.request.body);

    ctx.body = response.data;
  } catch (e: any) {
    ctx.body = e;
  }
});

// 接口：图片
apiRouter.post("/api/images", async (ctx: any) => {
  try {
    const response = await api.createImage(ctx.request.body);

    ctx.body = response.data;
  } catch (e: any) {
    ctx.body = e;
  }
});

export default apiRouter