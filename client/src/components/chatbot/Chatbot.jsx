// import React, { useState, useRef, useEffect } from "react";
// import {
//   LexRuntimeV2Client,
//   RecognizeTextCommand,
// } from "@aws-sdk/client-lex-runtime-v2";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

// // Initialize Lex client with environment variables
// const client = new LexRuntimeV2Client({
//   region: import.meta.env.VITE_AWS_REGION || "us-east-1",
//   credentials: fromCognitoIdentityPool({
//     clientConfig: {
//       region: import.meta.env.VITE_AWS_REGION || "us-east-1",
//     },
//     identityPoolId:
//       import.meta.env.VITE_AWS_IDENTITY_POOL_ID ||
//       "us-east-1:066172bf-bde1-4a76-b408-fefad3c5f125",
//   }),
// });

// const Chatbot = () => {
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       text: "Welcome! 👋\nAsk me about student performance, dropout risks, or recommendations.",
//       sender: "bot",
//       isTyping: false,
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const chatBoxRef = useRef(null);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const toggleChatbot = () => {
//     setIsChatbotOpen(!isChatbotOpen);
//   };

//   const closeChatbot = () => {
//     setIsChatbotOpen(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   };

//   const addMessage = (text, sender, isTyping = false) => {
//     setMessages((prev) => [...prev, { text, sender, isTyping }]);
//   };

//   const sendMessage = async () => {
//     const message = inputValue.trim();
//     if (!message) return;

//     setInputValue("");
//     addMessage(message, "user");
//     addMessage("", "bot", true);

//     try {
//       const command = new RecognizeTextCommand({
//         botAliasId: import.meta.env.VITE_LEX_BOT_ALIAS_ID || "HRY8ZZOSJV",
//         botId: import.meta.env.VITE_LEX_BOT_ID || "ZIZNS2A95J",
//         localeId: "en_US",
//         sessionId: `session-${Date.now()}`,
//         text: message,
//       });

//       const response = await client.send(command);
//       const botReply =
//         response.messages?.[0]?.content || "I didn't understand that.";

//       setMessages((prev) => prev.filter((msg) => !msg.isTyping));
//       addMessage(botReply, "bot");
//     } catch (error) {
//       setMessages((prev) => prev.filter((msg) => !msg.isTyping));
//       addMessage(
//         "Sorry, I'm having trouble connecting. Please try again.",
//         "bot"
//       );
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <button
//         className="chat-button"
//         onClick={toggleChatbot}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           width: "60px",
//           height: "60px",
//           backgroundColor: "#FF8B0D",
//           borderRadius: "50%",
//           border: "none",
//           color: "white",
//           fontSize: "24px",
//           cursor: "pointer",
//           boxShadow: "0 4px 20px rgba(255, 139, 13, 0.4)",
//           transition: "all 0.3s ease",
//           zIndex: 1000,
//         }}
//       >
//         🎓
//       </button>

//       {isChatbotOpen && (
//         <div
//           className="chatbot-overlay"
//           onClick={closeChatbot}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             zIndex: 999,
//           }}
//         />
//       )}

//       <div
//         className={`chatbot-container ${isChatbotOpen ? "show" : ""}`}
//         style={{
//           display: isChatbotOpen ? "flex" : "none",
//           position: "fixed",
//           bottom: "100px",
//           right: "30px",
//           width: "350px",
//           height: "500px",
//           borderRadius: "20px",
//           boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
//           flexDirection: "column",
//           overflow: "hidden",
//           zIndex: 1001,
//           animation: isChatbotOpen ? "slideIn 0.3s ease-out" : "none",
//         }}
//       >
//         <div
//           className="chatbot-header"
//           style={{
//             background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
//             color: "white",
//             padding: "15px",
//             textAlign: "center",
//             fontSize: "14px",
//             fontWeight: "bold",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <span>🎓 Student Assistant</span>
//           <button
//             className="close-btn"
//             onClick={closeChatbot}
//             style={{
//               background: "none",
//               border: "none",
//               color: "white",
//               fontSize: "18px",
//               cursor: "pointer",
//               padding: 0,
//               width: "25px",
//               height: "25px",
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "background 0.3s ease",
//             }}
//           >
//             ×
//           </button>
//         </div>

//         <div
//           className="chat-box"
//           ref={chatBoxRef}
//           style={{
//             flex: 1,
//             padding: "10px",
//             overflowY: "auto",
//             display: "flex",
//             flexDirection: "column",
//             gap: "8px",
//             background: "white",
//           }}
//         >
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${message.sender}`}
//               style={{
//                 maxWidth: "85%",
//                 padding: "8px 12px",
//                 borderRadius: "15px",
//                 fontSize: "13px",
//                 lineHeight: 1.3,
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                 animation: "fadeIn 0.3s ease-in",
//                 alignSelf:
//                   message.sender === "user" ? "flex-end" : "flex-start",
//                 background:
//                   message.sender === "user"
//                     ? "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
//                     : "linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)",
//                 color: message.sender === "user" ? "white" : "#2c3e50",
//                 borderBottomRightRadius:
//                   message.sender === "user" ? "5px" : "15px",
//                 borderBottomLeftRadius:
//                   message.sender === "user" ? "15px" : "5px",
//               }}
//             >
//               {message.isTyping ? (
//                 <div
//                   className="typing-dots"
//                   style={{ display: "flex", gap: "3px", padding: "6px 0" }}
//                 >
//                   <span
//                     style={{
//                       width: "6px",
//                       height: "6px",
//                       borderRadius: "50%",
//                       backgroundColor: "#95a5a6",
//                       animation: "typing 1.4s infinite ease-in-out",
//                       animationDelay: "-0.32s",
//                     }}
//                   ></span>
//                   <span
//                     style={{
//                       width: "6px",
//                       height: "6px",
//                       borderRadius: "50%",
//                       backgroundColor: "#95a5a6",
//                       animation: "typing 1.4s infinite ease-in-out",
//                       animationDelay: "-0.16s",
//                     }}
//                   ></span>
//                   <span
//                     style={{
//                       width: "6px",
//                       height: "6px",
//                       borderRadius: "50%",
//                       backgroundColor: "#95a5a6",
//                       animation: "typing 1.4s infinite ease-in-out",
//                     }}
//                   ></span>
//                 </div>
//               ) : (
//                 message.text
//               )}
//             </div>
//           ))}
//         </div>

//         <div
//           className="chatbot-footer"
//           style={{
//             padding: "10px",
//             display: "flex",
//             gap: "8px",
//             background: "rgba(255, 255, 255, 0.95)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your message..."
//             style={{
//               flex: 1,
//               padding: "8px 12px",
//               fontSize: "13px",
//               border: "2px solid #e0e6ed",
//               borderRadius: "20px",
//               outline: "none",
//               transition: "all 0.3s ease",
//               background: "rgba(255, 255, 255, 0.9)",
//             }}
//           />
//           <button
//             className="send-btn"
//             onClick={sendMessage}
//             style={{
//               padding: "8px 15px",
//               background: "#FF8B0D",
//               border: "none",
//               borderRadius: "20px",
//               color: "white",
//               fontWeight: "bold",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               fontSize: "13px",
//               boxShadow: "0 2px 8px rgba(255, 139, 13, 0.3)",
//             }}
//           >
//             Send
//           </button>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes typing {
//           0%,
//           80%,
//           100% {
//             transform: scale(0.8);
//             opacity: 0.5;
//           }
//           40% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         @keyframes slideIn {
//           from {
//             transform: translateY(100px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .chat-button:hover {
//           transform: scale(1.1);
//           box-shadow: 0 6px 25px rgba(255, 139, 13, 0.6);
//         }

//         .close-btn:hover {
//           background: rgba(255, 255, 255, 0.2);
//         }

//         input[type="text"]:focus {
//           border-color: #3498db;
//           box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
//         }

//         .send-btn:hover {
//           background: #e67e00 !important;
//           transform: translateY(-1px);
//         }
//       `}</style>
//     </>
//   );
// };

// export default Chatbot;
