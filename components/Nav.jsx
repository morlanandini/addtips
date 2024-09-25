"use client"
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'; // Added this import

import Profile from './Profile'

const Nav = () => {
  // const isUserLogged = false;
  const { data: session } = useSession();
  const [ providers, setProviders ] = useState(null);
  const [ dropDown, setDropDown ] = useState(false);


  useEffect(() => {
    const setUpProviders = async() => {
      const response = await getProviders();
      // console.log(response+" hiii");
      setProviders(response);
    }
    setUpProviders();
  }, [])


  return (
      <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className="flex gap-2 flex-center">
          <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
         />
         <p className='logo_text'>Tipnosys</p>
         </Link>

         <div className='sm:flex hidden'>
              {session?.user ? 
              (<div className='flex gap-3 md:gap-5'>
                <Link href="/create-post" className='black_btn'> Create Post</Link>
                <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className='outline_btn'> Sign Out</button>
                <Link href="/profile" className='black_btn'> Profile</Link>
                <Image
                src={session?.user.image}
                alt = "profile"
                width={37}
                height={37}
                />
              </div>

              ) : (
                  <>
                  {providers && Object.values(providers).map((provider) => (
                    <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                    >
                      Sign In
                    </button>
                  ) )}
                  </>
              )
            }
         </div>
         {/* session?.user "/assets/images/logo.svg" */}
         <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className='flex'>
                <Image
                src= { session?.user.image }
                alt = "profile"
                width={37}
                height={37}
                onClick={() => setDropDown((prev) => !prev)}
                />

                {dropDown && (
                  <div className='dropdown'>
                    <Link
                    href="/profile"
                    className='dropdown_link'
                    onClick={() => setDropDown((prev) => !prev)}
                    >
                      My Profile
                    </Link>
                    <Link
                    href="/create-post"
                    className='dropdown_link'
                    onClick={() => setDropDown((prev) => !prev)}
                    >
                      Create Post
                    </Link>

                    <button
                    type='button'
                    onClick={() => {
                      setDropDown((prev) => !prev);
                      router.push('/');
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
               ) }
              </div>
          ) : (
            <>
                  {providers && Object.values(providers).map((provider) => (
                    <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                    >
                      Sign In
                    </button>
                  ) )}
                  </>

              )}

         </div>

      
      </nav>
  )
}

export default Nav