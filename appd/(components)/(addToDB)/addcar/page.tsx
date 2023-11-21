import React from 'react';
import style from './addcar.module.scss'
import { RegCar } from '@/app/modules/apiservice';
import { Formik } from '@/node_modules/formik';

type PropsType = {
    closeWindow: any
}

function AddCar(props: PropsType) {
    const fields = [
        {title: "Гос. номер", name: "StateNumber"},
        {title: "Номер региона", name: "RegionNumber"},
        {title: "Марка авто", name: "Mark"},
        {title: "Модель авто", name: "CarModel"},
        {title: "Номер кузова", name: "BodyNumber"},
        {title: "Номер шасси", name: "ChassisNumber"},
        {title: "Номер двигателя", name: "EngineNumber"},
        {title: "Модель кузова", name: "BodyModel"},
        {title: "Цвет автомобиля", name: "Color"},
        {title: "Объем двигателя", name: "EngineCapacity"},
        {title: "Мощность двигателя", name: "EnginePower"},
        {title: "Расположение руля", name: "WheelLocation"},
        {title: "Привод", name: "WheelDrive"},
        {title: "Год выпуска", name: "YearManufactured"},
        {title: "Дата постановки на учет", name: "DateRegistration"},
        {title: "Номер талона ТО", name: "InspectionTicketId"},
        {title: "Дата выдачи талона ТО", name: "DateTicketGived"},
        {title: "Налог на авто за год", name: "CarTaxPerYear"},
    ]

    const fieldsRender = fields.map((elem)=>(
        <div className={style.field}>
            <p className={style.field_title}>{elem.title}</p>
            {/* <Field name={elem.name} className={style.input} /> */}
        </div>
    ))

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Зарегистрировать автомобиль</h1>
            {/* <Formik 
                initialValues={{ StateNumber: '', RegionNumber: '', Mark: '', CarModel: '', BodyNumber: '', ChassisNumber: '',
                EngineNumber: '', BodyModel: '',Color: '', EngineCapacity: '', EnginePower: '', WheelLocation: '', WheelDrive: '',
                YearManufactured: '', DateRegistration: '', InspectionTicketId: '', DateTicketGived: '', CarTaxPerYear:'' }}
                onSubmit={values => {
                    // router.push('/auth')
                    console.log('11')
                    // RegCar(values.StateNumber, parseInt(values.RegionNumber), values.Mark, values.CarModel, parseInt(values.BodyNumber), parseInt(values.ChassisNumber),
                    // parseInt(values.EngineNumber), values.BodyModel, values.Color, parseInt(values.EngineCapacity), parseInt(values.EnginePower), values.WheelLocation, values.WheelDrive,
                    // values.YearManufactured, values.DateRegistration, parseInt(values.InspectionTicketId), parseInt(values.DateTicketGived), parseInt(values.CarTaxPerYear))
                }}>
                {(handleSubmit) => (
                    
                    <form className={style.fields_container}>
                        {fieldsRender}
                        
                        <button type="submit" className={style.submitButton}>Добавить новое авто</button>
                    </form>
                )}
            </Formik> */}
            <Formik 
                initialValues={{ email:''}}
                onSubmit={values => {
                    console.log('11')
                    // RegCar(values.StateNumber, parseInt(values.RegionNumber), values.Mark, values.CarModel, parseInt(values.BodyNumber), parseInt(values.ChassisNumber),
                    // parseInt(values.EngineNumber), values.BodyModel, values.Color, parseInt(values.EngineCapacity), parseInt(values.EnginePower), values.WheelLocation, values.WheelDrive,
                    // values.YearManufactured, values.DateRegistration, parseInt(values.InspectionTicketId), parseInt(values.DateTicketGived), parseInt(values.CarTaxPerYear))
                }}
            >
                {(handleSubmit) => (
                    <Form className={style.fields_container}>
                        <input type="submit" className={style.submitButton} value={'Добавить новое авто'}/>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddCar;