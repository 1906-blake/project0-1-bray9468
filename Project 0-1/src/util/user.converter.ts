import User from '../models/user';
import Role from '../models/Role';


export function convertSqlUser(row: any) {
    return new User(row.user_id, row.username, row.password, row.first_name, row.last_name, row.email, new Role(row.role_id,row.role));
}