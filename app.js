const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const inputBox = document.getElementById("input-box");

const API_KEY = "AIzaSyDT8j1JOFHx3V3QzjGfbe1i2QbrZ57Rd3g"; // Replace with your Google API key

function appendMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-message" : "bot-message";
  msgDiv.innerText = message;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getGeminiResponse(message) {
  try {
    const response = await fetch(
      "https://genai.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          contents: message,
          config: {
            systemInstruction:
              "You are an engineering computer science study partner. You will only answer questions related to computer science and engineering simply. If unrelated, reply that the question is not related.",
          },
        }),
      }
    );
    const data = await response.json();
    return data.text || "Sorry, no response from API.";
  } catch (error) {
    return "Error: Could not get response.";
  }
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = inputBox.value.trim();
  if (!userInput) return;
  appendMessage(userInput, "user");
  inputBox.value = "";

  appendMessage("Typing...", "bot");

  const botReply = await getGeminiResponse(userInput);

  // Remove 'Typing...'
  chatWindow.lastChild.remove();
  appendMessage(botReply, "bot");
});
