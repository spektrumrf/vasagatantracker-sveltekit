import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

async function resetEmails() {
	const pocketbaseUrl = 'https://db-dev.tracker.vasagatan.fi';
	const client = new PocketBase(pocketbaseUrl);

	await client.admins.authWithPassword(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
	const accounts = await client.collection('account').getFullList();
	const promises = accounts
		.filter((a) => a.role === 'team')
		.map((a) =>
			client
				.collection('account')
				.update(a.id, { ...a, email: `${a.id}@vasagatan.fi`, username: a.id })
		);
	await Promise.all(promises);
}
resetEmails();
