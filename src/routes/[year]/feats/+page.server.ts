import { FeatContent } from '$lib/stores';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const ssr = false;

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const form = await request.formData();
		if (form.get('locationName') === 'Övrig' && !form.get('teamComment')) {
			return fail(400, { message: 'Övrig plats kräver kommentar' });
		}
		form.set('team', locals.client.authStore.model?.id as string);
		const proofsFile = form.get('proofs') as File;
		if (proofsFile.size === 0) {
			form.delete('proofs');
		}
		let feat;
		try {
			feat = await locals.client.collection('feat').create(form);
		} catch (e: any) {
			return fail(400, { ...e });
		}
		return { feat };
	},
	edit: async ({ request, locals }) => {
		const formData = await request.formData();
		const formObject = Object.fromEntries(formData.entries());
		let content: any = {};
		Object.values(FeatContent).forEach((c: string) => (content[c] = Number(formData.get(c))));
		// Super hack, sorry
		// Why isn't this needed anymore?
		// content["öl"] = Number(formData.get("Ã¶l"));
		formObject.approved = formObject.approved ? 'true' : 'false';
		formObject.checked = formObject.checked ? 'true' : 'false';
		const feat = await locals.client
			.collection('feat')
			.update(formData.get('id') as string, { ...formObject, content })
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		return { feat };
	}
};
