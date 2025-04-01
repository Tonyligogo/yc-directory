'use client';

import { useActionState, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
// import MDEditor from '@uiw/react-md-editor';
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { z } from "zod";
import dynamic from "next/dynamic";
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import { createPitch } from "@/lib/actions";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
  );

const StartupCreateForm = () => {
    const [errors, setErrors] = useState({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();
    const handleFormSubmit = async (prevState, formData) => {
        try {
           const formValues = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            link: formData.get("link"),
            pitch,
           } 
           await formSchema.parseAsync(formValues);
           const result = await createPitch(prevState, formValues, pitch)
           if(result.status === 'SUCCESS'){
            toast.success('Startup has been created')
           }
            router.push(`/startup/${result._id}`)
        } catch (error) {
            if(error instanceof z.ZodError) {
                const errorMessages = error.flatten().fieldErrors;
                setErrors(errorMessages);
                toast.error('Make sure to fill all the fields correctly')
                return {...prevState, error:'Validation failed', status:'ERROR'}
            }
            toast.error('Something went wrong')
            return {...prevState, error:'Something went wrong', status:'ERROR'}
        }
    }
const [state, formAction, isPending] = useActionState(handleFormSubmit, {error:'',status:"INITIAL"});
    return (
        <form action={formAction} className='space-y-5'>
            <div className="space-y-2">
                <Label htmlFor="title" className='text-lg font-semibold'>Title</Label>
                <Input type="text" name="title" id="title" required className='border-2 border-black rounded-full ' placeholder="Startup title" />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" className='text-lg font-semibold'>Description</Label>
                <Textarea
                    name="description"
                    id="description"
                    className='border-2 border-black rounded-md '
                    placeholder="Startup description"
                    required
                />
                {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="category" className='text-lg font-semibold'>Category</Label>
                <Input type="text" name="category" id="category" required className='border-2 border-black rounded-full ' placeholder="Startup category (Tech, Health, Education ...)" />
                {errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="link" className='text-lg font-semibold'>Image URL</Label>
                <Input type="text" name="link" id="link" required className='border-2 border-black rounded-full' placeholder="Image URL" />
                {errors.link && <p className="text-red-500">{errors.link}</p>}
            </div>
            <div data-color-mode="light" className="space-y-2">
                <Label htmlFor="pitch" className='text-lg font-semibold'>Pitch</Label>
                <MDEditor value={pitch} id='pitch' preview='edit' height={300} 
                textareaProps={{
                    placeholder:'Briefly describe your idea and what problem it solves'
                }} 
                previewOptions={{
                    disallowedElements:['style']
                }}
                style={{borderRadius:10, overflow:'hidden'}} 
                onChange={(value) => setPitch(value)} 
                />
                {errors.pitch && <p className="text-red-500">{errors.pitch}</p>}
            </div>
            <Button type="submit" className="w-full bg-black rounded-full" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit your pitch'}
            </Button>
        </form>
    )
}
export default StartupCreateForm
