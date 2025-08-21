import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Todo";

export const scanTodos = async () => {
  try {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await docClient.send(command);
    console.log(response);

    return response.Items;
  } catch (err) {
    console.log(err.message);
  }
};

export const createTodo = async (text) => {
  const item = {
    id: Date.now().toString(),
    Text: text,
    isComplete: false,
  };

  const command = new PutCommand({ TableName: "Todo", Item: item });
  const response = await docClient.send(command);

  console.log(response);
  return item;
};
