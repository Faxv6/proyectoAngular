export interface UserT {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
}

export type NewUser = Omit<UserT,"id">