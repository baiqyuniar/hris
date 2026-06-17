const pool = require("../config/db");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE username = $1
      `,
      [username],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Username tidak ditemukan",
      });
    }

    const user = result.rows[0];

    // sementara plaintext
    if (password !== user.password) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      {
        id_user: user.id_user,
        id_pegawai: user.id_pegawai,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      token,
      user: {
        id_user: user.id_user,
        username: user.username,
        role: user.role,
        id_pegawai: user.id_pegawai,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.profile = async (req, res) => {
  res.json(req.user);
};
