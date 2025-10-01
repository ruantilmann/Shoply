import axios from 'axios';
import { z } from 'zod';

const API_URL = 'http://localhost:3000';

const registerSchema = z.object({
  fullName: z.string(),
  age: z.number(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const createUser = async (userData: RegisterFormData) => {
  const { fullName, ...rest } = userData;
  const response = await axios.post(`${API_URL}/users/createUser`, {
    name: fullName,
    ...rest,
  });
  return response.data;
};
