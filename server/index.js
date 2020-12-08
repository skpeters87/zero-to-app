const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const xss = require('xss')
const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express')
const { Client } = require('pg')

const SECRET_KEY = 'secret'
const users = [
  {
    id: 1,
    email: 'test@mail.com',
    password: 'sfsdfsdfasdf' //secret
  }
]

const activities = [
  {
    title: "Test # 1",
    lat: 48.90535101969079,
    lng: 2.4727465957403187,
    description: "Test # 1: description",
    datetime: '2020-11-13T15:55:39.422Z'
  },
  {
    title: "Test # 4",
    lat: 48.90535101969079,
    lng: 2.4727465957403187,
    description: "<p>Test # 4</p>",
    datetime: '2020-11-13T15:55:39.422Z'
  }

]
const client = new Client(
  {
    user: 'wyrpqsdw',
    host: 'suleiman.db.elephantsql.com',
    database: 'wyrpqsdw',
    password: 'KvnSovgLGIlZQT495W8PCHunMPOvyW-6',
    port: 5432
  }
)



const initDB = async () => {
  await client.connect()
}

initDB()

const typeDefs = gql`
 type Activity {
   id: String!
   title: String!
   decription: String!
   datetime: String!
   lnt: String!
   lng: String!
 }

 type Query {
   activities: [Activity]
 }

 type Mutation {
   addActivity(
     title: String!
     description: String!
     datetime: String!
     lat: String!
     lng: String!
   ) : Activity
 }
`

const resolvers = {
  Query: {
    activities: (root, args) => {
      // return activities
      const text = 'select * from activities'
      try {
        const res = await client.query(text)
        return res.rows
      } catch(err) {
        console.log(err.stack)
      }

    }
  },
  Mutation: {
    addActivity: async (root, args) => {
      console.log(args.title, args.description, args.datetime, args.lat, args.lng)

      const text = 'insert into activities (title, description, date, lat, lng) values($1, $2, $3, $4, $5) returning *'
      const values = [args.title, args.description, args.datetime, args.lat, args.lng]

      try {
        const res = await client.query(text, values)
        console.log(res.rows)
      } catch(err) {
        console.log(err.stack)
      }

      return res.rows
    }
  }
}

const context = ({ req }) => {
  const token = req.cookies['token'] ||''
  try {
    const { email } = jwt.verify(token, SECRET_KEY)
  } catch (err) {
    throw new AuthenticationError('Authentication error. JWT invalid')
  }

  return {token}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  cors: false
})

const app = express()
app.use(cookieParser())

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: true
  },
})

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true}))

const getToken = (email) => {
  return jwt.sign({
    email: email
  }, SECRET_KEY)

}

app.post('/register', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body

  if (!email) {
    res.status(401).send({
      success: false,
      message: 'missing email',
    })
    return
  }

  if (!password) {
    res.status(401).send({
      success: false,
      message: 'missing password',
    })
    return
  }

  if (password.length < 8) {
    res.status(401).send({
      success: false,
      message: 'password need to be 8 or more characters',
    })
    return
  }



  if (password !== passwordConfirmation) {
    res.status(401).send({
      success: false,
      message: 'Please enter the same value in both password fields',
    })
    return
  }

  rounds = 10
  const hash = await bcrypt.hash(password, rounds)
  last_id = parseInt(users[users.length - 1].id)
  users.push({
    id: last_id + 1,
    email: email,
    password: hash
  })

  console.log(users)

  res.cookie('token', getToken(email), {
    httpOnly: true
    // secure: true
    // domain:
  })

  res.send({
    success: true
  })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body

  const userObj = users.find((user) => {
    return user.email === email
  })
  if (!userObj) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${email}`,
    })
    return
  }

  const match = brcrypt.compare(password, userObj.password)

  if (!match) {
    res.status(401).send({
      success: false,
      message: 'Incorrect credentials'
    })
    return
  }

  res.cookie('token', getToken(email), {
    httpOnly: true
    // secure: true
    // domain:
  })

  res.send({
    success: true
  })
})

app.listen(3001, () => {
  console.log('Server listening on port 3001')
})
