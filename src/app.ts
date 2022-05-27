import express, {NextFunction, Request, Response} from 'express'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import routes from './routes'
import 'dotenv/config'

const app = express()
const FileStore = sessionFileStore(session)

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
  name: 'sid',
  store: new FileStore(),
  // @ts-ignore
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use((req : Request, res : Response, next: NextFunction) => {
  // @ts-ignore
  res.locals.user = req.session.user;
  next();
});

routes(app)

app.listen(process.env.PORT, () => {
  console.log('Server started at port:', process.env.PORT);
})
