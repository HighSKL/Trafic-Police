'use client'
import { setUserData } from '@/app/(storage)/reducers/loginReducer';
import { RootState } from '@/app/(storage)/store';
import { ErrorResponesType, UserDataType } from '@/app/types/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetUser } from '../apiservice';
// import { getProfile } from '../api_service';
// import Preloader from '../Preloader/Preloader';
// import { data, setUserData } from '@/app/Storage/store';
// import { ErrorResponesType, UserDataType } from '@/app/types';

type injectedProps = {}

export default function withAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const router = useRouter();
        const userData = useSelector((state:RootState)=>state.login.user)

        enum ActiveUserErrors{
            UserNotAuthorized = 401
        }

        const [isUser, setUser] = useState(false)

        useEffect(() => {
            if (!userData) {
                (async () => {
                    const data: UserDataType|ErrorResponesType = await GetUser().then(res => res)
                    console.log(data)
                    if (data?.status === ActiveUserErrors.UserNotAuthorized)
                        router.push('/auth')
                    else {
                        setUserData(data as UserDataType)
                        setUser(true)
                    }
                })()
            }
            else
                setUser(true) 

        }, [])

        return (<>
            {isUser&&<WrappedComponent {...props}/>}
            {/* {isUser?<WrappedComponent {...props}/>:<Preloader />} */}
        </>)
    }
}