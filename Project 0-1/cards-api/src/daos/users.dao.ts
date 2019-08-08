import User from "../models/user";
import Role from "../models/Role";

let users: User[] = [
    // new User(1, 'btkruppa', 'password', 'blake.kruppa@revature.com', 'blake', 'kruppa', '90210'),
    // new User(2, 'bill', 'password', 'bill@revature.com', 'bill', 'bob', '90210'),
    // new User(3, 'larry', 'password', 'larry@revature.com', 'larry', 'the cableman', '90210'),
    new User(89,'username1','password1','Nicholas','Bray','nbray101@gmail.com',new Role(5,'finance-manager')),
    new User(565,'username2','password2','jane','doe','janedoe@gmail.com',new Role(8,'associate'))
];

export function findAll(): User[] {
    return users;
}

export function findFinanceManagers(role: Role): User {
    return users.filter(user => user.role.role === 'finance-manager')[0];
}

export function findByUsernameAndPassword(username: string, password: string): User {
    return users.filter(user => user.username === username && user.password === password)[0];
}
export function findById(id: number): User {
    return users.filter(user => user.user_id === id)[0];
}

export function findByFirstName(firstName: string): User[] {
    return users.filter(user => user.firstName === firstName);
}

export function save(user?: User) {
    const newId = Math.floor(Math.random() * 100000000);
    user.user_id = newId;
    users.push(user);
}



/**
 * {
 *  id: 1,
 * username: 'btkruppa'
 * password: 'password'
 * firstName: 'blake'
 * lastName: 'kruppa'
 * email: 'blake.kruppa@revature.com'
 * phone: '0903294'
 * }
 * 
 * {
 *  id: 1,
 *  phone: '9329304'
 * }
 * @param user 
 */
export function patch(user: Partial<User>) {
    users = users.map(ele => {
        if(user.user_id=== ele.user_id) {
            return {
                ...ele,
                ...user
            }
        } else {
            return ele
        }
    });
}


export function deleteUser(id: number) {
    users = users.filter(user => user.user_id !== id);
}