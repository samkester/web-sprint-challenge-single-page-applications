import * as Yup from "yup";
import data from "./data";

const orderSchema = Yup.object().shape({
    name: Yup
    .string()
    .required(data.errors.NO_NAME)
    .min(2, data.errors.BAD_NAME),
    size: Yup
    .string()
    .oneOf(data.sizes, data.errors.BAD_SIZE),
});

export default orderSchema;