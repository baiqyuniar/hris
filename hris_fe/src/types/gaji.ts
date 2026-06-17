export interface GajiRekap {
  id_pegawai: number;
  nama: string;
  nama_jabatan: string;
  gaji_pokok: number;
  total_potongan: number;
  total_lembur: number;
  gaji_bersih: number;
  bulan: number;
  tahun: number;
}

export interface DashboardSummary {
  jumlah_pegawai: number;
  total_lembur_bulan_ini: number;
  total_potongan_bulan_ini: number;
}
