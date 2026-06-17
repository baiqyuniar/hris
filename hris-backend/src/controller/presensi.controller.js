const pool = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const result = await pool.query(`
        SELECT
          pr.*,
          p.nama
        FROM presensi pr
        JOIN pegawai p
          ON pr.id_pegawai = p.id_pegawai
        ORDER BY tanggal DESC
      `);

      return res.json(result.rows);
    }

    const result = await pool.query(
      `
      SELECT *
      FROM presensi
      WHERE id_pegawai = $1
      ORDER BY tanggal DESC
      `,
      [req.user.id_pegawai],
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
      `
      SELECT *
      FROM presensi
      WHERE id_presensi = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Presensi tidak ditemukan",
      });
    }

    const data = result.rows[0];

    if (req.user.role === "user" && data.id_pegawai !== req.user.id_pegawai) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      id_pegawai,
      tanggal,
      status_hadir,
      jam_masuk,
      jam_keluar,
      terlambat_menit,
      lembur_menit,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO presensi
      (
        id_pegawai,
        tanggal,
        status_hadir,
        jam_masuk,
        jam_keluar,
        terlambat_menit,
        lembur_menit
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7
      )
      RETURNING *
      `,
      [
        id_pegawai,
        tanggal,
        status_hadir,
        jam_masuk,
        jam_keluar,
        terlambat_menit,
        lembur_menit,
      ],
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

    const {
      status_hadir,
      jam_masuk,
      jam_keluar,
      terlambat_menit,
      lembur_menit,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE presensi
      SET
        status_hadir = $1,
        jam_masuk = $2,
        jam_keluar = $3,
        terlambat_menit = $4,
        lembur_menit = $5
      WHERE id_presensi = $6
      RETURNING *
      `,
      [status_hadir, jam_masuk, jam_keluar, terlambat_menit, lembur_menit, id],
    );

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

    await pool.query(
      `
      DELETE FROM presensi
      WHERE id_presensi = $1
      `,
      [id],
    );

    res.json({
      message: "Presensi berhasil dihapus",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
