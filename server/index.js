const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri =
  'mongodb+srv://Risosi:lWputw2Zbzuu6gTT@cluster0.seul0nf.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    await client.connect()
    const database = client.db('Risosi')
    const dataForDatavase = database.collection('Database')

    app.post('/sendData', async (req, res) => {
      const data = req.body
      const result = await dataForDatavase.insertOne(data)
      res.json(result)
    })
    app.get('/getData', async (req, res) => {
      const data = dataForDatavase.find({})
      const dataArray = await data.toArray()
      res.json(dataArray)
    })
  } finally {
    // await client.close()
  }
}
run().catch(console.dir)

//checking first time
app.get('/', (req, res) => {
  res.send('I am runing !')
})

app.listen(port, () => {
  console.log('listening at', port)
})
