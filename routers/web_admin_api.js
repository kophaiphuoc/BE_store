var express = require("express");
var router = express.Router();

const upload = require("../utils/upload");

const customerController = require("../controllers/customers_controller");
const account_controllers = require("../controllers/account_controllers")
const accounts_models = require("../models/accounts_models");
const customerModel = require("../models/customers_model");

const orderController = require("../components/OrderController");
/* Web Admin. */
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.get("/logout", async function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
});
/* CUSTOMER LIST */
router.get("/customers", async function (req, res, next) {
  const name = req.query.name;
  if (name) {
    customerModel
      .find({ name: { $regex: new RegExp(name), $options: "i" } })
      .then((data) => {
        res.render("customers", { customers: data });
      });
  } else {
    const data = await customerController.getCustomers();
    const customers = data.map((c)=>{
      c={
        ...c,
        idU: c._id.toString().slice(-4)
      }
      return c
    })
    res.render("customers", { customers: customers });
  }
});
/* STORE LIST */
router.get("/stores", async function (req, res, next) {
  const nameStore = req.query.nameStore;
  if (nameStore) {
    accounts_models
      .find({ nameStore: { $regex: new RegExp(nameStore), $options: "i" } })
      .then((data) => {
        res.render("stores", { stores: data });
      });
  } else {
    const data = await account_controllers.getStores();
    const stores = data.map((c)=>{
      c={
        ...c,
        idU: c._id.toString().slice(-4)
      }
      return c
    })
    res.render("stores", { stores: stores });
  }
});
router.delete("/:id/deleteCustomer", async function (req, res, next) {
  const { id } = req.params;
  await customerController.delete(id);
  res.json({ result: true });
});

// router.get("/orders", orderController.indexweb);
// router.get("/orders/:id", orderController.oneweb);
// router.post("/orders/:id/status/ok", orderController.ok);
// router.post("/orders/:id/status/cancel", orderController.cancel);
// router.post("/orders/:id/status/pending", orderController.pending);

// thong ke
router.get("/", function (req, res, next) {
  res.render("home");
});
router.get("/orders/10days/get", orderController.get10DaysAnalysis);
router.get("/orders/all/get", orderController.getAll);
router.get("/orders/sold/get", orderController.getSold);
router.get("/orders/today/get", orderController.getToday);
router.get("/customers/get-all", async function (req, res, next) {
  await customerController
    .getAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.json(error));
});
router.get("/stores/get-all", async function (req, res, next) {
  await account_controllers
    .getStores()
    .then((stores) => {
      res.json(stores);
    })
    .catch((error) => res.json(error));
});
//get all for thong ke


//format
const numberWithComma = (x) => {
  try {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;
