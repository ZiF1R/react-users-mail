const db = require('../database');

class UserController {
  async getAllUsers(req, res) {
    let users = [];

    if (req.query.bySenderId) {
      users = await db.query(`SELECT sender_id, name
        FROM users join messages on users.id = sender_id
        group by name, sender_id
        order by sender_id`
      );
    } else {
      users = await db.query("SELECT * from users");
    }

    res.json({ users: users.rows });
  }

  async createUser(req, res) {
    const { name } = req.body;
    let user = await db.query("SELECT * FROM users WHERE name = $1", [name]);

    if (user.rowCount) {
      res.json({ user: user.rows[0] });
    } else {
      user = await db.query("INSERT INTO users (name) values ($1) RETURNING *", [name]);
      res.json({ user: user.rows[0] });
    }
  }

  async getUserMessages(req, res) {
    const id = +req.params.id;

    const messages = await db.query("SELECT * from messages where receiver_id = $1", [id]);
    res.json({ messages: messages.rows });
  }

  async sendMessage(req, res) {
    const {
      title,
      message,
      sender_id,
      receiver_id
    } = req.body;

    const sendedMessage = await db.query(`INSERT INTO messages
      (title, message, sender_id, receiver_id, reply_message_id, created_date)
      values ($1, $2, $3, $4, null, $5) RETURNING *`,
      [title, message, sender_id, receiver_id, new Date().toLocaleString()]
    );

    res.json({ message: sendedMessage.rows[0] });
  }

  async getMessage(req, res) {
    const message_id = +req.params.message_id;

    const message = await db.query(`
      select messages.id, title, message, reply_message_id, created_date, messages.sender_id, messages.receiver_id,
        (
          select name
          from users as u join messages as m on u.id = messages.sender_id
          group by name
        ) as sender,
        (
          select name
          from users as u join messages as m on u.id = messages.receiver_id
          group by name
        ) as receiver
      from messages where id = $1;
      `, [message_id]
    );
    res.json({ message: message.rows[0] });
  }
}

module.exports = new UserController();