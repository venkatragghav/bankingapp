import { createLinkToken, exchangePublicToken } from '@/lib/actions/user1.actions';
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'

const PlaidLink = ({user,variant}:PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState('');
    useEffect(()=>{
        const getLinkToken =async()=>{
            const data= await createLinkToken(user);
            setToken(data?.linkToken)
        }
        getLinkToken();
    },[])
    const onSuccess= useCallback<PlaidLinkOnSuccess>(async(public_token:string)=>
    {
        // await exchangePublicToken({
        //     publicToken:public_token,user
        // })
        router.push('/')
    },[user])
    const config:PlaidLinkOptions ={
        token,
        onSuccess

    }
    const  {open,ready}=usePlaidLink(config);
  return (
    <>
        {variant === "primary"?(<button onClick={()=>open()} disabled={!ready}className='plaidlink-primary'>Connect bank</button>):variant ==="ghost"?(<button>Connect bank</button>):(<button>Connect bank</button>)}
    </>
  )
}

export default PlaidLink