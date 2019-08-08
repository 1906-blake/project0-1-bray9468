import Role from "./Role";

export default class User  {
    user_id: number // primary key
    username: string // not null, unique
    password: string // not null
    firstName: string // not null
    lastName: string // not null
    email: string // not null
    role: Role // not null
  
  
    constructor(
    user_id: number, // primary key
    username: string, // not null, unique
    password: string, // not null
    firstName: string, // not null
    lastName: string, // not null
    email: string, // not null
    role: Role // not null
    )
    
    { 
    this.user_id = user_id
    this.username = username
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.role = role
}  
  }