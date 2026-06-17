--
-- PostgreSQL database dump
--

\restrict 48120lh2whYZCdKBtitWzppbTrngO16SWWmFdiqoJCMTe6h4f7U9KnpZruZUSag

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-17 10:58:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16540)
-- Name: jabatan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jabatan (
    id_jabatan integer NOT NULL,
    nama_jabatan character varying(100) NOT NULL,
    gaji_pokok numeric(12,2) NOT NULL
);


ALTER TABLE public.jabatan OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16539)
-- Name: jabatan_id_jabatan_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jabatan_id_jabatan_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jabatan_id_jabatan_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 219
-- Name: jabatan_id_jabatan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jabatan_id_jabatan_seq OWNED BY public.jabatan.id_jabatan;


--
-- TOC entry 222 (class 1259 OID 16550)
-- Name: pegawai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pegawai (
    id_pegawai integer NOT NULL,
    nama character varying(150) NOT NULL,
    gelar character varying(20) NOT NULL,
    id_jabatan integer NOT NULL,
    CONSTRAINT pegawai_gelar_check CHECK (((gelar)::text = ANY ((ARRAY['SMA'::character varying, 'D3'::character varying, 'S1'::character varying, 'S2'::character varying])::text[])))
);


ALTER TABLE public.pegawai OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16549)
-- Name: pegawai_id_pegawai_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.pegawai ALTER COLUMN id_pegawai ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pegawai_id_pegawai_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16567)
-- Name: presensi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.presensi (
    id_presensi integer NOT NULL,
    id_pegawai integer NOT NULL,
    tanggal date NOT NULL,
    status_hadir character varying(10) NOT NULL,
    jam_masuk time without time zone,
    jam_keluar time without time zone,
    jam_masuk_normal time without time zone DEFAULT '09:00:00'::time without time zone NOT NULL,
    jam_keluar_normal time without time zone DEFAULT '17:00:00'::time without time zone NOT NULL,
    terlambat_menit integer DEFAULT 0 NOT NULL,
    lembur_menit integer DEFAULT 0 NOT NULL,
    CONSTRAINT presensi_status_hadir_check CHECK (((status_hadir)::text = ANY ((ARRAY['hadir'::character varying, 'alpa'::character varying])::text[])))
);


ALTER TABLE public.presensi OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16566)
-- Name: presensi_id_presensi_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.presensi ALTER COLUMN id_presensi ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.presensi_id_presensi_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16593)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(10) NOT NULL,
    id_pegawai integer,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'user'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16592)
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4871 (class 2604 OID 16543)
-- Name: jabatan id_jabatan; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jabatan ALTER COLUMN id_jabatan SET DEFAULT nextval('public.jabatan_id_jabatan_seq'::regclass);


--
-- TOC entry 5042 (class 0 OID 16540)
-- Dependencies: 220
-- Data for Name: jabatan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jabatan (id_jabatan, nama_jabatan, gaji_pokok) FROM stdin;
1	Staff IT	3000000.00
2	Programmer	4000000.00
3	Senior Programmer	6000000.00
4	Manager IT	8000000.00
8	Staff IT	3000000.00
\.


--
-- TOC entry 5044 (class 0 OID 16550)
-- Dependencies: 222
-- Data for Name: pegawai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pegawai (id_pegawai, nama, gelar, id_jabatan) FROM stdin;
1	Andi Pratama	S1	2
2	Budi Hartono	D3	1
3	Clara Wijaya	S2	3
4	Dian Novita	S1	4
5	Taufik Hidayat	D3	1
\.


--
-- TOC entry 5046 (class 0 OID 16567)
-- Dependencies: 224
-- Data for Name: presensi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.presensi (id_presensi, id_pegawai, tanggal, status_hadir, jam_masuk, jam_keluar, jam_masuk_normal, jam_keluar_normal, terlambat_menit, lembur_menit) FROM stdin;
1	1	2025-01-02	hadir	09:05:00	17:30:00	09:00:00	17:00:00	5	30
2	1	2025-01-03	hadir	09:00:00	16:50:00	09:00:00	17:00:00	0	0
3	1	2025-01-04	hadir	09:20:00	18:00:00	09:00:00	17:00:00	20	60
4	1	2025-01-05	alpa	\N	\N	09:00:00	17:00:00	0	0
5	1	2025-01-06	hadir	08:50:00	17:15:00	09:00:00	17:00:00	0	15
6	2	2025-01-02	hadir	09:00:00	17:00:00	09:00:00	17:00:00	0	0
7	2	2025-01-03	hadir	09:10:00	17:05:00	09:00:00	17:00:00	10	5
8	2	2025-01-04	hadir	09:00:00	17:00:00	09:00:00	17:00:00	0	0
9	2	2025-01-05	hadir	09:30:00	17:10:00	09:00:00	17:00:00	30	10
10	2	2025-01-06	hadir	08:55:00	16:55:00	09:00:00	17:00:00	0	0
11	3	2025-01-02	hadir	09:00:00	19:00:00	09:00:00	17:00:00	0	120
12	3	2025-01-03	hadir	09:40:00	17:20:00	09:00:00	17:00:00	40	20
13	3	2025-01-04	alpa	\N	\N	09:00:00	17:00:00	0	0
14	3	2025-01-05	hadir	08:55:00	17:10:00	09:00:00	17:00:00	0	10
15	4	2025-01-02	hadir	08:45:00	17:30:00	09:00:00	17:00:00	0	30
16	4	2025-01-03	hadir	08:50:00	17:00:00	09:00:00	17:00:00	0	0
17	4	2025-01-04	hadir	08:40:00	18:00:00	09:00:00	17:00:00	0	60
18	4	2025-01-05	hadir	08:55:00	16:50:00	09:00:00	17:00:00	0	0
19	5	2025-01-02	hadir	09:30:00	17:05:00	09:00:00	17:00:00	30	5
20	5	2025-01-03	hadir	10:00:00	17:00:00	09:00:00	17:00:00	60	0
21	5	2025-01-04	hadir	09:50:00	18:00:00	09:00:00	17:00:00	50	60
22	5	2025-01-05	alpa	\N	\N	09:00:00	17:00:00	0	0
23	5	2025-01-06	hadir	09:45:00	17:10:00	09:00:00	17:00:00	45	10
\.


--
-- TOC entry 5048 (class 0 OID 16593)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, username, password, role, id_pegawai) FROM stdin;
1	admin	admin123	admin	\N
2	andi	andi123	user	1
3	budi	budi123	user	2
4	clara	clara123	user	3
5	dian	dian123	user	4
6	taufik	taufik123	user	5
\.


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 219
-- Name: jabatan_id_jabatan_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jabatan_id_jabatan_seq', 8, true);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 221
-- Name: pegawai_id_pegawai_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pegawai_id_pegawai_seq', 5, true);


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 223
-- Name: presensi_id_presensi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.presensi_id_presensi_seq', 23, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 6, true);


--
-- TOC entry 4880 (class 2606 OID 16548)
-- Name: jabatan jabatan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jabatan
    ADD CONSTRAINT jabatan_pkey PRIMARY KEY (id_jabatan);


--
-- TOC entry 4882 (class 2606 OID 16559)
-- Name: pegawai pegawai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT pegawai_pkey PRIMARY KEY (id_pegawai);


--
-- TOC entry 4884 (class 2606 OID 16584)
-- Name: presensi presensi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT presensi_pkey PRIMARY KEY (id_presensi);


--
-- TOC entry 4886 (class 2606 OID 16586)
-- Name: presensi uq_presensi_pegawai_tanggal; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT uq_presensi_pegawai_tanggal UNIQUE (id_pegawai, tanggal);


--
-- TOC entry 4888 (class 2606 OID 16602)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4890 (class 2606 OID 16604)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4891 (class 2606 OID 16560)
-- Name: pegawai fk_pegawai_jabatan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT fk_pegawai_jabatan FOREIGN KEY (id_jabatan) REFERENCES public.jabatan(id_jabatan) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4892 (class 2606 OID 16587)
-- Name: presensi fk_presensi_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.presensi
    ADD CONSTRAINT fk_presensi_pegawai FOREIGN KEY (id_pegawai) REFERENCES public.pegawai(id_pegawai) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4893 (class 2606 OID 16605)
-- Name: users users_id_pegawai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_pegawai_fkey FOREIGN KEY (id_pegawai) REFERENCES public.pegawai(id_pegawai);


-- Completed on 2026-06-17 10:58:40

--
-- PostgreSQL database dump complete
--

\unrestrict 48120lh2whYZCdKBtitWzppbTrngO16SWWmFdiqoJCMTe6h4f7U9KnpZruZUSag

