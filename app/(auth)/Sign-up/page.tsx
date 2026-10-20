import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user1.actions';
import React from 'react'

const SignUP = async() => {
  const loggedInUser = await getLoggedInUser();
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type="sign-up"></AuthForm>
    </section>
  )
}

export default SignUP