import { Router } from "express";
import { ExampleGet } from "../controllers/example_controller";
const r = Router();

// routing
r.get("/", ExampleGet);

export default r;
