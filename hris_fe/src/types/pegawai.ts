import type { Jabatan } from "./jabatan";

export type Gelar = "D3" | "S1" | "S2";
export type Role = "admin" | "user";

export interface Pegawai {
  id_pegawai: number;
  nama: string;
  gelar: Gelar;
  id_jabatan: number;
  email: string;
  role: Role;
}

export interface PegawaiDetail extends Pegawai {
  jabatan?: Jabatan;
}

export type CreatePegawaiInput = Omit<Pegawai, "id_pegawai"> & {
  password: string;
};

export type UpdatePegawaiInput = Partial<Omit<CreatePegawaiInput, "password">>;
