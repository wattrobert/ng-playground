export class KeyTypeMap {
    matcher: string;
    type: string;
}

export const ocKeyTypeMap: KeyTypeMap[] = [
    {
        matcher:'Date',
        type:'date'
    },
    {
        matcher:'Phone',
        type:'phone'
    }
]