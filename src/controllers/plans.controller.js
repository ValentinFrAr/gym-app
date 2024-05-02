const dotenv = require("dotenv").config();
const db = require("../db");
const nodemailer = require("nodemailer");

/////////////////

const sendSubscribePlanEmail = (email, firstname, lastname, plan) => {
  const EMAIL = process.env.USERMAIL;
  const PASSWORD = process.env.PASSMAIL;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  const htmlContent = `
  <html>
    <head>
    </head>
    <body>
      <div>
      <h1>Hi! There is a message from Gym'App</h1>
      <a href="https://ibb.co/XYGsgdY"><img src="https://i.ibb.co/xFrj0cF/logo.jpg" alt="logo" border="0"></a>
      <h2>Welcome to the gym!</h2>
      <p>Hello ${firstname} ${lastname}! 
      
      Your ${plan} plan subscription has renewed successfully!
      
      See you soon at the gym!
      
      The Gym'App Team</p>
      
      <h2>We look forward to seeing you! 💪</h2>
      </div>
    </body>
  </html>
`;

  let message = {
    from: EMAIL,
    to: email,
    subject: "Plan subscription from Gym'App ",
    html: htmlContent,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error("Error sending email", error);
    });
};
/////////////////

exports.subscribePlan = async (req, res, next) => {
  const user_id = req.params.id;
  const { plan, expires_date, email, firstname, lastname } = req.body;
  const query =
    "UPDATE gym.plans SET plan = $1, expires_date = $2  WHERE user_id = $3";
  const values = [plan, expires_date, user_id];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error subscribing plan", error: error.message });
    }
    sendSubscribePlanEmail(email, firstname, lastname, plan);
    return res.status(200).json({ message: "Plan subscribed successfully",plan: plan });
  });
};

////////////////
exports.getAllPlans = async (req, res) => {
  const query = "SELECT * FROM gym.plans ";
  await db.query(query, (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ messsage: "Error getting plans data", error: error.message });
    }
    res
      .status(200)
      .json({ message: "Data plans successfully got", plans: results.rows });
  });
};
