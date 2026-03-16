import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_tarefa_buscar_pelo_filtro from './buscar_pelo_filtro';
import model_tarefa from '../../model/model_tarefa';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_tarefa_buscar_pelo_filtro', () => {
    let ids_tarefas_limpeza: string[] = [];
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test_filter@galio.com.br',
        name: 'Tester Filter'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve buscar tarefas filtrando pelo usuario_id da auth', async () => {
        const lista_previa = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Lista para Filtro"
        });
        ids_listas_limpeza.push(lista_previa._id.toString());

        const tarefa_um = await model_tarefa.criar({
            usuario_id: usuario_auth_mock._id,
            lista_id: lista_previa._id.toString(),
            titulo: 'Tarefa Um',
            descricao: 'Desc',
            status: 'pendente',
            data_vencimento: new Date()
        });

        const tarefa_dois = await model_tarefa.criar({
            usuario_id: usuario_auth_mock._id,
            lista_id: lista_previa._id.toString(),
            titulo: 'Tarefa Dois',
            descricao: 'Desc',
            status: 'concluida',
            data_vencimento: new Date()
        });

        ids_tarefas_limpeza.push(tarefa_um._id.toString(), tarefa_dois._id.toString());

        const query = {
            status: 'pendente'
        };

        const instance = new use_case_tarefa_buscar_pelo_filtro(query as any, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.ok(Array.isArray(result.data.tarefas));
        assert.ok(result.data.paginacao);

        const todas_do_usuario = result.data.tarefas.every(t => t.usuario_id.toString() === usuario_auth_mock._id);
        assert.strictEqual(todas_do_usuario, true);
    });

    after(async () => {
        if (ids_tarefas_limpeza.length > 0) {
            await Promise.all(
                ids_tarefas_limpeza.map(id => model_tarefa.deletar_pelo_id({ _id: id }))
            );
        }

        if (ids_listas_limpeza.length > 0) {
            await Promise.all(
                ids_listas_limpeza.map(id => model_lista.deletar_pelo_id({ _id: id }))
            );
        }

        await helpers.db.stop();
    });
});