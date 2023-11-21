'use client'
import style from './addcar.module.scss';
import { Formik, Form, Field } from 'formik';
import { validator } from '@/app/modules/validator';
import Link from 'next/link';
import { RegCar } from '@/app/modules/apiservice';

export default function AddCar() {

    const fields = [
        {title: "Гос. номер", name: "StateNumber"},
        {title: "Номер региона", name: "RegionNumber"},
        {title: "Марка авто", name: "Mark", list: ['Audi', 'BMW', 'Cherry', 'Ford', 'Hammer', 'Hyundai', 'KIA', 'LADA', 'Lexus', 'Mercedes', 'Mitsubishi', 'Nissan', 'Porche', 'Renault', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen']},
        {title: "Модель авто", name: "CarModel"},
        {title: "Номер кузова", name: "BodyNumber"},
        {title: "Номер шасси", name: "ChassisNumber"},
        {title: "Номер двигателя", name: "EngineNumber"},
        {title: "Модель кузова", name: "BodyModel"},
        {title: "Цвет автомобиля", name: "Color"},
        {title: "Объем двигателя", name: "EngineCapacity"},
        {title: "Мощность двигателя", name: "EnginePower"},
        {title: "Расположение руля", name: "WheelLocation", list: ["Левый", "Правый"]},
        {title: "Привод", name: "WheelDrive", list: ["Передний", "Задний", "Полный"]},
        {title: "Год выпуска", name: "YearManufactured"},
        {title: "Дата постановки на учет", name: "DateRegistration"},
        {title: "Номер талона ТО", name: "InspectionTicketId"},
        {title: "Дата выдачи талона ТО", name: "DateTicketGived"},
        {title: "Налог на авто за год", name: "CarTaxPerYear"}
    ]

    const fieldsRender = fields.map((elem)=>(
        <div className={style.field}>
            <p className={style.field_title}>{elem.title}</p>
            {
                elem.list?<Field as="select" name={elem.name}>{elem.list.map((element)=>(
                    <option value={element}>{element}</option>
                ))}</Field>
                :<Field name={elem.name} className={style.input}/>
            }
            
        </div>
    ))

    return (
        <div className={style.wrapper}>
            <div className={style.form_window}>
                <div className={style.form_container}>
                    <div className={style.funс_block}>
                        <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
                    </div>
                    <h1 className={style.title}>Добавить авто</h1>
                    <Formik
                        initialValues={{ StateNumber: '', RegionNumber: '1', Mark: '', CarModel: '', BodyNumber: '1', ChassisNumber: '1',
                        EngineNumber: '1', BodyModel: '',Color: '', EngineCapacity: '1', EnginePower: '1', WheelLocation: '', WheelDrive: '',
                        YearManufactured: '', DateRegistration: '', InspectionTicketId: '12', DateTicketGived: '12', CarTaxPerYear: '400' }}
                        onSubmit={(values) => {
                            RegCar(values.StateNumber, parseInt(values.RegionNumber), values.Mark, values.CarModel, parseInt(values.BodyNumber), parseInt(values.ChassisNumber),
                                parseInt(values.EngineNumber), values.BodyModel, values.Color, parseInt(values.EngineCapacity), parseInt(values.EnginePower), values.WheelLocation, values.WheelDrive,
                                values.YearManufactured, values.DateRegistration, parseInt(values.InspectionTicketId), parseInt(values.DateTicketGived), parseInt(values.CarTaxPerYear))
                        }}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.fields_container}>
                                    {fieldsRender}
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