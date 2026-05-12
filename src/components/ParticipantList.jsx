function ParticipantList({
  participants,
  deleteParticipant,
}) {
  return (
    <div className="table-container">

      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {participants.map((participant) => (

            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.email}</td>
              <td>{participant.event}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteParticipant(
                      participant.id
                    )
                  }
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ParticipantList;