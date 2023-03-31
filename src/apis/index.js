
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY, ORG_ID } from "../../config/openai"

const options = {
    model: 'gpt-3.5-turbo'
}

class Api {
    constructor() {
        const configuration = new Configuration({
            organization: ORG_ID,
            apiKey: OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    createChatCompletion(params) {
        return this.openai?.createChatCompletion({
            ...options,
            ...params
        })
    }
}

export default new Api()