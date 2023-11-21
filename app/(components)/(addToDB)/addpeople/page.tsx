"use client"
import React, { useState } from 'react';
import { Form, Formik, Field } from "formik";
import style from './addpeople.module.scss'
import Link from 'next/link';
import FindCarBlock from '@/app/modules/FindCarBlock/FindCarBlock';
import { CarItemFindCarType, PersonFieldType } from '@/app/types/types';



// insert into test values(ARRAY[3,2,1])

export default function AddPeople() {
    enum personType {
        physical, juridical
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
        { title: "Категории", name: "Categories", categories: ["A", "B", "C", "D", "E", "М"]}
    ]
    const fieldsJuridicalPerson: Array<PersonFieldType> = [
        { title: "Автомобили во владении организации", name: "OwnCar", findCarNeed: true },
        { title: "Адрес организации", name: "Organization_address" },
        { title: "Название организации", name: "Organization_name" },
        { title: "ФИО директора организации", name: "DirectorName" },
        { title: "Номер телефона директора организации", name: "Directorphonenumber" },
    ]

    const [personChoosenCars, setPersonChoosenCars] = useState<Array<CarItemFindCarType>>([])

    const CatigoriesBlock = (catigories:Array<string>) => {
        return(
            <div className={style.cat_block}>
                {catigories.map((category:string)=>(
                    <p className={activeCategory.includes(category)?style.active_category:style.category} 
                        onClick={()=>activeCategory.includes(category)?
                            setActiveCategory((prevState)=>[...prevState.filter(elem=>elem != category)]):
                            setActiveCategory((prevState)=>[...prevState, category])}
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
                {elem.findCarNeed?personChoosenCars.map((car)=>(
                    <div>
                        <p>{car.brand}</p>
                        <p>{car.model}</p>
                    </div>
                )):null}
                {
                elem.findCarNeed?<div className={style.cars_container}><div onClick={()=>setIsFindCarOpen(true)} className={style.btn_add}>Добавить авто</div></div>:
                elem.categories?CatigoriesBlock(elem.categories):<Field name={elem.name} className={style.input}/>
                }
                <div className={style.addcarWindow_container}>
                    {isFindCarOpen ? <FindCarBlock closeWindow={()=>{setIsFindCarOpen(false)}} setChoosenItem={(item:CarItemFindCarType)=>setPersonChoosenCars((prevState)=>[...prevState, item])}/> : null}
                </div>
            </div>
        )
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
                    <h1 className={style.title}>Добавить лицо</h1>
                    <Formik
                        initialValues={{ StateNumber: '', }}
                        onSubmit={async (values) => {
                            if(person == personType.physical){
                                
                            }
                         }}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <Field type="checkbox" className={style.checkbox} onClick={() => { setPerson(personType.physical) }} checked={person === personType.physical} />
                                <Field type="checkbox" className={style.checkbox} onClick={() => { setPerson(personType.juridical) }} checked={person === personType.juridical} />
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