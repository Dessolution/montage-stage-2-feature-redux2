create table if not exists order_info (
        id                 bigserial
            constraint order_info_pk
                primary key,
        order_id                 varchar,
        user_id                  bigint,
        client_id                bigint,
        client_name              varchar,
        client_number            varchar,
        client_chat              varchar,
        video_link               varchar,
        task_link                varchar,
        video_format             varchar,
        camera_count             varchar,
        video_time               time,
        project_deadline         date,
        created_date             timestamp,
        worker_id                bigint,
        status                   varchar,
        color_correction         boolean,
        cutting_vertical_video   varchar,
        video_subtitles          boolean,
        video_teaser             boolean,
        budget                   varchar,
        payment_status           varchar

);