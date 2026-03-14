import express, { Request, Response } from 'express';
import helpers from './helpers/helpers';
import path from 'path';
import { fileURLToPath } from 'url';
import package_json from "../package.json"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// DOC
import swagger_router from './documentation/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(swagger_router);

import router_usuario from './router/router_usuario';
import router_lista from './router/router_lista';
import router_tarefa from './router/router_tarefa';

app.use(router_usuario);
app.use(router_lista);
app.use(router_tarefa);

app.use('/docs/erd', express.static(path.join(__dirname, '../dist/erd')));


app.get('/api/test', (req: Request, res: Response) => {
    helpers.set_response.res.SUCCESS({ res, message: "Sucesso ao rodar api!", results: [] });
});

app.get('/', (req: Request, res: Response) => {
    helpers.set_response.res.SUCCESS({ res, message: `Version API: ${package_json.version}`, results: [] });
});

app.use((err: any, req: Request, res: Response, next: any) => {
    return helpers.set_response.res.SERVER_ERROR({ error: err, res });
});


helpers.db.start()

app.listen(PORT, () => {
    console.log(`Servidor online em: http://localhost:${PORT}`);
    console.log(`Documentação API em: http://localhost:${PORT}/docs/api`);
    console.log(`Documentação openapi.json em: http://localhost:${PORT}/docs/openapi.json`);
    console.log(`Documentação ERD em: http://localhost:${PORT}/docs/erd?showMode=ALL_FIELDS`);
});

