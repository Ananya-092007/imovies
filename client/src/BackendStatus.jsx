
import { useEffect, useState } from "react";

function BackendStatus() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Could not connect to the backend.");
      });
  }, []);

  return (
    <p style={{ textAlign: "center", padding: "10px" }}>
      {message}
    </p>
  );
}

export default BackendStatus;
