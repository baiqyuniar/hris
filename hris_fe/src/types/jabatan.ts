export interface Jabatan {
  id_jabatan: number;
  nama_jabatan: string;
  gaji_pokok: number;
}

export type CreateJabatanInput = Omit<Jabatan, "id_jabatan">;
export type UpdateJabatanInput = Partial<CreateJabatanInput>;
