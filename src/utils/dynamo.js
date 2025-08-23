import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
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
    IsComplete: false,
  };

  const command = new PutCommand({ TableName: "Todo", Item: item });
  const response = await docClient.send(command);

  console.log(response);
  return item;
};

export const deleteTodoById = async (id) => {
   const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

export const updateTodo = async (todo) => {
    const { id, Text, IsComplete, } = todo;
    console.log(todo)
    const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "SET #Text = :Text, #IsComplete = :IsComplete",

    ExpressionAttributeNames: {
      "#Text": "Text",
      "#IsComplete": "IsComplete",
    },

    ExpressionAttributeValues: {
      ":Text": Text,
      ":IsComplete": IsComplete,
    },

  });

  const { Attributes } = await docClient.send(command);
  console.log(Attributes);
  return Attributes;
};
