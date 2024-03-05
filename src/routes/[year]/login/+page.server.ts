import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ locals, params }) {
	if (locals.client.authStore.isValid) {
		throw redirect(303, `/${params.year}`);
	}
};

export const actions: Actions = {
	login: async ({ locals, cookies, request, params }) => {
		const form = await request.formData();
		const username = form.get('username') as string;
		const password = form.get('password') as string;
		const result = await locals.client
			.collection('account')
			.authWithPassword(username, password)
			.catch((e) => e);
		if (result.status === 400) {
			return fail(400, {
				username,
				credentialsError: 'Inloggningen misslyckades, fel lösenord eller användarnamn'
			});
		}
		const user = await locals.client
			.collection('account')
			.getOne(locals.client.authStore.model?.id || '', { expand: 'event' });
		if (
			user.export().role === 'team' &&
			user.export().expand.event.year.toString() !== params.year
		) {
			locals.client.authStore.clear();
			cookies.delete('pocketbase_auth', { path: '/' });
			return fail(400, {
				incorrectYear: 'Användaren du loggat in deltog i evenemanget i ett annat år.'
			});
		}
		cookies.set('pocketbase_auth', locals.client.authStore.exportToCookie(), { path: '/' });
		throw redirect(303, `/${params.year}`);
	},
	passwordReset: async ({ locals, request }) => {
		const form = await request.formData();
		const email = form.get('email') as string;
		try {
			await locals.client.collection('account').requestPasswordReset(email);
		} catch (error: any) {
			const errorData = error.data?.data;
			const errorMessage = Object.entries(errorData)
				.map(([key, value]) => `${key}: ${(value as any).message}`)
				.join(' ');
			return fail(400, {
				resetMessage: errorMessage || 'Nollställningsförsöket misslyckades, sorry!'
			});
		}
		return {
			resetMessage: 'Kolla din epost!'
		};
	}
};
