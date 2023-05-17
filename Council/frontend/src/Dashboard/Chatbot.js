import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Typography, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";

const Counsil = () => {
  const [input, setInput] = useState("");
  const conversationContainerRef = useRef(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [conversation, setConversation] = useState(() => {
    const storedConversation = localStorage.getItem("conversation");
    return storedConversation ? JSON.parse(storedConversation) : [];
  });

  useEffect(() => {
    const storedConversation = localStorage.getItem("conversation");
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
    conversationContainerRef.current.scrollTop =
      conversationContainerRef.current.scrollHeight;
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsWaitingResponse(true);

    const userInput = input.trim();
    if (userInput === "") return;

    // Add the current input to the conversation
    setConversation([
      ...conversation,
      { text: userInput, isUser: true, time: format(new Date(), "hh:mm a") },
    ]);
    setInput("");

    const data = new FormData();
    data.append("data", JSON.stringify({ input: userInput }));

    try {
      const response = await fetch("/Chatbot", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const json = await response.json();
        const backendResponse = json;
        setIsWaitingResponse(false);
        // Add the backend response to the conversation
        setConversation((prevConversation) => [
          ...prevConversation,
          {
            text: backendResponse,
            isUser: false,
            time: format(new Date(), "hh:mm a"),
          },
        ]);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsWaitingResponse(false);
    }
  };
  return (
    <div className="chatbot-content">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="chatbot-field">
          <Box>
            <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
              CouncilBot
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              height: "500px",
              marginBottom: "20px",
              borderRadius: "5px",
              padding: "20px",
              overflowY: "auto",
              background: "#f2f2f2",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f2f2f2",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#003376",
                borderRadius: "4px",
              },
            }}
            ref={conversationContainerRef}
          >
            {conversation.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50%",
                  backgroundColor: " white",
                  padding: "20px",
                  margin: "20px",
                  marginTop: "100px",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Welcome!
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Let's have a conversation. Simply enter your message and start
                  chatting.
                </Typography>
              </Box>
            )}
            {conversation.map((message, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: message.isUser ? "flex-start" : "flex-end",
                  marginBottom: "10px",
                  maxWidth: "50%",
                  color: "black",
                  animation: "typing 1s infinite",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    borderRadius: "8px",
                    padding: "10px",
                    background: message.isUser ? "#e0e0e0" : "#bbb",
                  }}
                >
                  {message.isUser ? `You: ${message.text}` : message.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "600",
                    fontFamily: "QuickSand",
                    margin: "2px",
                    textAlign: message.isUser ? "left" : "right",
                    color: "black",
                  }}
                >
                  {message.time}
                </Typography>
              </Box>
            ))}
            {isWaitingResponse && (
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "flex-end",
                  marginBottom: "10px",
                  maxWidth: "80%",
                  color: "white",
                  background: "#bbb",
                  padding: "10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span className="typing-animation">
                  <span className="dot-1"></span>
                  <span className="dot-2"></span>
                  <span className="dot-3"></span>
                </span>
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="input"
              type="text"
              name="input"
              autoComplete="input"
              placeholder="Send a message."
              color="primary"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              sx={{
                background: "white",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" color="primary">
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>
      </form>
    </div>
  );
};

export default Counsil;
