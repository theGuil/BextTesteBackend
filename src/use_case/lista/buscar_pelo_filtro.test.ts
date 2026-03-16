import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_lista_buscar_pelo_filtro from './buscar_pelo_filtro';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_lista_buscar_pelo_filtro', () => {
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test_lista_filtro@galio.com.br',
        name: 'Tester Filtro Lista'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve buscar listas filtrando pelo usuario_id da auth e retornar paginacao', async () => {
        const lista_um = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Lista de Compras"
        });

        const lista_dois = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Lista de Trabalho"
        });

        ids_listas_limpeza.push(lista_um._id.toString(), lista_dois._id.toString());

        const query = {
            nome: "Compras",
            pagina: 1
        };

        const instance = new use_case_lista_buscar_pelo_filtro(query as any, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.ok(Array.isArray(result.data.listas));
        assert.ok(result.data.paginacao);

        const todas_pertencem_ao_usuario = result.data.listas.every(
            l => l.usuario_id.toString() === usuario_auth_mock._id
        );
        assert.strictEqual(todas_pertencem_ao_usuario, true);

        const encontrou_nome_correto = result.data.listas.some(l => l.nome.includes("Compras"));
        assert.strictEqual(encontrou_nome_correto, true);
    });

    after(async () => {
        if (ids_listas_limpeza.length > 0) {
            await Promise.all(
                ids_listas_limpeza.map(id => model_lista.deletar_pelo_id({ _id: id }))
            );
        }

        await helpers.db.stop();
    });
});