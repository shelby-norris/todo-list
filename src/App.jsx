import React, { useState, useEffect } from 'react';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
DynamoDBDocumentClient,
ScanCommand,
PutCommand
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
region: import.meta.env.VITE_AWS_REGION,
credentials: {
accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
}
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Todo"


function App() {

const [todos, setTodos] = useState([]); // the array where scanCommand will save the information
const [text, setText] = useState(''); // string that is representing the text that you want to save in the table

const scanTodos = async () => {

try {
const command = new ScanCommand({ TableName: TABLE_NAME })
const response = await docClient.send(command);
console.log(response)
setTodos(response.Items)
} catch (err) {
console.log(err.message)
}


}

const createTodo = async () => {


const item = {
id: Date.now().toString(),
Text : text,
isComplete : false
}

const command = new PutCommand({ TableName: 'Todo', Item: item })
const response = await docClient.send(command);
console.log(response)

}

// The useEffect hook is called every time the component is showed to the user
// onload event on html
useEffect(() => {
scanTodos()
}, []);

const changeHandlerText = (event)=>{

const data =event.target.value
setText(data)

}

return (
<>
<div style={{ padding: 20 }}>
<h1 className='text-3xl font-bold text-white mb-10'>Todo App</h1>
<input
value={text}
onChange={changeHandlerText }
style={{ marginRight: 8 }}
className='bg-gray-900 rounded-lg outline-none p-2 text-white'
/>
 
<button onClick={createTodo} className='text-gray-800 font-semibold p-1 rounded-xl bg-amber-300 hover:bg-amber-200 hover:cursor-pointer' >Add Task</button>

<ul className="text-white" style={{ marginTop: 16 }}>
{todos.map(t => (
<li key={t.id}>{t.Text}</li>
))}
</ul>
</div>
</>
)
}

export default App
