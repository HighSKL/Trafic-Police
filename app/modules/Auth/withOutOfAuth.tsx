"use client"

import { ErrorResponesType, UserDataType } from '@/app/types/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GetUser } from '../apiservice';
import { setUserData } from '@/app/(storage)/reducers/loginReducer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';

type injectedProps = {}

export default function withOutOfAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const userData = useSelector((state:RootState)=>state.login.user)
        const router = useRouter()

        const [isUser, setUser] = useState(true)

        useEffect(() => {
            if (!userData) {
                (async () => {
                    const data: UserDataType|ErrorResponesType  = await GetUser().then(res => res)
                    console.log(data)
                    if (data?.status === 401) {
                        setUser(false)
                    }
                    else {
                        setUserData(data as UserDataType)
                        setUser(true)
                        router.push('/home')
                    }
                })()
            }
            else{
                setUser(true)
                router.push('/home')
            }
        }, [])

        return (<>
            {/* {isUser ? <Preloader /> : <WrappedComponent {...props} />} */}
            {!isUser && <WrappedComponent {...props} />}
        </>)
    }
}