"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './homePage.module.scss'
import Header from '@/app/modules/Header/header';
import Menu from '@/app/modules/Menu/Menu';
import { GetCars } from '@/app/modules/apiservice';
import { carsData, setCars } from '@/app/(storage)/carsdata';

function HomePage() {

    enum Windows {
        cars, people, TO
    }

    const [activeWindow, setActiveWindow]: any = useState(Windows.cars);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (!carsData) {
                const carsfromDB = await GetCars().then(res => res)
                setCars(carsfromDB.data)
                router.refresh();
            }
        }
        )()
    })

    const renderCars = carsData?.map((elem: any) => (
        <div className={style.car_block} key={elem.id}>
            <div className={style.car_mark}>{elem.brand}</div>
            <div className={style.car_number}>{elem.state_number} {elem.region_number}</div>
        </div>
    ))

    return (
        <div className={style.layout_wrapper}>
            <div className={style.header_container}>
                <Header />
            </div>
            <div className={style.horizontal_tools_container}>
                <div className={style.menu_container}>
                    <Menu />
                </div>
                <div className={style.grid_column}>
                    <div className={style.toolkit_window}>
                        <ul className={style.data_titles}>
                            <li className={activeWindow == Windows.cars ? style.active : style.li} onClick={() => setActiveWindow(Windows.cars)}>Автомобили</li>
                            <li className={activeWindow == Windows.people ? style.active : style.li} onClick={() => setActiveWindow(Windows.people)}>Люди</li>
                            <li className={activeWindow == Windows.TO ? style.active : style.li} onClick={() => setActiveWindow(Windows.TO)}>Технический осмотр</li>
                        </ul>
                    </div>
                    <div className={style.wrapper}>
                        <div className={style.preloader}>
                            <div className={style.data_window}>
                                {renderCars}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;