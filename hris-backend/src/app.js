const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const jabatanRoutes = require("./routes/jabatan.routes");
const pegawaiRoutes = require("./routes/pegawai.routes");
const presensiRoutes = require("./routes/presensi.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/jabatan", jabatanRoutes);
app.use("/pegawai", pegawaiRoutes);
app.use("/presensi", presensiRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HRIS API Running",
  });
});

module.exports = app;
