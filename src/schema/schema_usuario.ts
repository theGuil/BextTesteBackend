import { Schema, model, InferSchemaType } from 'mongoose';

const set_schema_usuario = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export type UsuarioSelect = InferSchemaType<typeof set_schema_usuario> & { _id: string };

export const schema_usuario = model<UsuarioSelect>('usuario', set_schema_usuario);