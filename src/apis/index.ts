import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateImageRequest,
} from "openai";
import { OPENAI_API_KEY, ORG_ID } from "../../config/openai";

const CHAT_MODEL = "gpt-3.5-turbo";

class Api {
  openai: any;

  constructor() {
    const configuration = new Configuration({
      organization: ORG_ID,
      apiKey: OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  // 对话
  createChatCompletion(params: { messages: ChatCompletionRequestMessage[] }) {
    return this.openai?.createChatCompletion({
      model: CHAT_MODEL,
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
