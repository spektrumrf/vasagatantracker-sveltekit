import { type Actions, fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	confirm: async ({ locals, request, url }) => {
		const token = url.searchParams.get('token') || '';
		const form = await request.formData();
		const password = form.get('password') as string;
		const passwordAgain = form.get('passwordAgain') as string;
		try {
			await locals.client
				.collection('account')
				.confirmPasswordReset(token, password, passwordAgain);
		} catch (error: any) {
			const errorData = error.data?.data;
			const errorMessage = Object.entries(errorData)
				.map(([key, value]) => `${key}: ${(value as any).message}`)
				.join(' ');
			return fail(400, {
				message: errorMessage || 'Uppdatering av lösenordet misslyckades, sorry!'
			});
		}
		return redirect(303, `/`);
	}
};
