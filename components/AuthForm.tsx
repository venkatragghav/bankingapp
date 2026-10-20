"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user1.actions'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import * as z from "zod"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  ;
const schema = authFormSchema(type)

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: {
    firstName: "",
    lastName: "",
    address1: "",
    state: "",
    postalCode: "",
    ssn: "",
    city: "",
    dateOfBirth: "",
    email: "",
    password: "",
  },
})
   

 
   const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log("submitting", data)
    setIsLoading(true)
    try {
      if (type === 'sign-up') {
        const newUser = await signUp(data)
        setUser(newUser)
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if (response) router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  
   }
  return (
    <section className='auth-form'>
        
        <header className=' flex flex-col gap-4 md:gap-8'>

             <Link href="/" className='cursor-pointer flex items-center gap-1  '>
                <Image src="/icons/logo.svg" 
                    width={34}
                    height={34}
                    alt='Horizon logo'
                    
                ></Image>
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h2 className='text-24 lg:text-36 font-semibold text-grey-900'>{user?"link account":type === 'sign-in'? 'Sign-In':'Sign-Up' }</h2>
                <p className='text-16 font-normal text-gray-600'>{user? "link your account to get started":"please enter your details"}</p>
            </div>
            
        </header>
        {user?(
        <div className='flex flex-col'></div>):
        
        (<>
            <Form {...form}>
                <form
  onSubmit={form.handleSubmit(
    onSubmit,
    (errors) => console.log("Validation errors:", errors)
  )}
  className="space-y-6"
>
                    {type==="sign-up" && (<>
                    <div className=' flex gap-4'>

                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="enter your FirstName " />
                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="enter your LastName " />
                    </div>
                    <CustomInput control={form.control} name="address1" label="Address" placeholder="enter your Address" />
                    <CustomInput control={form.control} name="city" label="city" placeholder="enter your city" />
                    <div className=' flex gap-4'>

                    <CustomInput control={form.control} name="state" label="State" placeholder="Ex:TN" />
                    <CustomInput control={form.control} name="postalCode" label="PostalCode" placeholder="ex:600001" />
                    </div>
                    <div className=' flex gap-4'>

                    <CustomInput control={form.control} name="ssn" label="ssn" placeholder="ex:10202" />
                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="yyyy-mm-dd" />
                    </div>

                    
                    
                    
                    
                    </>)}
                    <CustomInput control={form.control} name="email" label="Email" placeholder="enter your email" />
                    <CustomInput control={form.control} name="password" label="Password" placeholder="enter your password" />
                    <div className='flex flex-col gap-4'>
                    <Button type="submit" className="form-btn">{isLoading?(<><Loader2 size={20} className='animate-spin'/>&nbsp; 
                                Loading...</>):type=='sign-in'? 'sign in':'sign up'}</Button>
                 </div>
                </form>
            </Form>
            <footer className='flex justify-center gap-1'>
                <p className='font-normal text-14 text-grey-600'>{type==="sign-in"? "dont have an account?": "Already have an account?"}</p>
                        <Link href={type=="sign-in"?"/sign-up":"/sign-in"} className='form-link'>{type=="sign-in"?"sign-up":"sign-in"}</Link>
            </footer>
           
        </>
    )}
    </section>
  )
}

export default AuthForm