export interface Address {
  street: string;
  city: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  address: Address;
  company?: {
    name: string;
  };
}
