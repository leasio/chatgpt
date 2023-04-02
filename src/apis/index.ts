import {
  Configuration,
  OpenAIApi,
  CreateChatCompletionRequest,
  CreateImageRequest,
} from "openai";
import { OPENAI_API_KEY } from "../../config/openai";

class Api {
  openai: any;

  constructor() {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  // 模型列表
  listModels() {
    return this.openai.listModels();
  }

  // 对话
  createChatCompletion(params: CreateChatCompletionRequest) {
    return this.openai?.createChatCompletion({
      ...params,
    });
  }

  // 图片：根据提示创建
  createImage(params: CreateImageRequest) {
    return this.openai?.createImage({
      ...params,
    });
  }
}

export default new Api();
