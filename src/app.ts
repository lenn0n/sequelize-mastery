import express from "express"
import routes from "@routes/api-routes"
import cors from 'cors';

require('@utils/custom.console.js');
require('dotenv').config();

const app = express();
const expressParseOptions = {
  limit: '500mb',
};

app.use(express.json(expressParseOptions));
app.use(cors());
app.use(routes);

app.listen(process.env.SERVER_PORT, ()=> {
  console.info(`API Server is running on port ${process.env.SERVER_PORT}.`)
})