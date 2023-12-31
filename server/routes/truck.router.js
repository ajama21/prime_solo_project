const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `SELECT * 
  FROM "public.truck"
  WHERE "dispatcher_id" = $1;`;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all truck details failed", err);
      res.sendStatus(500);
    });
});

router.get("/unassigned", rejectUnauthenticated, (req, res) => {
  const query = `SELECT *
  FROM "public.truck"
  LEFT JOIN "public.driver_truck" ON "public.truck"."truck_number" = "public.driver_truck"."truck_number"
  WHERE "public.driver_truck"."truck_number" IS NULL;
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all truck details failed", err);
      res.sendStatus(500);
    });
});

router.get("/details/:id", (req, res) => {
  const query = `SELECT 
  "public.truck"."make", 
  "public.truck"."year", 
  "public.truck"."model", 
  "public.truck"."truck_image_link", 
  "public.driver"."name", 
  "public.truck"."id" AS "truck_id", 
  "public.truck"."truck_number"
FROM 
  "public.truck" 
LEFT JOIN 
  "public.driver_truck" 
  ON "public.truck"."truck_number" = "public.driver_truck"."truck_number"
LEFT JOIN 
  "public.driver" 
  ON "public.driver_truck"."driver_id" = "public.driver"."id"
WHERE 
  "public.truck"."id" = $1;
`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all the details of a truck failed", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res, next) => {
  if (
    !req.body.make ||
    !req.body.year ||
    !req.body.model ||
    !req.body.truck_number
  ) {
    return res.status(400).send("Please provide all the required fields");
  }
  const queryText = `INSERT INTO "public.truck" ("make", "year", "model", "truck_image_link", "truck_number", "dispatcher_id")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

  pool
    .query(queryText, [
      req.body.make,
      req.body.year,
      req.body.model,
      req.body.truck_image_link,
      req.body.truck_number,
      req.user.id,
    ])
    .then((response) => {
      console.log("truck selected success: ", response.rows[0]);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("truck added failed: ", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const query = `UPDATE "public.truck"
    SET "make"=$1, "year"=$2, "model"=$3, "truck_image_link"=$4, "truck_number"=$5
    WHERE "id"=$6; `;
  pool
    .query(query, [
      req.body.make,
      req.body.year,
      req.body.model,
      req.body.truck_image_link,
      req.body.truck_number,
      req.params.id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Update truck details failed", err);
      res.sendStatus(500);
    });
});

router.delete("/:truck_number", rejectUnauthenticated, (req, res) => {
  const query = `DELETE FROM "public.truck" WHERE "truck_number" = $1`;
  pool
    .query(query, [req.params.truck_number])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all truck details failed", err);
      res.sendStatus(500);
    });
});

module.exports = router;
