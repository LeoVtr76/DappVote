import { useState, useEffect } from "react";

// Define a functional component named 'Store' that takes a single prop named 'state'
export const Vote = ({ contract }) => {
  const [vote, setVote] = useState(null);

  const changeVote = (event) => {
    setVote(parseInt(event.target.value));
  };
  const sendVote = async (event) => {
    event.preventDefault();
    console.log(contract);
    const voteResult = await contract.vote(vote);
    console.log("Transaction is done", voteResult);
  };
  const [voteCount1, setVoteCount1] = useState(0);
  const [voteCount2, setVoteCount2] = useState(0);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const voteCount1 = await getVote(0);
        const voteCount2 = await getVote(1);

        setVoteCount1(voteCount1);
        setVoteCount2(voteCount2);
      } catch (error) {
        console.error("Erreur lors de la récupération des votes:", error);
      }
    };

    const getVote = async (candidateid) => {
      const transaction = await contract.getVoteCount(candidateid);
      return transaction.toString(); // Assurez-vous que c'est la bonne méthode/propriété
    };

    fetchVotes();
  }, [contract.candidates]);

  return (
    <form onSubmit={sendVote} noValidate>
      <br />
      <br />
      <br />
      {vote !== null && (
        <>
          Vote actuel: {vote === 1 ? "1" : "2"}
          <br />
        </>
      )}
      <label className="textVote">Choisit un candidat </label>
      <div>
        <input
          type="radio"
          id="1"
          name="drone"
          value="1"
          onChange={changeVote}
        />
        <label for="1">1</label>
      </div>

      <div>
        <input
          type="radio"
          id="2"
          name="drone"
          value="2"
          onChange={changeVote}
        />
        <label for="2">2</label>
      </div>

      <div>
        <br></br>
        <button type="submit" disabled={vote === null}>
          Valider
        </button>
      </div>

      <div>
        <label>Nombre de vote de candidat 1 : {voteCount1}</label>
        <br />
        <label>Nombre de vote de candidat 2 : {voteCount2}</label>
      </div>
    </form>
  );
};
