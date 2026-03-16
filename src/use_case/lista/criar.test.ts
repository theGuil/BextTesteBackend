import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_lista_criar from './criar';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_lista_criar', () => {
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test_lista_criar@galio.com.br',
        name: 'Tester Criar Lista'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve criar uma nova lista com sucesso e persistir no banco', async () => {
        const payload = {
            data: {
                lista: {
                    nome: "Minha Nova Lista de Teste"
                }
            }
        };

        const instance = new use_case_lista_criar(payload as any, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.ok(result.data.lista._id);
        assert.strictEqual(result.data.lista.nome, "Minha Nova Lista de Teste");
        assert.strictEqual(result.data.lista.usuario_id.toString(), usuario_auth_mock._id);

        ids_listas_limpeza.push(result.data.lista._id.toString());
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