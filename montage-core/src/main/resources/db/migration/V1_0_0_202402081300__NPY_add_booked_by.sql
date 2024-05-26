create table if not exists order_booked_by (
    id      bigserial primary key,
    order_id        bigint references order_info(id),
    worker_id       bigint
);