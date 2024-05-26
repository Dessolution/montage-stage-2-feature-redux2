insert into user_info values ('5003', 'admin@admin.com', '$2a$10$CicEMndF88iC6UmEwfcAMedKPtHuM2cSwyRcwG6bYLAaW307.C4Qu') on conflict do nothing;
insert into user_roles values ('5003', '5003', '3') on conflict do nothing;

create table if not exists client_info (
      id                 bigserial
          constraint client_info_pk
              primary key,
      user_id             bigint,
      name                varchar,
      surname             varchar,
      email               varchar,
      messenger           varchar,
      channel       varchar,
      description      varchar
);