import Status from "./Status";

import Type from "./Type";


export default class reimbursement{
        re_id: number;// primary key
        author: number;  // foreign key -> User, not null
        amount: number;  // not null
        date_submitted: number; // not null
        date_resolved: number;
        description: string; // not null
        resolver: number; // foreign key -> User
        status: Status; // foreign ey -> ReimbursementStatus, not null
        type: Type // foreign key -> ReimbursementType
   
     constructor( 
        re_id: number,// primary key
        author: number,  // foreign key -> User, not null
        amount: number,  // not null
        dateSubmitted: number, // not null
        dateResolved: number,
        description: string, // not null
        resolver: number, // foreign key -> User
        status: Status, // foreign ey -> ReimbursementStatus, not null
        type: Type // foreign key -> ReimbursementType
   
    )
    {
        this.re_id = re_id,
        this.author = author,
        this.amount = amount,
        this.date_submitted = dateSubmitted,
        this.date_resolved = dateResolved,
        this.description = description,
        this.resolver = resolver,
        this.status = status,
        this.type = type
    }
  }
