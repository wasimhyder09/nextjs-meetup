import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        ></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>)
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb://wasimhyder09:mongodb@ac-3ukcdnv-shard-00-00.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-01.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-02.5yu9va3.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-u080l5-shard-0&authSource=admin&retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() }
    })),
    fallback: false // defines if all paths are here. Default means all of them are.
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect('mongodb://wasimhyder09:mongodb@ac-3ukcdnv-shard-00-00.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-01.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-02.5yu9va3.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-u080l5-shard-0&authSource=admin&retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId)
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  }
}
export default MeetupDetails;