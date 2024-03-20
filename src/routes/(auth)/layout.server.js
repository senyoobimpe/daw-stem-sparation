import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getAccount } from '$lib/domains/auth/api/getAccount';

export const load = async ({ locals }) => {
    const session = (await locals.getSession());git branch - M main
    if (!session?.user?.id || !session?.accessToken) {
        throw redirect(307, '/auth/login');
    }
    const account = await getAccount(session?.user?.id, session?.accessToken);
    if (!account) {
        throw redirect(307, '/auth/login');
    }
    return {
        session,
        account,
    };
};