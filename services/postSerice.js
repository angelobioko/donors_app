import { supabase } from "../lib/supabase";

export const createOrUpdatePost = async (post) =>{
    try {
        const { data, error } = await supabase
            .from('gifts')
            .upsert(post)
            .select()
            .single();

        if(error){
            console.log ('createPost error', error);
            return {success:false, msg: 'Could not create your post'};
        }

        return {success:true, data:data}
        
    } catch (error) {
        console.log ('createPost error', error);
        return {success:false, msg: 'Could not create your post'};
    }
}

export const fetchRecords = async (limit=10) =>{
    try {
        const {data,error} = await supabase
        .from('gifts')
        .select('*')
        .order('created_at', {ascending: false})
        .limit(limit);

        if(error){
            console.log ('fetchRecords error', error);
            return {success:false, msg: 'Could not fetch records'};
        }

        return {success: true, data:data}
        
    } catch (error) {
        console.log ('fetchRecords error', error);
        return {success:false, msg: 'Could not fetch records'};
    }
}