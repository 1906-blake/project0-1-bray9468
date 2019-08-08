
export default class Type{
    type_id: number; // primary key
    type: string // not null, unique

 constructor(
    type_id: number, // primary key
    type: string, // not null, unique
    )
    {
        this.type_id = type_id,
        this.type = type
    }
}



