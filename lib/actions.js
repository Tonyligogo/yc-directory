'use server'

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state, form, pitch)=>{
    const session = await auth();
    if(!session?.user) {
        return parseServerActionResponse({error:'Unauthorized', status:'ERROR'})
    }
    const {title, description, category, link} = form;
    const slug = slugify(title, {lower:true, strict:true})
    try{
        const startup = {
            title,
            description,
            category,
            image:link,
            pitch,
            slug:{
                _type:slug,
                current:slug
            },
            author:{
                _type:'reference',
                _ref:session?.id
            },
        }
        const result = await writeClient.create({_type:'startup', ...startup})
        return parseServerActionResponse({...result,error:'', status:'SUCCESS'})
    }catch(error){
        console.log(error)
        return parseServerActionResponse({error:JSON.stringify(error), status:'ERROR'})
    }
    
    
}