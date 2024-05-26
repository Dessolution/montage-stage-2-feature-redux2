create table if not exists user_info (
        id                 bigserial
            constraint user_info_pk
                primary key,
        name                varchar,
        password            varchar
);
create table if not exists user_roles (
        id                 bigserial
            constraint user_role_pk
                primary key,
        user_id             bigint,
        role_id             bigint

);
create table if not exists roles_info (
        id                 bigserial
            constraint roles_info_pk
                primary key,
        name                varchar
);