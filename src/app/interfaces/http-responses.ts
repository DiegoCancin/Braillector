export interface HttpResponses {
  message: string;
}

export interface LoginResponse {
    id: number,
    firstName: string,
    paLastName: string,
    maLastName: string,
    email: string,
    typeEntity: TypeResponse
}

export interface TypeResponse {
    id: number,
    description: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest {
    firstName: string,
    paLastName: string,
    smaLastName: string,
    email: string,
    password: string
}

