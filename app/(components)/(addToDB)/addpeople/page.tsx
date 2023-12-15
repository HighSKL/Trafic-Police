"use client"
import React, { useState } from 'react';
import { Form, Formik, Field } from "formik";
import style from './addpeople.module.scss'
import Link from 'next/link';
import FindCarBlock from '@/app/modules/FindCarBlock/FindCarBlock';
import { CarItemFindCarType, OrganizationItemFindOrgType, PersonFieldType } from '@/app/types/types';
import { AddPeoplePhys } from '@/app/modules/apiservice';
import { validator } from '@/app/modules/validator';
import FindOrganizationBlock from '@/app/modules/FindOrganizationBlock/FindOrganizationBlock';
import { ErrorComponentWorker } from '@/app/modules/models/errorComponentWorker';
import { addPeopleErrorsArr } from '@/app/(storage)/errorsStorage/errorsAddPeople';
import { setAddCarErrorsArr } from '@/app/(storage)/errorsStorage/errorsAddCar';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';

export default function AddPeople() {
    
    enum personType {
        physical, juridical, companyDriver
    }
    
    const [activeCategory, setActiveCategory] = useState<string[]>([])
    const [person, setPerson] = useState<personType>(personType.physical)

    const FieldsWorkerObject = new FieldsWorker(addPeopleErrorsArr, setAddCarErrorsArr)

    const fieldsPhysialPerson: PersonFieldType[] = [
        { title: "Автомобили во владении", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true },
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Organization_place_street"},
        { title: "Дом", errorMessage: "Укажите дом", name: "Organization_place_house", validate: /\S/},
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Organization_place_room", validate: /\S/},
        { title: "Имя владельца", errorMessage: "Укажите имя", name: "OwnerName", validate: /\S/},
        { title: "Номер телефона владельца", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "Ownerphonenumber", validate: /^((\+7)|(8))\d{10}$/},
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "PassportSeries", validate: /^\d{4}$/},
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "PassportNumber", validate: /^\d{6}$/},
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "WhoPassportGived", validate: /\S/},
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "DatePassportGived", date:true, validate: /\S/},
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "DriverlicenseNumber", validate: /\S/},
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "DriverlicenseGivedData", validate: /^\d{10}$/, date: true},
        { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: ["A", "B", "C", "D", "E", "М"] }
    ]

    const fieldsJuridicalPerson: PersonFieldType[] = [
        { title: "Автомобили во владении организации", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true },
        { title: "Улица", errorMessage: "Укажите улицу нахождения организации", name: "Organization_place_street" },
        { title: "Дом", errorMessage: "Укажите дом", name: "Organization_place_house" },
        { title: "Квартира/Офис", errorMessage: "Укажите квартиру/номер офиса", name: "Organization_place_room" },
        { title: "Название организации", errorMessage: "Укажите название организации", name: "Organization_name" },
        { title: "ФИО директора организации", errorMessage: "Укажите имя директора", name: "DirectorName" },
        { title: "Номер телефона директора организации", errorMessage: "Укажите номер телефона директора в формате +X XXX XXX XX XX", name: "Directorphonenumber" },
    ]
    const fieldsCompanyDriver: PersonFieldType[] = [
        { title: "Водитель в организации", errorMessage: "Укажите орагинизацию", name: "WhereWork", findOrganizationNeed: true },
        { title: "Имя владельца", errorMessage: "", name: "OwnerName" },
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Organization_place_street"},
        { title: "Дом", errorMessage: "Укажите дом", name: "Organization_place_house", validate: /\S/},
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Organization_place_room", validate: /\S/},
        { title: "Номер телефона", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "Ownerphonenumber", validate: /^((\+7)|(8))\d{10}$/},
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "PassportSeries" },
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "PassportNumber" },
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "WhoPassportGived" },
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "DatePassportGived", date: true},
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "DriverlicenseNumber" },
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "DriverlicenseGivedData", date: true},
        { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: ["A", "B", "C", "D", "E", "М"] }
    ]

    const [personChoosenCars, setPersonChoosenCars] = useState<CarItemFindCarType[]>([])
    const [personChoosenOrganization, setPersonChoosenOrganization] = useState<OrganizationItemFindOrgType>()

    // const fieldsBlockTemplate = (elem: PersonFieldType) => {
    //     const [isFindCarOpen, setIsFindCarOpen] = useState(false)
    //     const [isFindOrgOpen, setIsFindOrgOpen] = useState(false)

    //     return (
    //         <div className={style.field}>
    //             {elem.findCarNeed ? personChoosenCars.map((car) => (
    //                 <div>
    //                     <p>{car.brand}</p>
    //                     <p>{car.model}</p>
    //                 </div>
    //             )) : elem.findOrganizationNeed?
    //             <div>
    //                 <p>{personChoosenOrganization?.organization_name}</p>
    //             </div>:null}
    //             {
    //                 elem.findCarNeed ? findCarDiv(setIsFindCarOpen) : elem.findOrganizationNeed? findOrganizationDiv(setIsFindOrgOpen):
    //                     elem.categories ? CatigoriesBlock(elem.categories) : <Field name={elem.name} className={style.input} />
    //             }
    //             <div className={style.addcarWindow_container}>
    //                 {isFindCarOpen ? <FindCarBlock closeWindow={() => { setIsFindCarOpen(false) }} setChoosenItem={(item: CarItemFindCarType) => setPersonChoosenCars((prevState) => [...prevState, item])} /> : null}
    //                 {isFindOrgOpen ? <FindOrganizationBlock closeWindow={() => { setIsFindOrgOpen(false) }} setChoosenItem={(item: OrganizationItemFindOrgType) => setPersonChoosenOrganization(item)} /> : null} 
    //             </div>
    //         </div>
    //     )
    // }

    const sendRequest = (values: any) => {
        switch (person) {
            case personType.physical: {
                const chosenCarsId = personChoosenCars.map((item: CarItemFindCarType) => item.id)
                const categories = activeCategory.join(' ')
                AddPeoplePhys(chosenCarsId, values.Email, values.OwnerName, values.Ownerphonenumber, parseInt(values.PassportSeries),
                    parseInt(values.PassportNumber), values.WhoPassportGived, values.DatePassportGived, parseInt(values.DriverlicenseNumber),
                    values.DriverlicenseGivedData, categories)
            }
            case personType.juridical: {

            }
        }
    }

    const changePeopleType = (personType: personType, reset?: ()=>void) => {
        setPerson(personType)
        setActiveCategory([])
        setPersonChoosenCars([])
        reset?reset():null
    }
    
    const fieldsPhysRender = FieldsWorkerObject.renderPeopleFilds(fieldsPhysialPerson, { chosenCarsArr: personChoosenCars })
    const fieldsJurRender = FieldsWorkerObject.renderPeopleFilds(fieldsJuridicalPerson,)
    const fieldsDriverRender = FieldsWorkerObject.renderPeopleFilds(fieldsCompanyDriver, { choosenOrganization: personChoosenOrganization })

    // const fieldsDriverRender = fieldsCompanyDriver.map(fieldsBlockTemplate)
    // const fieldsPhysRender = fieldsPhysialPerson.map(fieldsBlockTemplate)
    // const fieldsJurRender = fieldsJuridicalPerson.map(fieldsBlockTemplate)

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
                            OwnCar: '', Email: '', OwnerName: '', Ownerphonenumber: '', PassportSeries: '',
                            PassportNumber: '', WhoPassportGived: '', DatePassportGived: '', DriverlicenseNumber: '',
                            DriverlicenseGivedData: '', Organization_address: '', Organization_name: '', DirectorName: '',
                            Directorphonenumber: ''
                        }}
                        onSubmit={async (values) => {
                                switch(person){
                                    case personType.physical: {
                                        fieldsPhysialPerson.forEach((field)=>{
                                            if(field.validate){}
                                                // validator(field.validate, field.name, changeError, values[`${field.name}`])
                                        })
                                    }
                                    case personType.juridical: {
                                        
                                    }
                                    case personType.companyDriver: {
                                        
                                    }
                                }
                            }
                        }
                    >
                        {({ resetForm, errors }) => (
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