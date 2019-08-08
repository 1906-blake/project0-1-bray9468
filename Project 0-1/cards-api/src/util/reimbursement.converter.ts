import Reimbursement from '../models/Reimbursement';
import Status from '../models/Status';
import Type from '../models/Type';


export function convertSqlReimbursement(row: any) {
    return new Reimbursement(row.re_id, row.author, row.amount, row.date_submitted, row.date_resolved, row.description, row.resolver,
         new Status(row.status_id, row.status), 
         new Type(row.type_id, row.type));
         
}

