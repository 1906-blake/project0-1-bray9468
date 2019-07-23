import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlReimbursement } from '../util/reimbursement.converter';
import Reimbursement from '../models/Reimbursement';


export async function findAll() {
   // console.log('finding all users');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query(`SELECT * FROM reimbursement 
        LEFT JOIN status USING (status_id) 
        LEFT JOIN type USING (type_id)
        LEFT JOIN app_user ON author = user_id 
        LEFT JOIN role USING (role_id)
          ORDER BY re_id`
        );
        // convert result from sql object to js object
        return result.rows.map(convertSqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}


export async function findById(re_id: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            SELECT * FROM reimbursement
            LEFT JOIN status USING (status_id)
            LEFT JOIN type USING (type_id)
            LEFT JOIN app_user ON author = user_id AND resolver = user_id
            LEFT JOIN role USING (role_id)
                WHERE re_id = $1
        `;
        const result = await client.query(queryString, [re_id]);
        const sqlReimbursement = result.rows[0]; // there should really only be 1 row at best
        return sqlReimbursement && convertSqlReimbursement(sqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByStatusId(status_id:number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        // const queryString = `
        //     SELECT * FROM reimbursement
          
        //     INNER JOIN status USING (status_id)
        //     INNER JOIN type USING (type_id)
        //         WHERE status_id = $1
        // `;
        const result = await client.query( `
        SELECT * FROM reimbursement  
            INNER JOIN status USING (status_id)
            INNER JOIN type USING (type_id)
            INNER JOIN app_user ON author = user_id 
            INNER JOIN role USING (role_id)
                WHERE status_id = $1`, [status_id]);
        
        const sqlReimbursement = result.rows[0]; // there should really only be 1 row at best
        return sqlReimbursement && convertSqlReimbursement(sqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByAuthor(author: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        // it is bad to use interpolation here because it allows sql injection
        // const queryString = `
        //     SELECT * FROM app_user
        //         WHERE username = '${username}' AND pass = '${password}'
        // `;

        // instead there is a built in way of handling this to prevent sql injection
        const queryString = `
        SELECT * FROM reimbursement
        INNER JOIN status USING (status_id)
        INNER JOIN type USING (type_id)
        INNER JOIN app_user ON author = user_id 
        INNER JOIN role USING (role_id)
                WHERE author = $1
        `;
        const result = await client.query(queryString, [author]);
        const sqlReimbursement = result.rows[0]; // there should really only be 1 row at best
        return sqlReimbursement && convertSqlReimbursement(sqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}



export async function save(re: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO reimbursement (re_id,author,amount,date_submitted,date_resolved,description,resolver,status_id,type_id)
            VALUES 	($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING reimbursement    
                
        `;
        const params =  [re.re_id,re.author,re.amount,re.date_submitted,re.date_resolved,re.description,re.resolver,re.status.status_id,re.type.type_id];
        const result = await client.query(queryString, params);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}



export async function update(reimburesement: Reimbursement) {
    const oldreimbursement = await findById(reimburesement.re_id);
    if (!oldreimbursement) {
        return undefined;
    }
    reimburesement = {
        ...oldreimbursement,
        ...reimburesement
    };
    console.log(reimburesement);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE reimbursement SET author = $1, amount = $2, date_submitted = $3, date_resolved = $4, description = $5, resolver= $6, status_id = $7,type_id = $8
            WHERE re_id = $9
            RETURNING *
        `;
        let re = reimburesement
        const params = [ re.author, re.amount ,re.date_submitted,re.date_resolved, re.description,re.resolver,re.status.status_id,re.type.type_id,re.re_id ];
        const result = await client.query(queryString, params);
        const sqlReimbursement = result.rows[0];
        return convertSqlReimbursement(sqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}
