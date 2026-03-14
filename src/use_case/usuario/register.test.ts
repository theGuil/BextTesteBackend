import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import use_case_usuario_register from './register';
import { model_usuario } from '../../model/model_usuario';
import helpers from '../../helpers/helpers';

describe('TESTE_INTEGRACAO: use_case_usuario_register', () => {
    before(async () => {
        await helpers.db.start();
    });

    test('deve registrar um novo usuário e retornar dados reais do banco e tokens', async () => {


        const set_usuario = {
            name: 'Guilherme Souza',
            email: `teste_${Date.now()}@galio.com.br`,
            password: 'password123'
        }

        const result = await new use_case_usuario_register({
            data: {
                usuario: set_usuario
            }
        }).factory();

        assert.ok(result.data.usuario._id, 'O ID deve ter sido gerado pelo banco de dados');

        assert.ok(result.data.usuario._id, 'A senha deve existir no banco');

        assert.strictEqual(result.data.usuario.email, set_usuario.email);

        assert.strictEqual(result.data.usuario.name, set_usuario.name);

        assert.ok(result.data.usuario.token.length > 20, 'O token JWT deve ser uma string válida');

        assert.ok(result.data.usuario.refresh_token.length > 20, 'O refresh_token deve ser uma string válida');

        assert.ok(result.data.usuario.createdAt instanceof Date);

        await model_usuario.deletar_pelo_id({ id: result.data.usuario._id });

        const usuario_pos_deletar = await model_usuario.buscar_pelo_email({ email: set_usuario.email });

        assert.strictEqual(usuario_pos_deletar, null, 'O usuário deve ser nulo após a deleção');
    });

    test('deve lançar erro de validação ao enviar dados incompletos (Zod)', () => {
        const input_incompleto = {
            data: {
                usuario: {
                    name: 'G'
                }
            }
        };

        assert.throws(() => {
            new use_case_usuario_register(input_incompleto as any)
        });
    });
    after(async () => {
        await helpers.db.stop();
    });
});