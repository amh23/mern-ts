# How To Set Up Backend With NPM, Nodejs, Mongoose

### The project is MERN stack starter with typescript. The root folder is **mern-ts-starter** and it

### includes **backend** and **frontend** folder. First of All, create a README.md and .gitigonre files in

### the root folder.

- Item 1 In the backend foler, `npm init` and the command asks a series of options and you need to think
  **type** and the default value is **commonjs** but you can choose **module**. ES6 is used in the project.

- Item 2 Create a **.env** file and add nessecessary variables such as mongod uri, pepper value are added. This file
  must be added in the .gitigore file.

- Item 2 Install TypeScript and related type definitions.
  `npm install --save-dev typescript @types/node`

- Item 3 Install Express and its types

```typescript
npm install express
npm install --save-dev @types/express
```

- Item 4 Generate Typescript configuration file
  `npx tsc --init`
  In the **tsconfig.json** file, uncomment `"outDir": "./dist",` , ` "rootDir": "./src"` and ` "types": ["node"]`
  in compiler options.

- Item 4 Install **ts-node-dev** which is a development tool that combines **ts-node** and **nodemon**
  to automatically restart Typescript Node.js application when files change.
  `npm install --save-dev ts-node-dev`
  To run `npm run build` and `npm run start` command in parallel, install
  `npm install concurrently --save-dev`
  Modify the scripts section in your package.json to include:

```javascript
"scripts": {
    "build": "tsc --watch",
    "start": "ts-node-dev --respawn dist/server.js",
    "dev": "concurrently \"npm run build\" \"npm run start\" "
    }
```

- Item 5 Install **cors**, **dotenv** and **mongoose** which are used in production
  `npm install cors dotenv mongoose`

Install their type definitions which is used for development dependencies.
``npm install --save-dev @types/cors @types/dotenv @types/node @types/mongoose`

- Item 6 Create `server.ts` file in the src folder and insert the following code.

```
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-db';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

# How To Set Up Frontend React Project with Vit

### To install vit, run `npm create vite@latest` command.

### Install Tailwind CSS

`npm install tailwindcss @tailwindcss/vite`

### Import Tailwind CSS to App.css

`@import "tailwindcss";`

### Start using Tailwind CSS in index.html file

Insert `<link href="/src/App.css" rel="stylesheet">` in the header of the HTML file.
