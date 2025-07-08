export interface EditUserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
}

export interface ClientUserPayload {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Genre {
  id: number;
  name: string;
  description: string;
}

export interface CreateGenrePayload {
  name: string;
  description: string;
}

export interface EditGenrePayload {
  name: string;
  description: string;
}

export interface Loan {
  id: number;
  bookId: number;
  userId: number;
  loanDate: Date;
  returnDate: Date;
  returnedAt?: Date | null;
}
