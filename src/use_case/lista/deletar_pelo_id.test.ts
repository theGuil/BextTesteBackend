import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_lista_deletar_pelo_id from './deletar_pelo_id';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_lista_deletar_pelo_id', () => {
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test_lista_delete@galio.com.br',
        name: 'Tester Lista Delete'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve deletar uma lista existente com sucesso', async () => {
        const lista_para_deletar = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Lista para Morrer"
        });

        const params = { id: lista_para_deletar._id.toString() };

        const instance = new use_case_lista_deletar_pelo_id(params, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.strictEqual(result.message, "Lista removida com sucesso!");

        const busca_pos_delete = await model_lista.buscar_pelo_id({ _id: params.id });
        assert.ok(!busca_pos_delete);
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