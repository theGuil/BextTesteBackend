import { Schema, model, InferSchemaType } from 'mongoose';

const set_schema_lista = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'usuario', required: true, index: true },
    nome: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export type ListaSelect = Omit<InferSchemaType<typeof set_schema_lista>, 'usuario_id'> & {
    _id: string;
    usuario_id: string;
    createdAt: Date;
};

export type ListaBuscarPeloFiltro = {
    itens: ListaSelect[];
    paginacao: {
        total_itens: number;
        total_paginas: number;
        itens_por_pagina: number;
        total_itens_pagina_atual: number;
        pagina_atual: number;
    };
}

export type ListaCriar = Pick<ListaSelect, "usuario_id" | "nome">;

export type ListaAtualizarPeloId = Pick<ListaSelect, "_id" | "usuario_id"> &
    Partial<Pick<ListaSelect, "nome">> & {};

export type ListaDeletarPeloId = Pick<ListaSelect, "_id" | "usuario_id">;

export const schema_lista = model<ListaSelect>('lista', set_schema_lista);