
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY, ORG_ID } from "../../config/openai"

class Api {
    constructor() {
        const configuration = new Configuration({
            organization: ORG_ID,
            apiKey: OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    listEngines() {
        return this.openai?.listEngines()
    }
}

export default new Api()