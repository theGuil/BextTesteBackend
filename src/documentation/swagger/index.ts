import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import swaggerUi from "swagger-ui-express";
import { Router, Request, Response } from "express";
import package_json from "../../../package.json"

import { registerUsuarioRoutes } from "./_open_api_usuario";

const swagger_router = Router();
const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "BearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
});


registerUsuarioRoutes(registry);


const getDefinition = () => {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: package_json.name,
            description: "API responsável pelo login e registro de usuários.",
            version: package_json.version,
        },
        servers: [
            { url: "http://localhost:3000", description: "LOCALHOST" },
        ],
        security: [{ BearerAuth: [] }]
    });
};

swagger_router.get("/openapi.json", (req: Request, res: Response) => {
    res.json(getDefinition());
});


swagger_router.use("/docs", swaggerUi.serve);
swagger_router.get("/docs", (req: Request, res: Response) => {
    res.send(swaggerUi.generateHTML(getDefinition()));
});

export default swagger_router;