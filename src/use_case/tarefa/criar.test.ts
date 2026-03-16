import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_tarefa_criar from './criar';
import model_tarefa from '../../model/model_tarefa';
import model_lista from '../../model/model_lista';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_tarefa_criar', () => {
    let ids_tarefas_limpeza: string[] = [];
    let ids_listas_limpeza: string[] = [];

    const usuario_auth_mock = {
        _id: '65f1c2e3d4e5f6a7b8c9d0e1',
        email: 'test@galio.com.br',
        name: 'Tester'
    };

    before(async () => {
        await helpers.db.start();
    });

    test('deve criar uma tarefa e deletar ao finalizar', async () => {
        const lista_previa = await model_lista.criar({
            usuario_id: usuario_auth_mock._id,
            nome: "Titulo lista"
        });
        ids_listas_limpeza.push(lista_previa._id.toString());

        const payload = {
            data: {
                tarefa: {
                    lista_id: lista_previa._id.toString(),
                    titulo: 'Tarefa Integração',
                    descricao: 'Desc',
                    status: 'pendente' as const,
                    data_vencimento: new Date()
                }
            }
        };

        const instance = new use_case_tarefa_criar(payload as any, usuario_auth_mock as any);
        const result = await instance.factory();

        assert.ok(result.data.tarefa._id);
        assert.strictEqual(result.data.tarefa.titulo, 'Tarefa Integração');

        ids_tarefas_limpeza.push(result.data.tarefa._id.toString());
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