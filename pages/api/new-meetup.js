import { MongoClient } from "mongodb";
export const config = {
  api: {
    externalResolver: true,
  },
}
async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body;

      const client = await MongoClient.connect('mongodb://wasimhyder09:mongodb@ac-3ukcdnv-shard-00-00.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-01.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-02.5yu9va3.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-u080l5-shard-0&authSource=admin&retryWrites=true&w=majority');
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);
      console.log(result);

      client.close();

      res.status(201).json({ message: 'Meetup inserted!' });
    }
  }
  catch (error) {
    console.log(error);
  }
}

export default handler;