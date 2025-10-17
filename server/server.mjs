/**
 * @fileoverview Main server file for plumber app, Google JS Style Guide.
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import { randomUUID } from 'crypto';
import multer from 'multer';

const mongoString = 'mongodb://127.0.0.1:27017/';
const dbName = 'plumber-react-server';

/**
 * Seeds the database with initial data if collections are empty.
 * @return {Promise<void>}
 */
async function seedDbAsync() {
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const serviceCollections = db.collection('services');
  if (await serviceCollections.countDocuments() === 0) {
    await serviceCollections.insertMany([
    {
      name: 'Демонтаж плитки',
      description: 'Уберем старую плитку, аккуратно, быстро или тихо, можем чередовать в зависимости от',
      price: 954,
      mesurement: 'квадратный метр',
      img: '/statics/demontazh-plitki.jpg',
    },
    {
      name: 'Монтаж водопровода',
      description: 'Заменим и проложим новые трубы',
      price: 2182,
      mesurement: 'за метр',
      img: '/statics/montazh-vodoprovoda.jpg',
    },
    {
      name: 'Монтаж новой плитки',
      description: 'Уложим новую плитку. Стоимость резки и уравнивания входит в стоимость',
      price: 2167,
      mesurement: 'квадратный метр',
      img: '/statics/montazh-novoy-plitki.webp',
    },
    {
      name: 'Монтаж смесителя',
      description: 'Быстро установим новый смеситель с демонтажом старого при необходимости',
      price: 260,
      mesurement: 'за шт',
      img: '/statics/montazh-smesitelya.webp',
    },
    ]);
  }
  const exampleCollections = db.collection('examples');
  if (await exampleCollections.countDocuments() === 0) {
    await exampleCollections.insertMany([
    {
      service: 'Демонтаж плитки',
      img: '/statics/demontazh-plitki.jpg',
    },
    {
      service: 'Демонтаж плитки',
      img: '/statics/demontazh-plitki-2.jpg',
    },
    {
      service: 'Монтаж новой плитки',
      img: '/statics/montazh-novoy-plitki.webp',
    },
    {
      service: 'Монтаж смесителя',
      img: '/statics/montazh-smesitelya.webp',
    },
    {
      service: 'Монтаж смесителя',
      img: '/statics/montazh-smesitelya-2.webp',
    },
    {
      service: 'Монтаж смесителя',
      img: '/statics/montazh-smesitelya-3.webp',
    },
    ]);
  }
  const blogsCollections = db.collection('blogs');
  if (await blogsCollections.countDocuments() === 0) {
    await blogsCollections.insertMany([
    {
      guid: randomUUID(),
      title: 'Как провести демонтаж старой плитки',
      preview: 'Подготовья, очисти, убери, приберись',
      text: 'Чтобы провести демонтаж старой плитки, нужно сначала удалить затирку, затем аккуратно поддеть плитку шпателем или зубилом, и при необходимости использовать перфоратор для более быстрого удаления. Важно соблюдать осторожность, чтобы не повредить основание. После демонтажа необходимо очистить поверхность от остатков клея и затирки',
      comments: [
      'спасибо, было полезно',
      'Узнал много нового!'
      ],
    },
    {
      guid: randomUUID(),
      title: 'Сколько живет один кран',
      preview: 'Срок службы крана зависит от его типа и условий эксплуатации',
      text: ' Обычно, для кранов общего назначения он составляет 15-20 лет, для специальных кранов и кранов-перегружателей - до 20 лет, а для башенных и стреловых кранов - около 10-13 лет',
      comments: [],
    },
    ]);
  }
  } finally {
  await mongoClient.close();
  }
}

await seedDbAsync();

const port = 12301;
const app = express();
const jsonParser = express.json();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/statics', express.static(path.join(__dirname, '../statics')));

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'statics');
  },
  filename: (req, file, cb) => {
  const extension = file.originalname.split('.')[1];
  cb(null, randomUUID() + '.' + extension);
  },
});
app.use(multer({storage: storageConfig}).single('file'));

app.post('/api/upload', (request, response) => {
  if (!request.file) {
  return response.sendStatus(400);
  }
  response.json(request.file.filename);
});

/**
 * Returns all services.
 */
app.get('/api/services', async function(_, response) {
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('services');
  const services = await collection.find().toArray();
  response.json(services);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Returns all examples.
 */
app.get('/api/examples', async function(_, response) {
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('examples');
  const examples = await collection.find().toArray();
  response.json(examples);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Returns all clients.
 */
app.get('/api/clients', async function(_, response) {
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('clients');
  const clients = await collection.find().toArray();
  response.json(clients);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Returns all subscribers.
 */
app.get('/api/subscribers', async function(_, response) {
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('subscribers');
  const subscribers = await collection.find().toArray();
  response.json(subscribers);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Returns all blogs.
 */
app.get('/api/blogs', async function(_, response) {
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('blogs');
  const blogs = await collection.find({}).project({_id: 0, id: '$guid', title: 1, preview: 1}).toArray();
  response.json(blogs);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Returns a blog by id.
 */
app.get('/api/blogs/:id', async function(request, response) {
  const id = request.params['id'];
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('blogs');
  const blog = await collection.findOne({guid: id}) || {};
  response.json(blog);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Adds a new service.
 */
app.post('/api/services', jsonParser, async function(request, response) {
  const service = request.body;
  if (!service) return response.sendStatus(400);
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('services');
  await collection.insertOne(service);
  response.sendStatus(200);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Adds a new example.
 */
app.post('/api/examples', jsonParser, async function(request, response) {
  const example = request.body;
  if (!example) return response.sendStatus(400);
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('examples');
  await collection.insertOne(example);
  response.sendStatus(200);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Adds a new client.
 */
app.post('/api/clients', jsonParser, async function(request, response) {
  const client = request.body;
  if (!client) return response.sendStatus(400);
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('clients');
  await collection.insertOne(client);
  response.sendStatus(200);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Adds a new subscriber.
 */
app.post('/api/subscribers', jsonParser, async function(request, response) {
  const subscriber = request.body;
  if (!subscriber) return response.sendStatus(400);
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('subscribers');
  await collection.insertOne(subscriber);
  response.sendStatus(200);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Adds a new blog.
 */
app.post('/api/blogs', jsonParser, async function(request, response) {
  const blog = request.body;
  if (!blog) return response.sendStatus(400);
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('blogs');
  await collection.insertOne(blog);
  response.sendStatus(200);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Adds a comment to a blog.
 */
app.post('/api/blogs/:id', jsonParser, async function(request, response) {
  const id = request.params['id'];
  const comment = request.body;
  if (!comment || !id) return response.sendStatus(400);
  const mongoClient = new MongoClient(mongoString);
  try {
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  const collection = db.collection('blogs');
  await collection.updateOne({guid: id}, { $push: { comments: comment.comment}});
  response.sendStatus(200);
  } finally {
  await mongoClient.close();
  }
});

/**
 * Starts the server.
 */
app.listen(port, function() {
  console.log(`Сервер работает по адресу http://localhost:${port}`);
});