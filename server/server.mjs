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
      name: 'Кофе',
      description: '',
      price: 500,
      mesurement: 'за чашку',
      img: '/statics/demontazh-plitki.jpg',
    },
    {
      name: 'Десерты',
      description: '',
      price: 500,
      mesurement: 'за шт',
      img: '/statics/montazh-vodoprovoda.jpg',
    },
    {
      name: 'Завтраки',
      description: '',
      price: 500,
      mesurement: 'за шт',
      img: '/statics/montazh-novoy-plitki.jpg',
    },
    {
      name: 'Книги',
      description: '',
      price: 500,
      mesurement: 'за шт',
      img: '/statics/montazh-smesitelya.jpg',
    },
    ]);
  }
  const exampleCollections = db.collection('examples');
  if (await exampleCollections.countDocuments() === 0) {
    await exampleCollections.insertMany([
    {
      service: 'Кофе',
      img: '/statics/demontazh-plitki.jpg',
    },
    {
      service: 'Десерты',
      img: '/statics/demontazh-plitki-2.jpg',
    },
    {
      service: 'Завтраки',
      img: '/statics/montazh-novoy-plitki.jpg',
    },
    {
      service: 'Книги',
      img: '/statics/montazh-smesitelya.jpg',
        },
    ]);
  }
  const blogsCollections = db.collection('blogs');
  if (await blogsCollections.countDocuments() === 0) {
    await blogsCollections.insertMany([
    {
      guid: randomUUID(),
      title: 'Марина',
      preview: 'Зашла сюда спонтанно, проходя мимо, и не...',
      text: 'Зашла сюда спонтанно, проходя мимо, и не пожалела! Атмосфера очень уютная, играет приятная музыка, нет навязчивого шума. Бариста встретила с улыбкой, помогла определиться с выбором — я взяла раф с карамелью. Кофе приготовили буквально за 5 минут, напиток получился просто божественный — насыщенный, с приятным ароматом и идеальным балансом сладости. Обязательно вернусь ещё',
      comments: [
      'спасибо, было полезно',
      'Узнал много нового!'
      ],
    },
    {
      guid: randomUUID(),
      title: 'Ольга',
      preview: 'Посещаю эту кофейню уже второй месяц подряд...',
      text: 'Посещаю эту кофейню уже второй месяц подряд, практически каждый день. Здесь работает замечательный бариста, который всегда помнит мои предпочтения и готовит идеальный эспрессо. Особенно радует, что в кофейне чисто и аккуратно, есть удобные столики, где можно спокойно поработать с ноутбуком. Ценник более чем адекватный, а качество напитков на высоте. Рекомендую всем!',
      comments: [],
    },
    {
      guid: randomUUID(),
      title: 'Сергей',
      preview: 'Отмечали с подругами день рождения, выбрали эту кофейню...',
      text: 'Отмечали с подругами день рождения, выбрали эту кофейню из-за хороших отзывов. Не прогадали! Персонал был внимателен и дружелюбен, быстро обслужили всю нашу компанию. Брали разные напитки — от классического капучино до экзотического бамбла, все оказались превосходными. Десерты тоже не подвели, особенно впечатлил шоколадный торт. Атмосфера располагала к общению, музыка не мешала разговаривать. Однозначно будем приходить ещё!',
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