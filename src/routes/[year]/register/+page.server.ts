import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private';
import { getClient } from '$lib/pocketbase';
import { Role } from '$lib/stores';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';

const schema = z.object({
	username: z.string().regex(new RegExp('^[a-z0-9_]*$')).max(12).min(3),
	password: z.string().min(8),
	passwordConfirm: z.string().min(8),
	email: z.string().email(),
	name: z.string().max(30),
	members: z.string().optional(),
	coefficient: z.number().min(1).max(2),
	event: z.string().min(1)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		if (form.data.password !== form.data.passwordConfirm) {
			const passwordErrors = form?.errors?.passwordConfirm;
			if (!passwordErrors) {
				form.errors.passwordConfirm = ['Lösenorden är inte samma'];
			} else {
				form?.errors?.passwordConfirm?.push('Lösenorden är inte samma');
			}
			return fail(400, { form });
		}
		const client = await getClient('');
		await client.collection('_superusers').authWithPassword(ADMIN_EMAIL as string, ADMIN_PASSWORD as string);
		try {
			await client.collection('account').create({ ...form.data, role: Role.TEAM });
		} catch (e: any) {
			throw fail(400, { form, ...e });
		}
		throw redirect(303, `/${event.params.year}/login`);
	}
};
