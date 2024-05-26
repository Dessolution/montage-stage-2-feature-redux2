insert into roles_info values ('1', 'ROLE_USER') on conflict do nothing;
insert into roles_info values ('2', 'ROLE_WORKER') on conflict do nothing;
insert into roles_info values ('3', 'ROLE_ADMIN') on conflict do nothing;
insert into user_info values ('5000', 'schaf.run@gmail.com', '$2a$10$CicEMndF88iC6UmEwfcAMedKPtHuM2cSwyRcwG6bYLAaW307.C4Qu') on conflict do nothing;
insert into user_roles values ('5000', '5000', '1') on conflict do nothing;