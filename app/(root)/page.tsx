import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import TotalBalanceBox from '../../components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user1.actions'


const Home = async() => {
    const Loggedin= await getLoggedInUser();
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                type="greeting"
                title="Welcome"
                   user={Loggedin?.firstName || 'Guest'}
                subtext="Access and Manage Your Account and Transactions efficiently"
                ></HeaderBox>
                <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1250.35}
                
                />
            </header>
            RECENT TARNSACTIONS
        </div>
        <RightSidebar 
        user={Loggedin}
        transactions={[]}
            banks={[
    { $id: '1', currentBalance: 123.50, name: 'Test Bank', mask: '1234', appwriteItemId: 'a' },
    { $id: '2', currentBalance: 456.75, name: 'Test Bank 2', mask: '5678', appwriteItemId: 'b' },
  ]}
        
        
        ></RightSidebar>
    </section>
  )
}

export default Home