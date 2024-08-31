CREATE TABLE types(
    id UUID primary key DEFAULT gen_random_uuid(),
    type varchar(4)
);

CREATE TABLE brands(
    id UUID primary key DEFAULT gen_random_uuid(),
    name varchar(15) not null
);

CREATE TABLE configurations(
    id UUID primary key DEFAULT gen_random_uuid(),
    conf varchar(7) not null
);

CREATE TABLE ram_modules(
    id UUID primary key DEFAULT gen_random_uuid(),
    price float not null,
    ecc boolean not null,
    cas_latency int not null,
    capacity int not null,
    speed int not null,
    model varchar(30) not null,
    type_id UUID references types (id) ON DELETE CASCADE NOT NULL,
    brand_id UUID references brands (id) ON DELETE CASCADE NOT NULL,
    configuration_id UUID references configurations (id) ON DELETE CASCADE NOT NULL
);
