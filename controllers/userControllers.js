const db = require("../config/db.js");
const { use } = require("../routers/userRouters.js");

module.exports = {
  getAll: (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) =>{
      if (err) return res.status(400).send(err)
      res.send({
        status: 200,
        data: result
      })
    })
  },
  getById: (req, res) => {
    db.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, result) => {
      if (err) return res.status(400).send(err)
      res.send({
        status: 200,
        data: result
      })
    })
  },
  addUser: (req, res) => {
    const { username, email, password, age } = req.body;
    db.query(`INSERT INTO users VALUES (null, "${username}", "${email}", "${password}", "${age}")`, (err, result) => {
      if (err) return res.status(400).send(err)
      res.send({
        status: 200,
        message: "new user has been added"
      })
    })
  },
  deleteById: (req, res) => {
    db.query(`DELETE FROM users WHERE id = ${req.params.id}`, (err, result) => {
      // console.log(result);
      if (err) return res.status(400).send(err)
      if (result.affectedRows == 0) {
        return res.send({
          status: 400,
          message: `id not found`
        });
      }
      res.send({
        status: 200,
        message: `id ${req.params.id} successfully deleted`
      })
    })
  },
  editById: (req, res) => {
    db.query(`UPDATE users SET ? WHERE id = ?`, [req.body, req.params.id], (err, result) => {
      console.log(result);
      if (err) return res.status(400).send(err)
      if (result.changedRows == 0) {
        return res.send({
          status: 400,
          message: `id not found`
        });
      }
      res.send({
        status: 200,
        message: `id ${req.params.id} successfully updated`
      });
    })
  }
}