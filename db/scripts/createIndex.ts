import pc from "../db.config";

const indexName = "integrated-dense-js";
await pc.createIndexForModel({
  name: indexName,
  cloud: "aws",
  region: "us-east-1",
  embed: {
    model: "llama-text-embed-v2",
    fieldMap: { text: "chunk_text" },
  },
  waitUntilReady: true,
});
