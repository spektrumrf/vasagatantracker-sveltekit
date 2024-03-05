import { Role } from '$lib/stores';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const ssr = false;

export const load: PageServerLoad = async function ({ fetch, locals }) {
	if (locals.client.authStore.model?.export().role !== Role.ADMIN) {
		throw redirect(303, '/');
	}
	const allLocations = await fetch('/api/locations').then((res) => res.json());
	return { allLocations };
};
export const actions: Actions = {
	edit: async ({ request, locals }) => {
		const formData = await request.formData();
		const { id, finished, ...info } = Object.fromEntries(formData.entries());
		const event = await locals.client
			.collection('event')
			.update(formData.get('id') as string, { info, finished: !!finished })
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		return { event };
	},
	editLocation: async ({ request, locals }) => {
		const formData = await request.formData();
		const location = await locals.client
			.collection('location')
			.update(formData.get('id') as string, formData)
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		return { location };
	},
	addLocation: async ({ request, locals }) => {
		const formData = await request.formData();
		const location = await locals.client
			.collection('location')
			.create(formData)
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		return { location };
	},
	addLocationToYear: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('locationId') as string;
		const eventId = formData.get('eventId') as string;
		const location = await locals.client
			.collection('location')
			.getOne(id)
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		const updatedLocation = await locals.client
			.collection('location')
			.update(id, { event: [...location.event, eventId].filter((v, i, a) => a.indexOf(v) === i) })
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		return { updatedLocation };
	},
	deleteLocation: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const eventId = formData.get('eventId') as string;
		const location = await locals.client
			.collection('location')
			.getOne(id)
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		let returnLocation;
		if (location.event.length > 1) {
			returnLocation = await locals.client
				.collection('location')
				.update(id, { event: location.event.filter((id: string) => eventId !== id) })
				.catch((e) => {
					throw error(e.status, e.data.message);
				});
		} else {
			returnLocation = await locals.client
				.collection('location')
				.delete(id)
				.catch((e) => {
					throw error(e.status, e.data.message);
				});
		}
		return { returnLocation };
	},
	editTeam: async ({ request, locals }) => {
		const formData = await request.formData();
		const account = await locals.client
			.collection('account')
			.update(formData.get('id') as string, formData)
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		return { account };
	},
	deleteTeam: async ({ request, locals }) => {
		const formData = await request.formData();
		const account = await locals.client
			.collection('account')
			.delete(formData.get('id') as string)
			.catch((e) => {
				throw error(e.status, e.data.message);
			});
		return { account };
	}
};
