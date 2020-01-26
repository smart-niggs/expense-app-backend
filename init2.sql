CREATE TABLE "Users"
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
)