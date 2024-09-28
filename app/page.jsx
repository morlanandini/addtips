import Feed from '@/components/Feed'
import React from 'react'

const Home = () => {
  return (
    <><section className='w-full flex-center flex-col'>
          <h1 className='head_text text-center'>
              Discover & Share
              <br />
              <span className="green_gradient text-center">Help you to cross the barriers</span>
          </h1>

          <p className='desc text-center'> This is a website where you can discover, create and share your Taughts & tips for Others</p>
      </section>
      <Feed></Feed></>
  )
}

export default Home