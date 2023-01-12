--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.message DROP CONSTRAINT IF EXISTS message_pkey;
DROP TABLE IF EXISTS public.message;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    "messageId" character(20) NOT NULL,
    message character varying(500) NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    "userId" character(20) NOT NULL,
    "withUserId" character(20) NOT NULL
);


ALTER TABLE public.message OWNER TO postgres;

--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message ("messageId", message, "timestamp", "userId", "withUserId") FROM stdin;
abcdefg123          	こんにちは	2022-12-22 12:20:30	hijklmn11           	abcdeffff           
\.


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY ("messageId");


--
-- PostgreSQL database dump complete
--
