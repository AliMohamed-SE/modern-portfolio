import pc from "../db.config";
import { documents } from "../documents";

const indexName = "integrated-dense-js";

const namespace = pc
  .index(
    indexName,
    "https://integrated-dense-js-jxtmyhf.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace("portfolio-assistant");

await namespace.upsertRecords(documents);
