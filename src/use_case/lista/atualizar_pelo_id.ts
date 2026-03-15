import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_atualizar_pelo_id extends domain_lista {
    private lista: t.Entidades.Lista.AtualizarPeloId.Input['data']['lista'];

    constructor(props: t.Entidades.Lista.AtualizarPeloId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth)
        this.lista = t.Entidades.Lista.AtualizarPeloId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.AtualizarPeloId.Output> {

        /* Não precisa de regra de negócio pois como é uma aplicação simples e todas as chamadas no banco já é enviado o 
            usuario id e id da lista é impossivel um usuário atualizar a lista de outro
            os campos usuario_id e id vão no where do metodo  atualizar_pelo_id
          */

        const lista_atualizada = await model_lista.atualizar_pelo_id({
            usuario_id: this.USUARIO_AUTH._id,
            ...this.lista,
        });


        return {
            data: {
                lista: lista_atualizada
            }
        };
    }
}