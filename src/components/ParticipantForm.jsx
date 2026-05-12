import { useState } from "react";

function ParticipantForm({
  addParticipant,
}) {

  const [participant, setParticipant] =
    useState({
      name: "",
      email: "",
      event: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    addParticipant(participant);

    setParticipant({
      name: "",
      email: "",
      event: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Participant Name"
        value={participant.name}
        onChange={(e) =>
          setParticipant({
            ...participant,
            name: e.target.value,
          })
        }
        required
      />

      <input
        type="email"
        placeholder="Email ID"
        value={participant.email}
        onChange={(e) =>
          setParticipant({
            ...participant,
            email: e.target.value,
          })
        }
        required
      />

      <input
        type="text"
        placeholder="Event Name"
        value={participant.event}
        onChange={(e) =>
          setParticipant({
            ...participant,
            event: e.target.value,
          })
        }
        required
      />

      <button type="submit">
        Add Participant
      </button>

    </form>
  );
}

export default ParticipantForm;