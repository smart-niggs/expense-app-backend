CREATE TABLE "Expenses"
(
    id SERIAL PRIMARY KEY,
    value numeric NOT NULL,
    reason text NOT NULL,
    "userId" integer NOT NULL,
    vat numeric NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);