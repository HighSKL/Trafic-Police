"use client"
import style from './menu.module.scss'
import { useRouter } from 'next/navigation';

export default function Menu() {

    let router = useRouter()

    return (
        <>
            <div className={style.wrapper}>
                <ul className={style.tools_container}>
                    <li onClick={() => router.push('/addcar')}>Добавить автомобиль +</li>
                    <li onClick={() => router.push('/addpeople')}>Добавить владельца +</li>
                    <li onClick={() => router.push('/addinspect')}>Добавить технический осмотр +</li>
                    <li onClick={() => router.push('/addinspect')}>Добавить ДТП +</li>
                </ul>
            </div>
        </>
    );
}