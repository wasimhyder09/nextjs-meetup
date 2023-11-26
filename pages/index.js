import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 City',
    description: 'This is first meetup'
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/M%C3%BCnchen_-_Arnulfpark_%28Panorama%29.JPG/2560px-M%C3%BCnchen_-_Arnulfpark_%28Panorama%29.JPG',
    address: 'Some address 5, Navada',
    description: 'This is second meetup'
  },
  {
    id: 'm3',
    title: 'A third meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Arnulfpark_-_Wohngeb%C3%A4ude.jpg/2560px-Arnulfpark_-_Wohngeb%C3%A4ude.jpg',
    address: 'Some address 8-2, Gotham City',
    description: 'This is third meetup'
  }
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />
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
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10 // In seconds, page will be regenerated after provided seconds
  }
}

export default HomePage;