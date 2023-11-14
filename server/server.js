const SEND_GRID_API_KEY = "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"

const express = require("express");
const app = express();
const PORT_NUMBER = 9000;
const cors = require('cors');
const speakeasy = require('speakeasy');

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SEND_GRID_API_KEY);

const firebase = require('firebase/app');
const { collection, getDocs, where, doc, updateDoc, getFirestore, query } = require('firebase/firestore');
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyASafCzPxYLUgNm_6h9-nhmh55eOTw5b80",
  authDomain: "personalproject-c291a.firebaseapp.com",
  projectId: "personalproject-c291a",
  storageBucket: "personalproject-c291a.appspot.com",
  messagingSenderId: "24699574002",
  appId: "1:24699574002:web:515a14f04d480970ba226b"
};

firebase.initializeApp(firebaseConfig);

const db = getFirestore(app)

app.use(cors());

app.get("/get-users", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]});
});

app.get("/get-otp", (req, res) => {
    const username = req.query.username;
    // The rest of your code remains the same
    const totpSecret = speakeasy.generateSecret({ length: 20 });
    const totpKey = totpSecret.base32;
    const qrCodeUrl = speakeasy.otpauthURL({
        secret: totpKey,
        encoding: 'base32',
        label: username,
        issuer: 'DevLink',
    });
    res.json({ totpKey, qrCodeUrl });
});

app.get("/verify-otp", (req, res) => {
  const secret = req.query.secret;
  const totpCode = req.query.totpCode;

  // Validate TOTP
  const totpValid = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: totpCode,
  });
  
  if (!totpValid) {
    return res.json({ success: false });
  }

  // If the TOTP code is valid, send a success response.
  return res.json({ success: true });
});

app.get("/email-verify", (req, res) => {
  const username = req.query.username;
  const email = req.query.email;
    // Generate OTP secret and qr
    const totpSecret = speakeasy.generateSecret({ length: 20 });
    const totpKey = totpSecret.base32;
    const qrCodeUrl = speakeasy.otpauthURL({
        secret: totpKey,
        encoding: 'base32',
        label: username,
        issuer: 'DevLink',
    });
  // Send an email with the QR code URL using SendGrid
  const msg = {
    to: email, 
    from: "vhh064@gmail.com", 
    subject: "QR Code for Email Verification",
    text: "Scan the QR code below to verify your email:",
    html: `<h1>Scan the QR code below to verify your email</h1><img src="https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeUrl}" alt="QR Code">`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");

      //Update user secret in firestore
      const q1 = query(collection(db, 'users'), where('username', '==', username));
      getDocs(q1)
      .then((result) => {
        const userDoc = result.docs[0];
        const userRef = doc(db, 'users', userDoc.id);
        const updatedFields = { secret: totpKey };
        updateDoc(userRef, updatedFields);
      })
      res.json({ success: true, secret: totpKey });
    })
    .catch((error) => {
      console.error(error);
      res.json({ success: false });
    });
});

app.listen(PORT_NUMBER, () => {
    console.log("Server started at port " + PORT_NUMBER);
});
