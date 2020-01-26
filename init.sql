CREATE TABLE "Expenses"
(
    id SERIAL PRIMARY KEY,
    value integer NOT NULL,
    reason text NOT NULL,
    "userId" integer NOT NULL,
    vat integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);