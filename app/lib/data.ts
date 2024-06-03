import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { CustomersType, User } from './definitions';

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersType[]>`
      SELECT
        customers.id,
        customers.name,
        customers.email
      FROM customers
      WHERE
        customers.name ILIKE ${'%' + query + '%'} OR
        customers.email ILIKE ${'%' + query + '%'}
      ORDER BY customers.name ASC
    `;

    const customers = data.rows.map((customer) => ({
      ...customer,
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customers.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
