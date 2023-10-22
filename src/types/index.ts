export type LoginPayload = {
    email: string;
    password: string;
}

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
}

export type User = {
    email: string;
    name: string;
    lastName: string;
    location: string;
    token: string;
};


// payload type for the update user redux action
export type UpdateUserPayload = {
    name: string;
    lastName: string;
    location: string;
    email: string;
}