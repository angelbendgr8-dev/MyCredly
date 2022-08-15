export interface User {
  mobile_number: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: Date;
  verified: boolean;
  updatedAt: Date;
  email_verified: boolean;
  phone_verified: boolean;
  profile_image?: string;
}
