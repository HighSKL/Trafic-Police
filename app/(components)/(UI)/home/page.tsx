"use client"
import { useEffect, useState } from 'react';
import style from './homePage.module.scss'
import Menu from '@/app/modules/Menu/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { DataFetcher } from '@/app/modules/models/dataFetcher';
import withAuth from '@/app/modules/Auth/withAuth';
import { CompanyType, DriverCompanyType, PeopleType, TraficAccidentDataType } from '@/app/types/types';
import Link from 'next/link';



function HomePage() {

    enum Windows {
        cars, people, TO, company, driver_company, trafic_accident
    }

    const [activeWindow, setActiveWindow]: any = useState(Windows.cars);
    const { CarsData, PeopleData, CompanyData, InspectionData, CompanyDriverData, AccidentData } = useSelector((state:RootState)=>({ CarsData: state.lists.CarsData, PeopleData: state.lists.PeopleData, CompanyData: state.lists.CompanyData, InspectionData: state.lists.InspectionData, CompanyDriverData: state.lists.CompanyDriverType, AccidentData: state.lists.TraficAccidentData}))

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
            if (!CompanyDriverData)
                await dataFetcher.GetCompanyDriver()
            if (!AccidentData)
                await dataFetcher.GetTraficAccidents()
        }
        )()
    })

    const renderCars = CarsData?.map((elem: any) => (
        <Link href={`/home/car/${elem.id}`}>
            <div className={style.car_block} key={elem.id}>
                <div className={style.car_mark}>Автомобиль: {elem.brand} {elem.models}</div>
                <div className={style.car_number}>Гос номер: {elem.state_number} {elem.region_number}</div>
            </div>
        </Link>
    ))

    const renderPeople = PeopleData?.map((elem: PeopleType) => (
        <Link href={`/home/people/${elem.id}`}>
            <div className={style.car_block} key={elem.id}>
                <div className={style.car_mark}>ФИО: {elem.first_name} {elem.last_name} {elem.patronymic}</div>
                <div className={style.car_number}>Серия: {elem.passport_series}</div>
                <div className={style.car_number}>Номер паспорта: {elem.passport_number}</div>
            </div>
        </Link>
    ))

    const renderCompany = CompanyData?.map((elem: CompanyType) => (
        <Link href={`/home/company/${elem.id}`}>
            <div className={style.car_block} key={elem.id}>
                <div className={style.car_mark}>Название организации: {elem.organization_name}</div>
                <div className={style.car_number}>ФИО директора: {elem.director_first_name} {elem.director_last_name} {elem.director_patronymic_name}</div>
                <div className={style.car_number}>Номер телефона: {elem.director_phone_number}</div>
            </div>
        </Link>
    ))

    const renderDriverCompany = CompanyDriverData?.map((elem: DriverCompanyType) => (
        <Link href={`/home/companydriver/${elem.id}`}>
            <div className={style.car_block} key={elem.id}>
                <div className={style.car_mark}>ФИО: {elem.first_name} {elem.last_name} {elem.patronymic}</div>
                <div className={style.car_number}>Название организации: {elem.organization_name}</div>
                <div className={style.car_number}>Серия: {elem.passport_series}</div>
                <div className={style.car_number}>Номер паспорта: {elem.passport_number}</div>
            </div>
        </Link>
    ))

    const renderTraficAccident = AccidentData?.map((elem: TraficAccidentDataType) => (
        <Link href={`/home/companydriver/${elem.accident_id}`}>
            <div className={style.car_block} key={elem.accident_id}>
                <div className={style.car_mark}>Улица {elem.street}</div>
                <div className={style.car_number}>Описание {elem.description}</div>
                <div className={style.car_number}></div>
                <div className={style.car_number}></div>
            </div>
        </Link>
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
                            <li className={activeWindow == Windows.people ? style.active : style.li} onClick={() => setActiveWindow(Windows.people)}>Физ. лица</li>
                            <li className={activeWindow == Windows.company ? style.active : style.li} onClick={() => setActiveWindow(Windows.company)}>Организации</li>
                            <li className={activeWindow == Windows.driver_company ? style.active : style.li} onClick={() => setActiveWindow(Windows.driver_company)}>Водители в компании</li>
                            <li className={activeWindow == Windows.trafic_accident ? style.active : style.li} onClick={() => setActiveWindow(Windows.trafic_accident)}>ДТП</li>
                        </ul>
                    </div>
                    <div className={style.wrapper}>
                        <div className={style.preloader}>
                            <div className={style.data_window}>
                                {activeWindow == Windows.cars&&renderCars}
                                {activeWindow == Windows.people&&renderPeople}
                                {activeWindow == Windows.company&&renderCompany}
                                {activeWindow == Windows.driver_company&&renderDriverCompany}
                                {activeWindow == Windows.trafic_accident&&renderTraficAccident}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default withAuth(HomePage);
export default HomePage