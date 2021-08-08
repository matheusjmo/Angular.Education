export interface Card {
    id: number;
    titulo: string;
    disciplina: string;
    nivel: number;
    modulo: string;
    tema: string;
    tipo: string[];
    texto: string;
    url: string;
    tags: string[];
    origem: string;
    fonte: string;
    relevância: number;
    miniatura: any;
}