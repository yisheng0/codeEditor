// Worker.ts
import axios from "axios";
import { LANGUAGE_VERSIONS, Language } from "./constant.ts";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

interface evetData {
    language: Language;
    sourceCode: string;
}

self.onmessage = async (event) => {
  console.log("Worker received message", event.data);
  const { language, sourceCode } = (event.data as evetData);
  
  try {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    
    // 将响应结果发送回主线程
    self.postMessage(response.data);
  } catch (error) {
    if(error instanceof Error) self.postMessage({ error: error.message });
  }
};
