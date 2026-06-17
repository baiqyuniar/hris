const pool = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const result = await pool.query(`
        SELECT
          p.id_pegawai,
          p.nama,
          p.gelar,
          p.id_jabatan,
          j.nama_jabatan,
          j.gaji_pokok
        FROM pegawai p
        JOIN jabatan j
          ON p.id_jabatan = j.id_jabatan
        ORDER BY p.id_pegawai
      `);

      return res.json(result.rows);
    }

    const result = await pool.query(
      `
      SELECT
        p.id_pegawai,
        p.nama,
        p.gelar,
        p.id_jabatan,
        j.nama_jabatan,
        j.gaji_pokok
      FROM pegawai p
      JOIN jabatan j
        ON p.id_jabatan = j.id_jabatan
      WHERE p.id_pegawai = $1
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

    if (req.user.role === "user" && Number(id) !== req.user.id_pegawai) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const result = await pool.query(
      `
      SELECT
        p.*,
        j.nama_jabatan,
        j.gaji_pokok
      FROM pegawai p
      JOIN jabatan j
      ON p.id_jabatan = j.id_jabatan
      WHERE p.id_pegawai = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pegawai tidak ditemukan",
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
    const { nama, gelar, id_jabatan } = req.body;

    const result = await pool.query(
      `
      INSERT INTO pegawai
      (
        nama,
        gelar,
        id_jabatan
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING *
      `,
      [nama, gelar, id_jabatan],
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

    const { nama, gelar, id_jabatan } = req.body;

    const result = await pool.query(
      `
      UPDATE pegawai
      SET
        nama = $1,
        gelar = $2,
        id_jabatan = $3
      WHERE id_pegawai = $4
      RETURNING *
      `,
      [nama, gelar, id_jabatan, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pegawai tidak ditemukan",
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
      DELETE FROM pegawai
      WHERE id_pegawai = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Pegawai tidak ditemukan",
      });
    }

    res.json({
      message: "Pegawai berhasil dihapus",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getGaji = async (req, res) => {
  try {
    const { id } = req.params;

    const bulan = Number(req.query.bulan);

    const tahun = Number(req.query.tahun);

    if (req.user.role === "user" && Number(id) !== req.user.id_pegawai) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const result = await pool.query(
      `
      SELECT
        p.nama,
        j.nama_jabatan,
        j.gaji_pokok,

        (
          SUM(
            CASE
              WHEN pr.status_hadir='alpa'
              THEN 100000
              ELSE 0
            END
          )
          +
          COALESCE(
            SUM(pr.terlambat_menit),
            0
          ) * 2000
        ) AS total_potongan,

        COALESCE(
          SUM(pr.lembur_menit),
          0
        ) * 1000
        AS total_lembur,

        (
          j.gaji_pokok
          -
          (
            SUM(
              CASE
                WHEN pr.status_hadir='alpa'
                THEN 100000
                ELSE 0
              END
            )
            +
            COALESCE(
              SUM(pr.terlambat_menit),
              0
            ) * 2000
          )
          +
          COALESCE(
            SUM(pr.lembur_menit),
            0
          ) * 1000
        ) AS gaji_bersih

      FROM pegawai p
      JOIN jabatan j
      ON p.id_jabatan = j.id_jabatan

      JOIN presensi pr
      ON p.id_pegawai = pr.id_pegawai

      WHERE
        p.id_pegawai = $1
      AND
        EXTRACT(MONTH FROM pr.tanggal) = $2
      AND
        EXTRACT(YEAR FROM pr.tanggal) = $3

      GROUP BY
        p.nama,
        j.nama_jabatan,
        j.gaji_pokok
      `,
      [id, bulan, tahun],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
