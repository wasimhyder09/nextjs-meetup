import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Get a list of react meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>)
}

// This func is used to run some script for a page on server side,
// each time a request has been made.

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// This func is used to run some script for a page on browser side,
// each time a request has been made.

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb://wasimhyder09:mongodb@ac-3ukcdnv-shard-00-00.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-01.5yu9va3.mongodb.net:27017,ac-3ukcdnv-shard-00-02.5yu9va3.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-u080l5-shard-0&authSource=admin&retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      })),
    },
    revalidate: 10 // In seconds, page will be regenerated after provided seconds
  }
}

export default HomePage;