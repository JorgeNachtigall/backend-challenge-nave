DROP TABLE IF EXISTS "public"."admin";

CREATE TABLE "public"."admin" (
    "usuario" varchar(15) NOT NULL,
    "nome" varchar NOT NULL,
    "senha" varchar(10) NOT NULL,
    PRIMARY KEY ("usuario")
);

DROP TABLE IF EXISTS "public"."candidato";

CREATE TABLE "public"."candidato" (
    "cpf" varchar(11) NOT NULL DEFAULT ''::character varying,
    "nome" varchar(50) NOT NULL,
    "email" varchar(50) NOT NULL,
    "telefone" varchar(15) NOT NULL,
    PRIMARY KEY ("cpf")
);

DROP TABLE IF EXISTS "public"."comentarios";

CREATE SEQUENCE IF NOT EXISTS comentarios_id_seq;

CREATE TABLE "public"."comentarios" (
    "admin_usuario" varchar(15) NOT NULL,
    "comentario" varchar(255) NOT NULL,
    "id_candidatura" int4 NOT NULL,
    "id" int4 NOT NULL DEFAULT nextval('comentarios_id_seq'::regclass),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."vagas";

CREATE TABLE "public"."vagas" (
    "nome" varchar(20) NOT NULL,
    "quantidade" int4 NOT NULL,
    "codigo_vaga" varchar(5) NOT NULL,
    PRIMARY KEY ("codigo_vaga")
);

DROP TABLE IF EXISTS "public"."vagascandidato";

CREATE SEQUENCE IF NOT EXISTS "vagascandidato_idCandidatura_seq";

CREATE TABLE "public"."vagascandidato" (
    "cpf_candidato" varchar(255) NOT NULL,
    "codigo_vaga" varchar(255) NOT NULL,
    "id_candidatura" int4 NOT NULL UNIQUE DEFAULT nextval('"vagascandidato_idCandidatura_seq"'::regclass),
    PRIMARY KEY ("cpf_candidato","codigo_vaga")
);

INSERT INTO "public"."admin" ("usuario", "nome", "senha") VALUES ('jorge', 'jorge nachtigall', 'admin');

INSERT INTO "public"."candidato" ("cpf", "nome", "email", "telefone") VALUES ('01234567899', 'Nave Team', 'nave@nave.rs', '9335877213665');

INSERT INTO "public"."comentarios" ("admin_usuario", "comentario", "id_candidatura", "id") VALUES ('jorge', '"Comentário teste!"', '1', '1');

INSERT INTO "public"."vagas" ("nome", "quantidade", "codigo_vaga") VALUES ('back-end', '5', '123'),
('front-end', '1', '456'),
('data scientist', '1', '7845'),
('data scientist', '1', '789');

INSERT INTO "public"."vagascandidato" ("cpf_candidato", "codigo_vaga", "id_candidatura") VALUES ('01234567899', '123', '1'),
('01234567899', '7845', '7');

ALTER TABLE "public"."candidato"
  ADD CONSTRAINT check_min_length_cpf CHECK (LENGTH("cpf") >= 1);

ALTER TABLE "public"."admin"
  ADD CONSTRAINT check_min_length_usuario CHECK (LENGTH("usuario") >= 1);

ALTER TABLE "public"."admin"
  ADD CONSTRAINT check_min_length_senha CHECK (LENGTH("senha") >= 1);

ALTER TABLE "public"."vagas"
  ADD CONSTRAINT check_min_length_vaga CHECK (LENGTH("codigo_vaga") >= 1);

ALTER TABLE "public"."comentarios" ADD FOREIGN KEY ("admin_usuario") REFERENCES "public"."admin"("usuario");
ALTER TABLE "public"."comentarios" ADD FOREIGN KEY ("id_candidatura") REFERENCES "public"."vagascandidato"("id_candidatura");
ALTER TABLE "public"."vagascandidato" ADD FOREIGN KEY ("cpf_candidato") REFERENCES "public"."candidato"("cpf");
ALTER TABLE "public"."vagascandidato" ADD FOREIGN KEY ("codigo_vaga") REFERENCES "public"."vagas"("codigo_vaga");
