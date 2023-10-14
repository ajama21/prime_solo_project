const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `SELECT "public.driver"."name", "public.driver_truck"."truck_number", "public.driver"."id" FROM "public.driver" 
  JOIN "public.driver_truck" ON "public.driver_truck"."driver_id" = "public.driver"."id"
  WHERE "dispatcher_id" = $1;`;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all driver details failed", err);
      res.sendStatus(500);
    });
});

router.get("/details/:id", (req, res) => {
  const query = `SELECT "public.driver".name, "public.truck".truck_number, "public.driver".application_link, "public.driver".company_policy_link, "public.driver".drug_alcohol_link, "public.driver".license_link, "public.driver".dot_link, "public.driver"."image_link" FROM "public.driver" 
  JOIN "public.driver_truck" ON "public.driver".id = "public.driver_truck".driver_id
  JOIN "public.truck" ON "public.truck".truck_number = "public.driver_truck".truck_number
  WHERE "public.driver".id = $1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all the details of a driver failed", err);
      res.sendStatus(500);
    });
});

router.post("/onboard", (req, res, next) => {
  if (
    !req.body.application_link ||
    !req.body.license_link ||
    !req.body.dot_link ||
    !req.body.company_policy_link ||
    !req.body.drug_alcohol_link ||
    !req.body.name
  ) {
    return res.status(400).send("Please provide all the required fields");
  }
  const queryText = `INSERT INTO "public.driver" (application_link, license_link, dot_link, company_policy_link, drug_alcohol_link, dispatcher_id, name, image_link)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

  pool
    .query(queryText, [
      req.body.application_link,
      req.body.license_link,
      req.body.dot_link,
      req.body.company_policy_link,
      req.body.drug_alcohol_link,
      req.user.id,
      req.body.name,
      "https://www.enverus.com/wp-content/uploads/2023/01/default-user-avatar.png"
    ])
    .then((response) => {
      console.log("Driver created: ", response.rows[0]);
      const driver_id = response.rows[0].id;
      const queryTextAssignTruck = `INSERT INTO "public.driver_truck" (driver_id, truck_number)
        VALUES ($1, $2) RETURNING id`;
      pool
        .query(queryTextAssignTruck, [driver_id, req.body.truck_number])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log("ERROR: Assigning truck to driver failed", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("Driver onboarding failed: ", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const query = `UPDATE "public.driver"
    SET "application_link"=$1, "license_link"=$2, "dot_link"=$3, "company_policy_link"=$4, "drug_alcohol_link"=$5, "name"=$6
    WHERE "id"=$7; `;
  pool
    .query(query, [
      req.body.application_link,
      req.body.license_link,
      req.body.dot_link,
      req.body.company_policy_link,
      req.body.drug_alcohol_link,
      req.body.name,
      req.params.id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Update driver details failed", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const query = `DELETE FROM "public.driver" WHERE "id" = $1`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Delete Driver failed", err);
      res.sendStatus(500);
    });
});

module.exports = router;
