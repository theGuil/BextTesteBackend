import { Schema, model, InferSchemaType, Types } from 'mongoose';

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

export type TarefaSelect = InferSchemaType<typeof set_schema_tarefa> & { _id: Types.ObjectId };

export const schema_tarefa = model<TarefaSelect>('tarefa', set_schema_tarefa);