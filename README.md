# AWS TO-DO LIST

This project is a CRUD to-do list app that utilizes a [DynamoDB](https://aws.amazon.com/pm/dynamodb/?trk=8a8dfafe-2566-4dd7-a0a4-880dd910dfa0&sc_channel=ps&ef_id=Cj0KCQjwh5vFBhCyARIsAHBx2wxMFIHsg66T5adzRWZ27qBWY2Yk_OEDh2fwSFKWNY9_oVXa4NLUvTgaAgBdEALw_wcB:G:s&s_kwcid=AL!4422!3!651751059996!e!!g!!dynamodb!19852662209!145019198137&gad_campaignid=19852662209&gbraid=0AAAAADjHtp-sFpnoY5YVt_edU9GY2sBc-&gclid=Cj0KCQjwh5vFBhCyARIsAHBx2wxMFIHsg66T5adzRWZ27qBWY2Yk_OEDh2fwSFKWNY9_oVXa4NLUvTgaAgBdEALw_wcB) table for storage

## How It Works

The app fetches all items from DynamoDB, allows the user to add new to-do tasks by writing an item to DynamoDB, and uses the AWS SDK for JavaScript v3.

For initial setup, a new React project was scaffolded using [Vite](https://vite.dev/), and the AWS SDK packages were installed.

On first render, `useEffect` and `scanTodos` store the results in state. A simple input and button that allows the user to add more tasks to the list were appended to local state by calling `createTodo`. This allows for instant UI feedback.

[React Icons](https://react-icons.github.io/react-icons/) for editing and deleting existing tasks were added for each list item.

All AWS code modularized by creating a `dynamo.js` file. This helps separate AWS functions from code pertaining to the UI updates, making the project cleaner, more readable, and more organized.

Styling is provided by [Tailwind](https://tailwindcss.com/).

## DynamoDB Table Updates

Take a look at the table after adding more tasks with the app!

![alt text](<Screenshot 2025-08-20 205803.png>)
