CREATE TABLE "public.driver" (
	"id" serial NOT NULL,
	"application_link" varchar NOT NULL,
	"license_link" varchar NOT NULL,
	"dot_link" varchar NOT NULL,
	"company_policy_link" varchar NOT NULL,
	"drug_alcohol_link" integer NOT NULL,
	CONSTRAINT "driver_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.truck" (
	"id" serial NOT NULL,
	"make" varchar NOT NULL,
	"year" integer NOT NULL,
	"model" varchar NOT NULL,
	"image_link" varchar NOT NULL,
	CONSTRAINT "truck_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.driver_truck" (
	"id" serial NOT NULL,
	"driver_id" integer NOT NULL,
	"truck_id" integer NOT NULL,
	CONSTRAINT "driver_truck_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.dispatcher" (
	"id" serial NOT NULL,
	"company_name" varchar NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	CONSTRAINT "dispatcher_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "driver_truck" ADD CONSTRAINT "driver_truck_fk0" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id");
ALTER TABLE "driver_truck" ADD CONSTRAINT "driver_truck_fk1" FOREIGN KEY ("truck_id") REFERENCES "Trucks"("id");






