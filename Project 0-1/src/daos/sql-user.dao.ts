import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/user.converter';
import User from '../models/user';



export async function findAll() {
    console.log('finding all users');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT * FROM app_user INNER JOIN role USING (role_id) ORDER BY user_id');
        // convert result from sql object to js object
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findById(id: number) {
    console.log('finding user by id: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT * FROM app_user INNER JOIN role USING (role_id) WHERE user_id = $1', [id]);
        const sqlUser = result.rows[0];
        return sqlUser && convertSqlUser(sqlUser);
        
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}


export async function findByFirstName(firstName: string) {
    console.log('finding users by first name');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT * FROM app_user WHERE first_name = $1', [firstName]);
        
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}



export async function findByUsernameAndPassword(username: string, password: string) {
  
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        // it is bad to use interpolation here because it allows sql injection
        // const queryString = `
        //     SELECT * FROM app_user
        //         WHERE username = '${username}' AND pass = '${password}'
        // `;

        // instead there is a built in way of handling this to prevent sql injection
        const queryString =
        `
            SELECT * FROM app_user INNER JOIN role USING (role_id)
                WHERE username = $1 AND password = $2
        `;
        const result = await client.query(queryString, [username, password]);
        const sqlUser = result.rows[0]; // there should really only be 1 row at best
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}
export async function update(user: User) {
    const oldUser = await findById(user.user_id);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...user
    };
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE app_user SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5, role_id = $6
            WHERE user_id = $7
            RETURNING *
        `;
        const params = [ user.username, user.password, user.firstName, user.lastName, user.email, user.role.role_id, user.user_id];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function save(user: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO app_user (username, pass, first_name, last_name, phone, email, role_id)
            VALUES 	($1, $2, $3, $4, $5, $6, $7)
            RETURNING user_id
        `;
        const params = [user.user_id, user.username, user.password, user.firstName, user.lastName, user.email, user.role.role_id];
        const result = await client.query(queryString, params);
        return result.rows[0].user_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

