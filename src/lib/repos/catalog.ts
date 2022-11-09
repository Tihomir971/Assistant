import { supabaseClient } from "$lib/db";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import type { LoadEvent } from "@sveltejs/kit";

export class IdeasRepo {
    
	constructor(event: LoadEvent) {
        const { supabaseClient } = await getSupabase(event);

	}

	delete = async (id: number) => {

		const { error } = await supabaseClient
			.from('eav_attribute')
            .delete()
			.eq(id)

		return error ?? []
	}