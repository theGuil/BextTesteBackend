import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_lista_buscar_pelo_id from './buscar_pelo_id';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_lista_buscar_pelo_id', () => {
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test_lista_id@galio.com.br',
        name: 'Tester Lista ID'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve buscar uma lista específica pelo ID com sucesso', async () => {
        const lista_criada = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Lista Específica"
        });
        ids_listas_limpeza.push(lista_criada._id.toString());

        const params = { id: lista_criada._id.toString() };

        const instance = new use_case_lista_buscar_pelo_id(params, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.ok(result.data.lista);
        assert.strictEqual(result.data.lista._id.toString(), lista_criada._id.toString());
        assert.strictEqual(result.data.lista.nome, "Lista Específica");
        assert.strictEqual(result.data.lista.usuario_id.toString(), usuario_auth_mock._id);
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