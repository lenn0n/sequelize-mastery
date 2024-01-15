import express from "express"
import routes from "@routes/api-routes"
import cors from 'cors';

require('@utils/custom.console');
require('dotenv').config();

const app = express();
const expressParseOptions = {
  limit: '500mb',
};

app.use(express.json(expressParseOptions));
app.use(cors());
app.use("/api", routes);

app.listen(process.env.SERVER_PORT, ()=> {
  console.info(`API Server is now running on port ${process.env.SERVER_PORT}.`)
})