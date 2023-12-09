'use client'
import style from './addcar.module.scss';
import { Formik, Form, Field } from 'formik';
import { validator } from '@/app/modules/validator';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Brands } from '@/app/(storage)/brandsdata';
import { useRouter } from 'next/navigation';
import { Models, setModels } from '@/app/(storage)/modelsdata';
import { BodyModels } from '@/app/(storage)/bodymodelsdata';
import { DataFetcher } from '@/app/modules/classes';
import { RegCar } from '@/app/modules/apiservice';

export default function AddCar() {

    const router = useRouter()
    const selectRef = useRef(null);
    const DataFetcherObject = new DataFetcher()

    const [fieldsErrors, setFieldsErrors] = useState<string[]>([])

    //@ts-ignore
    // window.fl = fieldsErrors


    useEffect(()=>{
        (async()=>{
            // initialize lists
            if(!Brands) await DataFetcherObject.getBrands()

            else{
                if(Brands[0]!=='---')
                    await DataFetcherObject.getModels(Brands[0])
            }

            if(!BodyModels) await DataFetcherObject.getBodyModels()
            //

        })()
    },[])

    const changeBrand = async () => {
        if(selectRef.current&&selectRef.current['value'] !== '---')
            await DataFetcherObject.getModels(selectRef.current['value'])
        else if(selectRef.current&&selectRef.current['value'] === '---'){
            setModels([])
            router.refresh()
        }
    
    }

    const fields = [
        {title: "Гос. номер", name: "StateNumber", validate: /(^[АВЕКМНОРСТУХ][0-9][0-9][0-9][АВЕКМНОРСТУХ][АВЕКМНОРСТУХ]$|^[АВЕКМНОРСТУХ][0-9][0-9][0-9]$|^[0-9][0-9][0-9][0-9][АВЕКМНОРСТУХ][АВЕКМНОРСТУХ]$|^[АВЕКМНОРСТУХ][АВЕКМНОРСТУХ][0-9][0-9][0-9]$)/},
        {title: "Номер региона", name: "RegionNumber", validate: /^([1-9][0-9][0-9]|0[1-9]|[1-9][0-9])$/},
        {title: "Марка авто", name: "Brand", list: Brands, isBrands: true},
        {title: "Модель авто", name: "CarModel", list: Models, validate: /^(?!---|\s)(\S)/},
        {title: "Номер кузова VIN", name: "BodyNumber", validate: /\S/},
        {title: "Номер шасси", name: "ChassisNumber", validate: /\S/},
        {title: "Номер двигателя", name: "EngineNumber", validate: /\S/},
        {title: "Модель кузова", name: "BodyModel", list: BodyModels, validate: /^(?!---|\s)(\S)/},
        {title: "Цвет автомобиля", name: "Color", validate: /\S/},
        {title: "Объем двигателя", name: "EngineCapacity", validate: /\d/},
        {title: "Мощность двигателя", name: "EnginePower", validate: /\d/},
        {title: "Расположение руля", name: "WheelLocation", list: ["---", "Левый", "Правый"], validate: /^(?!---|\s)(\S)/},
        {title: "Привод", name: "WheelDrive", list: ["---", "Передний", "Задний", "Полный"], validate: /^(?!---|\s)(\S)/},
        {title: "Год выпуска", name: "YearManufactured", validate: /^([1][789][0-9][0-9]|[2][0][0-2][0-4])$/},
        {title: "Дата постановки на учет", name: "DateRegistration", date: true, validate: /./},
        {title: "Годовой налог на авто", name: "CarTaxPerYear", validate: /\d/}   
    ]

    // {title: "Номер талона ТО", name: "InspectionTicketId"},
    // {title: "Дата выдачи талона ТО", name: "DateTicketGived", date: true, validate: /./},
    

    function renderErrors(elemName: string){
        if(fieldsErrors.includes(elemName)){
            return <p className={style.error}>Ошибка</p>
        }
    }
    
    async function changeError(errorName:string, removeError: boolean = false){
        if(!removeError){
            const newState = fieldsErrors
            if(!newState.includes(errorName))
                newState.push(errorName)
            setFieldsErrors(newState)
            router.refresh()
        }
        else{
            setFieldsErrors(await [...fieldsErrors.filter(err=>err!==errorName)])
        }
            
    }

    const fieldsRender = fields.map((elem)=>(
        <div className={style.field} key={elem.name}>
            <p className={style.field_title}>{elem.title}</p>
            {
                elem.list?
                    elem.isBrands?
                    <select name="" id="" ref={selectRef} onChange={changeBrand}>
                        {elem.list.map((element)=>(
                            <option value={element} key={element}>{element}</option>
                        ))}
                    </select>
                    :
                    <Field as="select" name={elem.name}>{elem.list.map((element)=>(
                        <option value={element} key={element}>{element}</option>
                    ))}</Field>
                :elem.date?
                <Field type="date" name={elem.name} className={style.input}/>
                :<Field name={elem.name} className={style.input}/>
            }
            {
                renderErrors(elem.name)
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
                        initialValues={{ StateNumber: 'О213ЕА', RegionNumber: '54', Brand: '', CarModel: '', BodyNumber: '1', ChassisNumber: '1',
                        EngineNumber: '1', BodyModel: '',Color: 'Серый', EngineCapacity: '1', EnginePower: '1', WheelLocation: '', WheelDrive: '',
                        YearManufactured: '1965', DateRegistration: '', InspectionTicketId: '12', DateTicketGived: '12', CarTaxPerYear: '400' }}
                        onSubmit={(values:any) => {
                            fields.forEach((field)=>{
                                if(field.validate)
                                    validator(field.validate, field.name, changeError,values[`${field.name}`])
                            })
                            if(fieldsErrors.length === 0){
                                RegCar(values.StateNumber, parseInt(values.RegionNumber), values.CarModel, parseInt(values.BodyNumber), parseInt(values.ChassisNumber),
                                parseInt(values.EngineNumber), values.BodyModel, values.Color, parseInt(values.EngineCapacity), parseInt(values.EnginePower), values.WheelLocation, values.WheelDrive,
                                values.YearManufactured, values.DateRegistration, parseInt(values.CarTaxPerYear))
                            }
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