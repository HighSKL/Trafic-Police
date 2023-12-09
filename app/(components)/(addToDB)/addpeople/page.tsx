"use client"
import React, { useState } from 'react';
import { Form, Formik, Field } from "formik";
import style from './addpeople.module.scss'
import Link from 'next/link';
import FindCarBlock from '@/app/modules/FindCarBlock/FindCarBlock';
import { CarItemFindCarType, FormikAddPeopleType, PersonFieldType } from '@/app/types/types';
import { AddPeoplePhys } from '@/app/modules/apiservice';
import { validator } from '@/app/modules/validator';

export default function AddPeople() {
    enum personType {
        physical, juridical
    }

    let errors: FormikAddPeopleType = {
        Email: false
    }
    
    const [activeCategory, setActiveCategory] = useState<Array<string>>([])
    const [person, setPerson] = useState<personType>(personType.physical)

    const fieldsPhysialPerson: Array<PersonFieldType> = [
        { title: "Автомобили во владении", name: "OwnCar", findCarNeed: true },
        { title: "Электронная поча", name: "Email" },
        { title: "Имя владельца", name: "OwnerName" },
        { title: "Номер телефона владельца", name: "Ownerphonenumber" },
        { title: "Серия паспорта", name: "PassportSeries" },
        { title: "Номер паспорта", name: "PassportNumber" },
        { title: "Кем паспорт выдан", name: "WhoPassportGived" },
        { title: "Дата выдачи паспорта", name: "DatePassportGived" },
        { title: "Номер водительского удостоверения", name: "DriverlicenseNumber" },
        { title: "Дата выдачи водительского удостоверения", name: "DriverlicenseGivedData" },
        { title: "Категории", name: "Categories", categories: ["A", "B", "C", "D", "E", "М"] }
    ]
    const fieldsJuridicalPerson: Array<PersonFieldType> = [
        { title: "Автомобили во владении организации", name: "OwnCar", findCarNeed: true },
        { title: "Адрес организации", name: "Organization_address" },
        { title: "Название организации", name: "Organization_name" },
        { title: "ФИО директора организации", name: "DirectorName" },
        { title: "Номер телефона директора организации", name: "Directorphonenumber" },
    ]

    const [personChoosenCars, setPersonChoosenCars] = useState<Array<CarItemFindCarType>>([])

    const CatigoriesBlock = (catigories: Array<string>) => {
        return (
            <div className={style.cat_block}>
                {catigories.map((category: string) => (
                    <p className={activeCategory.includes(category) ? style.active_category : style.category}
                        onClick={() => activeCategory.includes(category) ?
                            setActiveCategory((prevState) => [...prevState.filter(elem => elem != category)]) :
                            setActiveCategory((prevState) => [...prevState, category])}
                    >
                        {category}</p>
                ))}
            </div>
        )
    }

    const fieldsBlockTemplate = (elem: PersonFieldType) => {
        const [isFindCarOpen, setIsFindCarOpen] = useState(false)

        return (
            <div className={style.field}>
                <p className={style.field_title}>{elem.title}</p>
                {errors.Email?<p>AAAA</p>:null}
                {elem.findCarNeed ? personChoosenCars.map((car) => (
                    <div>
                        <p>{car.brand}</p>
                        <p>{car.model}</p>
                    </div>
                )) : null}
                {
                    elem.findCarNeed ? <div className={style.cars_container}><div onClick={() => setIsFindCarOpen(true)} className={style.btn_add}>Добавить авто</div></div> :
                        elem.categories ? CatigoriesBlock(elem.categories) : <Field name={elem.name} className={style.input} />
                }
                <div className={style.addcarWindow_container}>
                    {isFindCarOpen ? <FindCarBlock closeWindow={() => { setIsFindCarOpen(false) }} setChoosenItem={(item: CarItemFindCarType) => setPersonChoosenCars((prevState) => [...prevState, item])} /> : null}
                </div>
            </div>
        )
    }

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


    const fieldsPhysRender = fieldsPhysialPerson.map(fieldsBlockTemplate)
    const fieldsJurRender = fieldsJuridicalPerson.map(fieldsBlockTemplate)

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
                        onSubmit={async values => {
                            // if(validator(/^\S+@\S+\.\S+$/, errorsType, values.Email, ))
                            // errors.Email = true;
                            // console.log(errors.Email)
                            // updateState([])
                            // if(errors.Email){
                            //     if(validator(/^\S+@\S+\.\S+$/, errors.Email, values.Email))
                                    
                            //         // console.log('1')
                            // }
                                    // sendRequest(values)
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
                                </div>
                                <div className={style.fields_container}>
                                    {person == personType.physical && fieldsPhysRender}
                                    {person == personType.juridical && fieldsJurRender}
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