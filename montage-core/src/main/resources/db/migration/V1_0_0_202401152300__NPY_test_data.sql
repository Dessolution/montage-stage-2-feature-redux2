insert into user_info values ('5001', 'go@go.ru', '$2a$10$CicEMndF88iC6UmEwfcAMedKPtHuM2cSwyRcwG6bYLAaW307.C4Qu') on conflict do nothing;
insert into user_roles values ('5001', '5001', '2') on conflict do nothing;

create table if not exists worker_info (
    id                 bigserial
        constraint worker_info_pk
            primary key,
    user_id             bigint,
    name                varchar,
    surname             varchar,
    email               varchar,
    portfolio           varchar,
    messenger           varchar,
    language_user       varchar,
    approved            boolean default false,
    payment_method      varchar
);