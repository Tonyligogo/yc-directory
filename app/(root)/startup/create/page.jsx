import { auth } from "@/auth";
import { Hero } from "@/components/custom/Hero"
import StartupCreateForm from "@/components/custom/StartupCreateForm";
import { redirect } from "next/navigation";

const Create = async() => {
    const session = await auth();
    if(!session) redirect('/')
  return (
    <>
    <Hero heading='SUBMIT YOUR STARTUP' subHeading='Share your startup with the world' />
    <section className='max-w-3xl mx-auto mt-5 mb-10'>
        <StartupCreateForm />
    </section>
    </>
  )
}

export default Create