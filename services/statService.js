import { supabase } from "../lib/supabase"

export const getStatistics = async ()=>{
    try {
        const {data,error} = await supabase.rpc('get_gift_stats').single()
        

        if(error){
            console.log('StatService Error',error)
            return {success:false, msg: error?.message};
        }

        return {success:true,data}
        
    } catch (error) {
        console.log('StatService Error',error);
        return {success:false, msg: error.message};
    }
}