import type { DashboardSummary, GajiRekap } from "../types/gaji";
import type { Jabatan } from "../types/jabatan";
import type { Pegawai } from "../types/pegawai";
import type { Presensi } from "../types/presensi";

export const mockJabatan: Jabatan[] = [
  { id_jabatan: 1, nama_jabatan: "Staff IT", gaji_pokok: 6000000 },
  { id_jabatan: 2, nama_jabatan: "Manager IT", gaji_pokok: 12000000 },
  { id_jabatan: 3, nama_jabatan: "HRD", gaji_pokok: 7000000 },
];

export const mockPegawai: Pegawai[] = [
  {
    id_pegawai: 1,
    nama: "Budi Santoso",
    gelar: "S1",
    id_jabatan: 1,
    email: "admin",
    role: "admin",
  },
  {
    id_pegawai: 2,
    nama: "Siti Aminah",
    gelar: "D3",
    id_jabatan: 1,
    email: "siti",
    role: "user",
  },
  {
    id_pegawai: 3,
    nama: "Andi Wijaya",
    gelar: "S2",
    id_jabatan: 2,
    email: "andi",
    role: "user",
  },
];

export const mockPresensi: Presensi[] = [
  {
    id_presensi: 1,
    id_pegawai: 2,
    tanggal: "2026-06-01",
    status_hadir: "hadir",
    jam_masuk: "09:10:00",
    jam_keluar: "17:30:00",
    jam_masuk_normal: "09:00:00",
    jam_keluar_normal: "17:00:00",
    terlambat_menit: 10,
    lembur_menit: 30,
  },
  {
    id_presensi: 2,
    id_pegawai: 2,
    tanggal: "2026-06-02",
    status_hadir: "alpa",
    jam_masuk: null,
    jam_keluar: null,
    jam_masuk_normal: "09:00:00",
    jam_keluar_normal: "17:00:00",
    terlambat_menit: 0,
    lembur_menit: 0,
  },
  {
    id_presensi: 3,
    id_pegawai: 3,
    tanggal: "2026-06-01",
    status_hadir: "hadir",
    jam_masuk: "08:55:00",
    jam_keluar: "18:00:00",
    jam_masuk_normal: "09:00:00",
    jam_keluar_normal: "17:00:00",
    terlambat_menit: 0,
    lembur_menit: 60,
  },
];

export function computeMockGaji(
  idPegawai: number,
  bulan: number,
  tahun: number,
): GajiRekap {
  const pegawai = mockPegawai.find((p) => p.id_pegawai === idPegawai)!;
  const jabatan = mockJabatan.find((j) => j.id_jabatan === pegawai.id_jabatan)!;

  const presensiBulanIni = mockPresensi.filter((p) => {
    const tgl = new Date(p.tanggal);
    return (
      p.id_pegawai === idPegawai &&
      tgl.getMonth() + 1 === bulan &&
      tgl.getFullYear() === tahun
    );
  });

  const jumlahAlpa = presensiBulanIni.filter(
    (p) => p.status_hadir === "alpa",
  ).length;
  const totalMenitTerlambat = presensiBulanIni.reduce(
    (sum, p) => sum + p.terlambat_menit,
    0,
  );
  const totalMenitLembur = presensiBulanIni.reduce(
    (sum, p) => sum + p.lembur_menit,
    0,
  );

  const totalPotongan = jumlahAlpa * 100000 + totalMenitTerlambat * 2000;
  const totalLembur = totalMenitLembur * 1000;

  return {
    id_pegawai: pegawai.id_pegawai,
    nama: pegawai.nama,
    nama_jabatan: jabatan.nama_jabatan,
    gaji_pokok: jabatan.gaji_pokok,
    total_potongan: totalPotongan,
    total_lembur: totalLembur,
    gaji_bersih: jabatan.gaji_pokok - totalPotongan + totalLembur,
    bulan,
    tahun,
  };
}

export function computeMockDashboardSummary(
  bulan: number,
  tahun: number,
): DashboardSummary {
  const presensiBulanIni = mockPresensi.filter((p) => {
    const tgl = new Date(p.tanggal);
    return tgl.getMonth() + 1 === bulan && tgl.getFullYear() === tahun;
  });

  const jumlahAlpa = presensiBulanIni.filter(
    (p) => p.status_hadir === "alpa",
  ).length;
  const totalMenitTerlambat = presensiBulanIni.reduce(
    (sum, p) => sum + p.terlambat_menit,
    0,
  );
  const totalMenitLembur = presensiBulanIni.reduce(
    (sum, p) => sum + p.lembur_menit,
    0,
  );

  return {
    jumlah_pegawai: mockPegawai.length,
    total_lembur_bulan_ini: totalMenitLembur * 1000,
    total_potongan_bulan_ini: jumlahAlpa * 100000 + totalMenitTerlambat * 2000,
  };
}
