import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_tarefa_atualizar_pelo_id from './atualizar_pelo_id';
import model_tarefa from '../../model/model_tarefa';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_tarefa_atualizar_pelo_id', () => {
    let ids_tarefas_limpeza: string[] = [];
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test_update@galio.com.br',
        name: 'Tester Update'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve atualizar uma tarefa existente com sucesso', async () => {
        const lista_previa = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Lista para Update"
        });
        ids_listas_limpeza.push(lista_previa._id.toString());

        const tarefa_criada = await model_tarefa.criar({
            usuario_id: usuario_auth_mock._id,
            lista_id: lista_previa._id.toString(),
            titulo: 'Titulo Antigo',
            descricao: 'Desc Antiga',
            status: 'pendente',
            data_vencimento: new Date()
        });
        ids_tarefas_limpeza.push(tarefa_criada._id.toString());

        const params = { id: tarefa_criada._id.toString() };
        const payload = {
            data: {
                tarefa: {
                    titulo: 'Titulo Atualizado',
                    descricao: 'Desc Atualizada',
                    status: 'em_andamento' as const,
                    data_vencimento: new Date()
                }
            }
        };

        const instance = new use_case_tarefa_atualizar_pelo_id(payload as any, params, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.strictEqual(result.data.tarefa._id.toString(), tarefa_criada._id.toString());
        assert.strictEqual(result.data.tarefa.titulo, 'Titulo Atualizado');
        assert.strictEqual(result.data.tarefa.status, 'em_andamento');
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