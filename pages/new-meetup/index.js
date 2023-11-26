import NewMeetupForm from "@/components/meetups/NewMeetupForm";

function newMeetupPage() {
  function addMeetupHandler() {

  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default newMeetupPage;