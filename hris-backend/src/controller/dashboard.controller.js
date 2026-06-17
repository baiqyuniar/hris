const pool = require("../config/db");

exports.adminDashboard = async (req, res) => {
  try {
    const pegawai = await pool.query("SELECT COUNT(*) FROM pegawai");

    const jabatan = await pool.query("SELECT COUNT(*) FROM jabatan");

    const alpa = await pool.query(`
        SELECT COUNT(*)
        FROM presensi
        WHERE status_hadir='alpa'
      `);

    res.json({
      totalPegawai: pegawai.rows[0].count,

      totalJabatan: jabatan.rows[0].count,

      totalAlpa: alpa.rows[0].count,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.userDashboard = async (req, res) => {
  try {
    const result = await pool.query(
      `
  SELECT
    p.nama,
    j.nama_jabatan,

    COUNT(pr.id_presensi) AS total_presensi,

    SUM(
      CASE
        WHEN pr.status_hadir = 'alpa'
        THEN 1
        ELSE 0
      END
    ) AS total_alpa,

    COALESCE(
      SUM(pr.lembur_menit),
      0
    ) AS total_lembur_menit

  FROM pegawai p

  JOIN jabatan j
  ON p.id_jabatan = j.id_jabatan

  LEFT JOIN presensi pr
  ON p.id_pegawai = pr.id_pegawai

  WHERE p.id_pegawai = $1

  GROUP BY
    p.nama,
    j.nama_jabatan
  `,
      [req.user.id_pegawai],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Data pegawai tidak ditemukan",
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
