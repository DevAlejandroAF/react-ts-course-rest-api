import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/products";
import { handleInputErrors } from "./middleware";

const router = Router();

//Routing
router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido!"),
  handleInputErrors,
  getProductById,
);

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no debe ir vacio!"),
  body("price")
    .isNumeric()
    .withMessage("El campo Precio debe ser un número!")
    .notEmpty()
    .withMessage("El Precio no debe ir vacio!")
    .custom((value) => value > 0)
    .withMessage("El Precio no puede ser un valor negativo!"),
  handleInputErrors,
  createProduct,
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido!"),
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no debe ir vacio!"),
  body("price")
    .isNumeric()
    .withMessage("El campo Precio debe ser un número!")
    .notEmpty()
    .withMessage("El Precio no debe ir vacio!")
    .custom((value) => value > 0)
    .withMessage("El Precio no puede ser un valor negativo!"),
  body("availability")
    .isBoolean()
    .withMessage("La Disponibilidad debe ser un buleano"),
  handleInputErrors,
  updateProduct,
);
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido!"),
  body("availability")
    .isBoolean()
    .withMessage("La Disponibilidad debe ser un buleano"),
  handleInputErrors,
  updateAvailability,
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido!"),
  handleInputErrors,
  deleteProduct,
);

export default router;
