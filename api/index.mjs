import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({});

export const handler = async () => {
  const scan = new ScanCommand({ TableName: process.env.TABLE_NAME, Select: "COUNT" });
  const { Count } = await db.send(scan);
  return { statusCode: 200, body: JSON.stringify({ books: Count }) };
};
