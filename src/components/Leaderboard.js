import {
  addDoc,
  collection,
  getFirestore,
  query,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../style/Leaderboard.css";
import { store } from "../firebase/firebase.config";
import uniqid from "uniqid";

const Leaderboard = ({score}) => {
  const [scores, setScores] = useState([]);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addNewScore = async (e) => {
    e.preventDefault();
    try {
      const newScore = { name, score, id: uniqid() };
      await addDoc(collection(getFirestore(), "scores"), newScore);
      setSubmitted(true);
    } catch (error) {
      console.error("Oops, something went wrong:", error);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const retrieveScores = async () => {
      const scoresCollection = collection(store, "scores");
      const querySnapshot = await getDocs(query(scoresCollection));
      const retrievedScores = querySnapshot.docs.map((doc) => doc.data());
      return retrievedScores;
    };
  
    const sortTopScores = async () => {
      const retrievedScores = await retrieveScores();
      const sortedScores = retrievedScores.sort((a, b) => a.score - b.score);
      setScores(sortedScores);
    };
  
    sortTopScores();
  }, [submitted]);

  return (
    <div id="leaderboard">
      <div className="game-over">Game Over!</div>
      <div className="player-score">Your Score: {score}s</div>
      {!submitted && score !== 0 && (
        <form onSubmit={addNewScore}>
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      )}
      <div className="title">Leaderboard:</div>
      <div id="scores">
        {scores.length ? (
          scores.slice(0, 10).map(({ id, name, score }, index) => (
            <div className="score" key={id}>
              {index + 1}. {name} - {score}s
            </div>
          ))
        ) : (
          <div>No submissions yet. Be the first!</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
