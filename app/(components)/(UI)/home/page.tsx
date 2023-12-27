"use client"
import { useEffect, useState } from 'react';
import style from './homePage.module.scss'
import Menu from '@/app/modules/Menu/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { DataFetcher } from '@/app/modules/models/dataFetcher';
import withAuth from '@/app/modules/Auth/withAuth';
import { CompanyType, PeopleType } from '@/app/types/types';
import {InpectionType} from '@/app/types/types'

function HomePage() {

    enum Windows {
        cars, people, TO, company
    }

    const [activeWindow, setActiveWindow]: any = useState(Windows.cars);
    const { CarsData, PeopleData, CompanyData, InspectionData } = useSelector((state:RootState)=>({ CarsData: state.lists.CarsData, PeopleData: state.lists.PeopleData, CompanyData: state.lists.CompanyData, InspectionData: state.lists.InspectionData}))

    const dataFetcher = new DataFetcher()

    useEffect(() => {
        (async () => {
            if (!CarsData)
                await dataFetcher.getCarsData()
            if (!PeopleData)
                await dataFetcher.GetPeople()
            if (!CompanyData)
                await dataFetcher.GetCompany()
            if (!InspectionData)
                await dataFetcher.GetInspection()
        }
        )()
    })

    const renderCars = CarsData?.map((elem: any) => (
        <div className={style.car_block} key={elem.id}>
            <div className={style.car_mark}>{elem.brand} {elem.models}</div>
            <div className={style.car_number}>{elem.state_number} {elem.region_number}</div>
        </div>
    ))

    const renderPeople = PeopleData?.map((elem: PeopleType) => (
        <div className={style.car_block} key={elem.id}>
            <div className={style.car_mark}>{elem.owner_name}</div>
            <div className={style.car_number}>{elem.passport_series} {elem.passport_number}</div>
        </div>
    ))

    const renderCompany = CompanyData?.map((elem: CompanyType) => (
        <div className={style.car_block} key={elem.id}>
            <div className={style.car_mark}>{elem.organization_name}</div>
            <div className={style.car_number}>{elem.director_name} {elem.director_phone_number}</div>
        </div>
    ))

    const renderInspection = InspectionData?.map((elem: InpectionType) => (
        <div className={style.car_block} key={elem.id}>
            <div className={style.car_mark}>{elem.state_number}</div>
            <div className={style.car_number}>{elem.inspection_ticket_number} {elem.date_inssue}</div>
        </div>
    ))

    return (
        <div className={style.layout_wrapper}>
            <div className={style.horizontal_tools_container}>
                <div className={style.menu_container}>
                    <Menu />
                </div>
                <div className={style.grid_column}>
                    <div className={style.toolkit_window}>
                        <ul className={style.data_titles}>
                            <li className={activeWindow == Windows.cars ? style.active : style.li} onClick={() => setActiveWindow(Windows.cars)}>Автомобили</li>
                            <li className={activeWindow == Windows.people ? style.active : style.li} onClick={() => setActiveWindow(Windows.people)}>Люди</li>
                            <li className={activeWindow == Windows.company ? style.active : style.li} onClick={() => setActiveWindow(Windows.company)}>Организации</li>
                            <li className={activeWindow == Windows.TO ? style.active : style.li} onClick={() => setActiveWindow(Windows.TO)}>Технический осмотр</li>
                        </ul>
                    </div>
                    <div className={style.wrapper}>
                        <div className={style.preloader}>
                            <div className={style.data_window}>
                                {activeWindow == Windows.cars&&renderCars}
                                {activeWindow == Windows.people&&renderPeople}
                                {activeWindow == Windows.company&&renderCompany}
                                {activeWindow == Windows.TO&&renderInspection}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomePage);
// export default HomePage