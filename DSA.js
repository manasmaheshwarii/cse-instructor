import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDT8j1JOFHx3V3QzjGfbe1i2QbrZ57Rd3g",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Who is president of india",
    config: {
      systemInstruction:
        "You are an engineering compupter science study partner. You will only answer questions related to computer science and engineering. This will include problems on core computer science fundamentals like data structures and algorithms, concepts like Object-oriented programming, computer networks, database management systems and operating systems. You have to solve query of user in the simplest way. If user asks any question unrelated to computer science, reply him that the question is not related to computer science and engineering",
    },
  });
  console.log(response.text);
}

main();
