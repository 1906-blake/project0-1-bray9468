export default class Role{
    role_id: number; // primary key
    role: string // not null, unique


  constructor(
    role_id: number, // primary key
    role: string // not null, unique
  )
  {
      this.role_id = role_id
      this.role = role
  }


}