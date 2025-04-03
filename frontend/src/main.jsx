import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { backend } from "declarations/backend";
// import botImg from "/bot.svg";
// import userImg from "/user.svg";
import "/index.css";

const App = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [recommendation, setRecommendation] = useState("Personalized suggestions appear here...");

  const moodMap = {
    "😞": "sad",
    "😐": "neutral",
    "🙂": "content",
    "😀": "happy",
    "😃": "excited",
  };

  const handleRecommendation = async () => {
    if (!selectedEmoji) {
      setRecommendation("Please select an emoji to get a recommendation.");
      return;
    }

    const mood = moodMap[selectedEmoji];

    try {
      const response = await backend.prompt(`Give a recommendation for someone feeling ${mood}.`);
      setRecommendation(response);
    } catch (error) {
      setRecommendation("Error fetching recommendation. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-white">
      <h2 className="text-xl font-bold mb-4">Daily Check-In</h2>
      <div className="flex space-x-2 mb-4">
        {Object.keys(moodMap).map((emoji) => (
          <button
            key={emoji}
            className={`text-2xl p-2 rounded-full transition ${
              selectedEmoji === emoji ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <button onClick={handleRecommendation} className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-4">
        QHACK NOW
      </button>
      <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Recommendations</h3>
        <p className="text-gray-600">{recommendation}</p>
      </div>
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
