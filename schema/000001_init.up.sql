CREATE TABLE feedback
(
    id         serial PRIMARY KEY,
    name       varchar(50) not null,
    lang       varchar(50) not null,
    text       varchar(60) not null,
    is_visible boolean     not null DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)