"use client"
import React, { useState } from 'react';
import style from './homePage.module.scss'

function HomePage() {

    enum Windows {
        cars, people, TO
    }

    const [activeWindow, setActiveWindow]: any = useState(Windows.cars);

    return (
        <div className={style.wrapper}>
            <ul className={style.data_titles}>
                <li className={activeWindow == Windows.cars?style.active:style.li} onClick={()=>setActiveWindow(Windows.cars)}>Автомобили</li>
                <li className={activeWindow == Windows.people?style.active:style.li} onClick={()=>setActiveWindow(Windows.people)}>Люди</li>
                <li className={activeWindow == Windows.TO?style.active:style.li} onClick={()=>setActiveWindow(Windows.TO)}>Технический осмотр</li>
            </ul>

            <div className={style.data_window}>
                
            </div>
        </div>
    );
}

export default HomePage;