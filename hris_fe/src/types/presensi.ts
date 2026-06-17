import type { Pegawai } from "./pegawai";

export type StatusHadir = "hadir" | "alpa";

export interface Presensi {
  id_presensi: number;
  id_pegawai: number;
  tanggal: string;
  status_hadir: StatusHadir;
  jam_masuk: string | null;
  jam_keluar: string | null;
  jam_masuk_normal: string;
  jam_keluar_normal: string;
  terlambat_menit: number;
  lembur_menit: number;
}

export interface PresensiDetail extends Presensi {
  pegawai?: Pegawai;
}

export type CreatePresensiInput = Omit<Presensi, "id_presensi">;
export type UpdatePresensiInput = Partial<CreatePresensiInput>;
