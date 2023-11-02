const express = require("express");
const app = express();
const PORT_NUMBER = 9000;
const cors = require('cors');
const speakeasy = require('speakeasy');

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

  console.log(secret, totpCode, totpValid)
  
  if (!totpValid) {
    return res.json({ success: false });
  }

  // If the TOTP code is valid, send a success response.
  return res.json({ success: true });
});

app.listen(PORT_NUMBER, () => {
    console.log("Server started at port " + PORT_NUMBER);
});
