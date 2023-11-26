import MeetupDetail from "@/components/meetups/MeetupDetail";

function meetupDetails(props) {
  return <MeetupDetail
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
  />
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      }
    ],
    fallback: false // defines if all paths are here. Default means all of them are.
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {
        id: meetupId,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        title: "First meetup",
        address: "Some address",
        description: "This is first meetup"
      }
    }
  }
}
export default meetupDetails;