import { Schema, model, InferSchemaType, Types } from 'mongoose';

const set_schema_lista = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'usuario', required: true, index: true },
    nome: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export type ListaSelect = InferSchemaType<typeof set_schema_lista> & { _id: Types.ObjectId };

export const schema_lista = model<ListaSelect>('lista', set_schema_lista);