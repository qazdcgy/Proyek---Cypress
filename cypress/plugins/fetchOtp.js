const imaps = require("imap-simple");
const cheerio = require("cheerio");

const config = {
  imap: {
    user: "newbie2346@gmail.com",
    password: "xxxx xxxx xxxx", // Password aplikasi gmail
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 3000,
  },
};

const getOtpFromEmail = async () => {
  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = [
      "UNSEEN",
      ["HEADER", "SUBJECT", "[HRIS] OTP Login"],
    ];

    const fetchOptions = {
      bodies: ["HEADER", "TEXT"],
      markSeen: false,
    };

    const results = await connection.search(searchCriteria, fetchOptions);

    if (results.length > 0) {
      const email = results[0];
      const emailId = email.attributes.uid;
      const body = email.parts.filter((part) => part.which === "TEXT")[0].body;

      const $ = cheerio.load(body);
      const teks = $("h1").text();
      const otpCode = teks.slice(-5);

      await connection.addFlags([emailId], ["\\Seen"]);

      return otpCode;
    } else {
      throw new Error("No unread emails with subject [HRIS] OTP Login.");
    }
  } catch (err) {
    throw new Error("Error fetching OTP: " + err.message);
  }
};

module.exports = { getOtpFromEmail };
