import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_usuario_register from './register';
import use_case_usuario_login from './login';
import model_usuario from '../../model/model_usuario';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_usuario_login', () => {
    let ids_para_limpeza: string[] = [];

    before(async () => {
        await helpers.db.start();
    });

    test('deve realizar login com sucesso após registrar um usuário', async () => {
        const email_unico = `login_test_${Date.now()}@galio.com.br`;
        const senha_pura = 'Apassword123@1';

        const registro = await new use_case_usuario_register({
            data: {
                usuario: {
                    name: 'Guilherme Souza',
                    email: email_unico,
                    password: senha_pura
                }
            }
        }).factory();

        ids_para_limpeza.push(registro.data.usuario._id);

        const result_login = await new use_case_usuario_login({
            data: {
                usuario: {
                    email: email_unico,
                    password: senha_pura
                }
            }
        }).factory();

        assert.strictEqual((result_login.data.usuario as any).password, undefined, 'O campo password não deve ser retornado no output do login');

        assert.strictEqual(result_login.data.usuario.email, email_unico);

        assert.ok(result_login.data.usuario.token.length > 20);

        assert.strictEqual(result_login.data.usuario._id.toString(), registro.data.usuario._id.toString());
    });

    after(async () => {
        if (ids_para_limpeza.length > 0) {
            await Promise.all(
                ids_para_limpeza.map(id => model_usuario.deletar_pelo_id({ id }))
            );
        }
        await helpers.db.stop();
    });
});