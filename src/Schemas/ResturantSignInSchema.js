import {z} from 'zod';

export const RestaurantSignInSchema = z.object({
    identifier : z.string(),
    password : z.string(),
})