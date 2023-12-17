"use client"
import { useState, useEffect } from 'react';
import { Form, Formik, Field } from "formik";
import style from './addpeople.module.scss'
import Link from 'next/link';
import { CarItemFindCarType, OrganizationItemFindOrgType, PersonFieldType } from '@/app/types/types';
import { AddPeoplePhys } from '@/app/modules/apiservice';
import { addPeopleErrorsArr, setAddPeopleErrorsArr } from '@/app/(storage)/errorsStorage/errorsAddPeople';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { Streets } from '@/app/(storage)/streetsdata';
import { DataFetcher } from '@/app/modules/models/dataFetcher';

export default function AddPeople() {

    enum personType {
        physical, juridical, companyDriver
    }

    const [activeCategory, setActiveCategory] = useState<string[]>([])
    const [person, setPerson] = useState<personType>(personType.physical)
    const DataFetcherObject = new DataFetcher()

    const FieldsWorkerObject = new FieldsWorker(addPeopleErrorsArr, setAddPeopleErrorsArr)

    useEffect(() => {
        (async () => {
            // initialize lists
            if (!Streets)
                await DataFetcherObject.getStreets()
            //
        })()
    }, [])

    const fieldsPhysialPerson: PersonFieldType[] = [
        { title: "Автомобили во владении", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true },
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Organization_place_street", list: Streets, validate: /^(?!---|\s)(\S)/},
        { title: "Дом", errorMessage: "Укажите дом", name: "Organization_place_house", validate: /\S/ },
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Organization_place_room", validate: /\S/ },
        { title: "Имя владельца", errorMessage: "Укажите имя", name: "OwnerName", validate: /\S/ },
        { title: "Номер телефона владельца", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "Ownerphonenumber", validate: /^((\+7)|(8))\d{10}$/ },
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "PassportSeries", validate: /^\d{4}$/ },
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "PassportNumber", validate: /^\d{6}$/ },
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "WhoPassportGived", validate: /\S/ },
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "DatePassportGived", date: true, validate: /\S/ },
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "DriverlicenseNumber", validate: /\S/ },
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "DriverlicenseGivedData", validate: /^\d{10}$/, date: true },
        { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: ["A", "B", "C", "D", "E", "М"] }
    ]

    const fieldsJuridicalPerson: PersonFieldType[] = [
        { title: "Автомобили во владении организации", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true },
        { title: "Улица", errorMessage: "Укажите улицу нахождения организации", name: "Organization_place_street", list: Streets, validate: /^(?!---|\s)(\S)/ },
        { title: "Дом", errorMessage: "Укажите дом", name: "Organization_place_house" },
        { title: "Квартира/Офис", errorMessage: "Укажите квартиру/номер офиса", name: "Organization_place_room" },
        { title: "Название организации", errorMessage: "Укажите название организации", name: "Organization_name" },
        { title: "ФИО директора организации", errorMessage: "Укажите имя директора", name: "DirectorName" },
        { title: "Номер телефона директора организации", errorMessage: "Укажите номер телефона директора в формате +X XXX XXX XX XX", name: "Directorphonenumber" },
    ]

    const fieldsCompanyDriver: PersonFieldType[] = [
        { title: "Водитель в организации", errorMessage: "Укажите орагинизацию", name: "WhereWork", findOrganizationNeed: true },
        { title: "Имя владельца", errorMessage: "", name: "OwnerName" },
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Organization_place_street", list: Streets, validate: /^(?!---|\s)(\S)/ },
        { title: "Дом", errorMessage: "Укажите дом", name: "Organization_place_house", validate: /\S/ },
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Organization_place_room", validate: /\S/ },
        { title: "Номер телефона", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "Ownerphonenumber", validate: /^((\+7)|(8))\d{10}$/ },
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "PassportSeries" },
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "PassportNumber" },
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "WhoPassportGived" },
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "DatePassportGived", date: true },
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "DriverlicenseNumber" },
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "DriverlicenseGivedData", date: true },
        { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: ["A", "B", "C", "D", "E", "М"] }
    ]

    const [personChosenCars, setPersonChosenCars] = useState<CarItemFindCarType[]>([])
    const [personChoosenOrganization, setPersonChosenOrganization] = useState<OrganizationItemFindOrgType>()

    const sendRequest = (values: any) => {
        switch (person) {
            case personType.physical: {
                const chosenCarsId = personChosenCars.map((item: CarItemFindCarType) => item.id)
                const categories = activeCategory.join(' ')
                AddPeoplePhys(chosenCarsId, values.Email, values.OwnerName, values.Ownerphonenumber, parseInt(values.PassportSeries),
                    parseInt(values.PassportNumber), values.WhoPassportGived, values.DatePassportGived, parseInt(values.DriverlicenseNumber),
                    values.DriverlicenseGivedData, categories)
            }
            case personType.juridical: {

            }
        }
    }

    const defaultVariables = (reset?: () => void) => {
        setActiveCategory([])
        setPersonChosenCars([])
        reset ? reset() : null
        setAddPeopleErrorsArr([])
    }

    const changePeopleType = (personType: personType, reset: () => void) => {
        setPerson(personType)
        defaultVariables(reset)
    }

    const fieldsPhysRender = FieldsWorkerObject.renderPeopleFields(fieldsPhysialPerson, { chosenCarsArr: personChosenCars, setPersonChosenCars, activeCategory, setActiveCategory })
    const fieldsJurRender = FieldsWorkerObject.renderPeopleFields(fieldsJuridicalPerson, { chosenCarsArr: personChosenCars, setPersonChosenCars: setPersonChosenCars })
    const fieldsDriverRender = FieldsWorkerObject.renderPeopleFields(fieldsCompanyDriver, { chosenOrganization: personChoosenOrganization, setPersonChosenOrganization, activeCategory, setActiveCategory })

    return (
        <div className={style.wrapper}>
            <div className={style.form_window}>
                <div className={style.form_container}>
                    <div className={style.funс_block}>
                        <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
                    </div>
                    <h1 className={style.title}>Зарегистрировать человека</h1>
                    <Formik
                        initialValues={{
                            WhereWork: '', OwnCar: '', Organization_place_street: '', Organization_place_house: '',
                            Organization_place_room: '', OwnerName: '', Ownerphonenumber: '', PassportSeries: '',
                            PassportNumber: '', WhoPassportGived: '', DatePassportGived: '', DriverlicenseNumber: '',
                            DriverlicenseGivedData: '', Categories: '', Organization_name: '', DirectorName: '',
                            Directorphonenumber: ''
                        }}
                        onSubmit={(values) => {
                            switch (person) {
                                case personType.physical: {
                                    FieldsWorkerObject.validate(fieldsPhysialPerson, values)
                                    break
                                }
                                case personType.juridical: {
                                    FieldsWorkerObject.validate(fieldsJuridicalPerson, values)
                                    break
                                }
                                case personType.companyDriver: {
                                    FieldsWorkerObject.validate(fieldsCompanyDriver, values)
                                    break
                                }
                            }
                        }
                        }
                    >
                        {({ resetForm }) => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.people_type_container}>
                                    <div className={style.people_type_block} onClick={() => { changePeopleType(personType.physical, resetForm) }}>
                                        <Field type="checkbox" className={style.checkbox} checked={person === personType.physical} />
                                        <p className={style.people_type_header}>Физическое лицо</p>
                                    </div>
                                    <div className={style.people_type_block} onClick={() => { changePeopleType(personType.juridical, resetForm) }}>
                                        <Field type="checkbox" className={style.checkbox} checked={person === personType.juridical} />
                                        <p className={style.people_type_header}>Юридическое лицо</p>
                                    </div>
                                    <div className={style.people_type_block} onClick={() => { changePeopleType(personType.companyDriver, resetForm) }}>
                                        <Field type="checkbox" className={style.checkbox} checked={person === personType.companyDriver} />
                                        <p className={style.people_type_header}>Водитель в компании</p>
                                    </div>
                                </div>
                                <div className={style.fields_container}>
                                    {person == personType.physical && fieldsPhysRender}
                                    {person == personType.juridical && fieldsJurRender}
                                    {person == personType.companyDriver && fieldsDriverRender}
                                </div>
                                <button className={style.button} type="submit" disabled={false}>Добавить</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}