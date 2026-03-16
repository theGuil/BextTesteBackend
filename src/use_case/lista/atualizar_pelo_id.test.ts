import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_lista_atualizar_pelo_id from './atualizar_pelo_id';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_lista_atualizar_pelo_id', () => {
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test_lista_update@galio.com.br',
        name: 'Tester Lista'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve atualizar o nome de uma lista com sucesso', async () => {
        const lista_criada = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Nome Original"
        });
        ids_listas_limpeza.push(lista_criada._id.toString());

        const params = { id: lista_criada._id.toString() };
        const payload = {
            data: {
                lista: {
                    nome: "Nome Alterado"
                }
            }
        };

        const instance = new use_case_lista_atualizar_pelo_id(payload as any, params, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.ok(result.data.lista._id);
        assert.strictEqual(result.data.lista.nome, "Nome Alterado");
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