import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private';
import { getClient } from '$lib/pocketbase';
import { Role } from '$lib/stores';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

const schema = z.object({
	username: z.string().regex(new RegExp('^[a-z0-9_]*$')).max(12).min(3),
	password: z.string().min(8),
	passwordConfirm: z.string().min(8),
	email: z.string().email(),
	name: z.string().max(30),
	members: z.string().optional(),
	coefficient: z.coerce.number().min(1).max(2),
	event: z.string().min(1)
});

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = schema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data,
				errors: result.error.flatten().fieldErrors
			});
		}

		const validatedData = result.data;

		if (validatedData.password !== validatedData.passwordConfirm) {
			return fail(400, {
				data,
				errors: {
					passwordConfirm: ['Lösenorden är inte samma']
				} as Record<string, string[] | undefined>
			});
		}

		const client = await getClient('');
		await client.collection('_superusers').authWithPassword(ADMIN_EMAIL as string, ADMIN_PASSWORD as string);
		try {
			await client.collection('account').create({ ...validatedData, role: Role.TEAM });
		} catch (e: any) {
			return fail(400, {
				data,
				error: e.message || 'Ett fel uppstod vid registrering'
			});
		}
		throw redirect(303, `/${params.year}/login`);
	}
};