import express, { Request, Response } from 'express';
import { testOne } from './controllers/testControl';
const { exec } = require("child_process");
import { loginMethod } from './controllers/loginControl';
import routerLogin from './routes/loginRoutes';
import routerRoles from './routes/rolesRoutes';
import routerAdmin from './routes/adminRoutes/adminAccess';
import routerPublic from './routes/publicRoutes';
const cors = require("cors");
const axios = require('axios');
const ytdl = require('ytdl-core');

// Hacking practice
// const corsOptions = {
//   origin: 'https://www.instagram.com', // Specify exact origin
//   credentials: true, // Allow credentials
//   methods: ['GET', 'POST', 'PUT', 'DELETE'] // Allowed methods
// };

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}))

// Insta
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, All! WeLearn server is now running');
});

app.use("/test", testOne)
app.use("/api/public", routerPublic)
app.use("/api/login", routerLogin)
app.use("/api/role", routerRoles)
app.use("/api/ultra", routerAdmin)

app.post('/api/session-data', (req:any, res:any) => {
  // Access the HttpOnly cookie
  console.log(req)
  const sessionId = req.cookies.sessionid;
  
  // Access request body
  const requestData = req.body.someData;
  
  if (!sessionId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Process request and return data
  res.json({
    authenticated: true,
    requestParameter: requestData,
    // Never return the actual session ID to client!
    sessionInfo: { /* safe session data */ }
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});