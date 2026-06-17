const pool = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jabatan ORDER BY id_jabatan",
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM jabatan WHERE id_jabatan = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Jabatan tidak ditemukan",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama_jabatan, gaji_pokok } = req.body;

    const result = await pool.query(
      `
      INSERT INTO jabatan
      (nama_jabatan, gaji_pokok)
      VALUES ($1, $2)
      RETURNING *
      `,
      [nama_jabatan, gaji_pokok],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const { nama_jabatan, gaji_pokok } = req.body;

    const result = await pool.query(
      `
      UPDATE jabatan
      SET
      nama_jabatan = $1,
      gaji_pokok = $2
      WHERE id_jabatan = $3
      RETURNING *
      `,
      [nama_jabatan, gaji_pokok, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Jabatan tidak ditemukan",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM jabatan
      WHERE id_jabatan = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Jabatan tidak ditemukan",
      });
    }

    res.json({
      message: "Jabatan berhasil dihapus",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
