import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import TotalBalanceBox from '../../components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'


const Home = () => {
    const Loggedin={FirstName:"venkat", LastName:"Ragghav", email:"venkatragghav@gmail.com"}
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                type="greeting"
                title="Welcome"
                user={Loggedin?.FirstName|| 'Guest'}
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
        banks={[{currentBalance:123.50},{currentBalance:123.50}]}
        
        
        ></RightSidebar>
    </section>
  )
}

export default Home