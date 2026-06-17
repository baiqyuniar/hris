import type {
  CreateJabatanInput,
  Jabatan,
  UpdateJabatanInput,
} from "../types/jabatan";
import type {
  CreatePegawaiInput,
  Pegawai,
  PegawaiDetail,
  UpdatePegawaiInput,
} from "../types/pegawai";
import type {
  CreatePresensiInput,
  Presensi,
  PresensiDetail,
  UpdatePresensiInput,
} from "../types/presensi";
import {
  computeMockDashboardSummary,
  computeMockGaji,
  mockJabatan,
  mockPegawai,
  mockPresensi,
} from "./mock-data";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  role: "admin" | "user";
  id_pegawai: number;
  nama: string;
}

const API_MODE = process.env.NEXT_PUBLIC_API_MODE ?? "mock";
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include", // ikut kirim cookie JWT
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request gagal: ${res.status}`);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const authApi = {
  login: (data: LoginInput): Promise<LoginResponse> => {
    if (API_MODE === "mock") {
      const pegawai = mockPegawai.find((p) => p.email === data.email);
      if (!pegawai || data.password !== "password") {
        return Promise.reject(new Error("Email atau password salah"));
      }
      document.cookie = `token=mock.${btoa(JSON.stringify({ role: pegawai.role, id_pegawai: pegawai.id_pegawai }))}.sig; path=/`;
      return delay({
        role: pegawai.role,
        id_pegawai: pegawai.id_pegawai,
        nama: pegawai.nama,
      });
    }
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  logout: (): Promise<void> => {
    if (API_MODE === "mock") {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return delay(undefined);
    }
    return request("/auth/logout", { method: "POST" });
  },
};

export const jabatanApi = {
  getAll: (): Promise<Jabatan[]> =>
    API_MODE === "mock" ? delay(mockJabatan) : request("/jabatan"),
  getById: (id: number): Promise<Jabatan> =>
    API_MODE === "mock"
      ? delay(mockJabatan.find((j) => j.id_jabatan === id)!)
      : request(`/jabatan/${id}`),
  create: (data: CreateJabatanInput): Promise<Jabatan> =>
    API_MODE === "mock"
      ? delay({ id_jabatan: Date.now(), ...data })
      : request("/jabatan", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: UpdateJabatanInput): Promise<Jabatan> =>
    API_MODE === "mock"
      ? delay({ ...mockJabatan.find((j) => j.id_jabatan === id)!, ...data })
      : request(`/jabatan/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
  delete: (id: number): Promise<void> =>
    API_MODE === "mock"
      ? delay(undefined)
      : request(`/jabatan/${id}`, { method: "DELETE" }),
};

export const pegawaiApi = {
  getAll: (): Promise<Pegawai[]> =>
    API_MODE === "mock" ? delay(mockPegawai) : request("/pegawai"),
  getById: (id: number): Promise<PegawaiDetail> =>
    API_MODE === "mock"
      ? delay(mockPegawai.find((p) => p.id_pegawai === id) as PegawaiDetail)
      : request(`/pegawai/${id}`),
  create: (data: CreatePegawaiInput): Promise<Pegawai> =>
    API_MODE === "mock"
      ? delay({ id_pegawai: Date.now(), ...data })
      : request("/pegawai", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: UpdatePegawaiInput): Promise<Pegawai> =>
    API_MODE === "mock"
      ? delay({ ...mockPegawai.find((p) => p.id_pegawai === id)!, ...data })
      : request(`/pegawai/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
  delete: (id: number): Promise<void> =>
    API_MODE === "mock"
      ? delay(undefined)
      : request(`/pegawai/${id}`, { method: "DELETE" }),
  getGaji: (id: number, bulan: number, tahun: number) =>
    API_MODE === "mock"
      ? delay(computeMockGaji(id, bulan, tahun))
      : request(`/pegawai/${id}/gaji?bulan=${bulan}&tahun=${tahun}`),
};

export const presensiApi = {
  getAll: (): Promise<Presensi[]> =>
    API_MODE === "mock" ? delay(mockPresensi) : request("/presensi"),
  getById: (id: number): Promise<PresensiDetail> =>
    API_MODE === "mock"
      ? delay(mockPresensi.find((p) => p.id_presensi === id) as PresensiDetail)
      : request(`/presensi/${id}`),
  create: (data: CreatePresensiInput): Promise<Presensi> =>
    API_MODE === "mock"
      ? delay({ id_presensi: Date.now(), ...data })
      : request("/presensi", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: UpdatePresensiInput): Promise<Presensi> =>
    API_MODE === "mock"
      ? delay({ ...mockPresensi.find((p) => p.id_presensi === id)!, ...data })
      : request(`/presensi/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
  delete: (id: number): Promise<void> =>
    API_MODE === "mock"
      ? delay(undefined)
      : request(`/presensi/${id}`, { method: "DELETE" }),
};

export const dashboardApi = {
  getSummary: (bulan: number, tahun: number) =>
    API_MODE === "mock"
      ? delay(computeMockDashboardSummary(bulan, tahun))
      : request(`/dashboard/summary?bulan=${bulan}&tahun=${tahun}`),
};
