const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

// inventoryController.js
exports.getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await inventoryModel.getVehicleById(req.params.id);
    const htmlContent = utilities.wrapVehicleInHtml(vehicle);
    res.render('inventory/vehicleDetail', { content: htmlContent });
  } catch (error) {
    next(error);
  }
};


module.exports = invCont