const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ====== DATABASE CONNECT ======
mongoose
  .connect("mongodb+srv://kashiui:kashiui@kashiui.rmsbt5a.mongodb.net/contactForm?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ====== SCHEMA ======
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

// ====== API ROUTE ======
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contactData = new Contact({
      name,
      email,
      phone,
      message,
    });

    await contactData.save();

    res.json({ success: true, msg: "Form submitted and saved in DB!" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "Error saving form!" });
  }
});

// ====== SERVER START ======
app.listen(5000, () => {
  console.log("Server running on http://localhost:5173/#/contact");
});
