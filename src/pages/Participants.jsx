import ParticipantForm from "../components/ParticipantForm";
import ParticipantList from "../components/ParticipantList";

function Participants({
  participants,
  setParticipants,
}) {

  const addParticipant = (
    participant
  ) => {

    setParticipants([
      ...participants,
      {
        ...participant,
        id: Date.now(),
      },
    ]);

  };

  const deleteParticipant = (id) => {

    setParticipants(
      participants.filter(
        (participant) =>
          participant.id !== id
      )
    );

  };

  return (
    <div className="page">

      <h1 className="title">
        Participants Module
      </h1>

      <ParticipantForm
        addParticipant={addParticipant}
      />

      <ParticipantList
        participants={participants}
        deleteParticipant={
          deleteParticipant
        }
      />

    </div>
  );
}

export default Participants;