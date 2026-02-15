import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import contact  from "./models/Message.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import adminAuth from "./middleware/auth.middleware.js"
import dns from "node:dns";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));;
app.use(express.json());
app.use(cookieParser());

// Contact API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (
    !name?.trim() ||
    !email?.trim() ||
    !message?.trim()
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  
  try{
    const savedMessage = await contact.create({
      name: name.trim(),
      email: email.trim(),
       message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Message saved successfully"
    });
  } catch (error){
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to save message",
    });
  }
});

// Message fatch
app.get('/Message',adminAuth, async (req, res) => {
  try{
    const data = await contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data,
      
    });
    
  } catch(error){
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages"
    });
  }
});

//Message delete
app.delete("/Message/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});



app.use("/api", authRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}


app.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});
