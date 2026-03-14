import { Schema, model, InferSchemaType } from 'mongoose';

const set_schema_tarefa = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    status: {
        type: String,
        enum: ["pendente", "em_andamento", "concluida"],
        default: "pendente",
        required: true
    },
    data_vencimento: { type: Date, required: true },
    lista_id: { type: Schema.Types.ObjectId, ref: 'lista', required: true },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'usuario', required: true, index: true },
    createdAt: { type: Date, default: Date.now }
});

export type TarefaSelect = Omit<InferSchemaType<typeof set_schema_tarefa>, 'usuario_id' | 'lista_id'> & {
    _id: string;
    usuario_id: string;
    lista_id: string;
    createdAt: Date;
};


export type TarefaBuscarPeloUsuarioId = Pick<TarefaSelect, "usuario_id">;

export type TarefaCriarPeloUsuarioId = Pick<
    TarefaSelect,
    "usuario_id" | "data_vencimento" | "descricao" | "lista_id" | "status" | "titulo"
>;

export type TarefaAtualizarPeloUsuarioId = Pick<TarefaSelect, '_id' | 'usuario_id'> &
    Partial<Omit<TarefaSelect, '_id' | 'usuario_id'>> & {};

export type TarefaDeletarPeloUsuarioId = Pick<TarefaSelect, "_id" | "usuario_id">;

export const schema_tarefa = model<TarefaSelect>('tarefa', set_schema_tarefa);