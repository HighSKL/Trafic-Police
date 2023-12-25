'use client'
import Link from 'next/link';
import style from './addcar.module.scss';
import { useRouter } from 'next/navigation';
import { FieldCar } from '@/app/types/types';
import { RegCar } from '@/app/modules/apiservice';
import { RootState } from '@/app/(storage)/store';
import { Formik, Form, FormikValues } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataFetcher } from '@/app/modules/models/dataFetcher';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { setModels } from '@/app/(storage)/reducers/listsReducer';
import { setAddCarErrors } from '@/app/(storage)/reducers/errorsReducer';

export default function AddCar() {

    const router = useRouter()
    const selectRef = useRef(null);
    const DataFetcherObject = new DataFetcher()

    const { errorArr, BodyModels, Brands, Models } = useSelector((state:RootState)=>({ 
        errorArr: state.errors.AddCarPage, 
        BodyModels: state.lists.BodyModels,
        Brands: state.lists.Brands,
        Models: state.lists.Models
    }))

    const dispatch = useDispatch();

    const FieldsWorkerObject = new FieldsWorker(errorArr, setAddCarErrors)

    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)

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
            dispatch(setModels([]))
            router.refresh()
        }
    }

    const fields: FieldCar[] = [
        {title: "Гос. номер", name: "StateNumber", errorMessage: "Гос номер должен удовлетворять шаблону Е555ЕЕ", validate: /(^[АВЕКМНОРСТУХ][0-9][0-9][0-9][АВЕКМНОРСТУХ][АВЕКМНОРСТУХ]$|^[АВЕКМНОРСТУХ][0-9][0-9][0-9]$|^[0-9][0-9][0-9][0-9][АВЕКМНОРСТУХ][АВЕКМНОРСТУХ]$|^[АВЕКМНОРСТУХ][АВЕКМНОРСТУХ][0-9][0-9][0-9]$)/},
        {title: "Номер региона", name: "RegionNumber", errorMessage: "Номер должен содержать номер региона", validate: /^([1-9][0-9][0-9]|0[1-9]|[1-9][0-9])$/},
        {title: "Марка авто", name: "Brand", errorMessage: "Выберите марку авто", list: Brands, isBrands: true, changeFieldFunc: changeBrand},
        {title: "Модель авто", name: "CarModel", errorMessage: "Выберите модель авто", list: Models, validate: /^(?!---|\s)(\S)/},
        {title: "Номер кузова VIN", name: "BodyNumber", errorMessage: "Укажите VIN", validate: /\S/},
        {title: "Номер шасси", name: "ChassisNumber", errorMessage: "Укажите шасси", validate: /\S/},
        {title: "Номер двигателя", name: "EngineNumber", errorMessage: "Укажите номер двигателя", validate: /\S/},
        {title: "Модель кузова", name: "BodyModel", errorMessage: "Выберите модель кузова", list: BodyModels, validate: /^(?!---|\s)(\S)/},
        {title: "Цвет автомобиля", name: "Color", errorMessage: "Укажите цвет авто", validate: /\S/},
        {title: "Объем двигателя", name: "EngineCapacity", errorMessage: "Укажите объем двигателя", validate: /\d/},
        {title: "Мощность двигателя", name: "EnginePower", errorMessage: "Укажите мощность двигателя", validate: /\d/},
        {title: "Расположение руля", name: "WheelLocation", errorMessage: "Выберите расположения руля", list: ["---", "Левый", "Правый"], validate: /^(?!---|\s)(\S)/},
        {title: "Привод", name: "WheelDrive", errorMessage: "Выберите привод авто", list: ["---", "Передний", "Задний", "Полный"], validate: /^(?!---|\s)(\S)/},
        {title: "Год выпуска", name: "YearManufactured", errorMessage: "Укажите год выпуска", validate: /^([1][789][0-9][0-9]|[2][0][0][0-9]|[2][0][1][0-9]|[2][0][2][0-4])$/},
        {title: "Дата постановки на учет", name: "DateRegistration", errorMessage: "Укажите дату постановки на учет", date: true, validate: /./},
        {title: "Годовой налог на авто", name: "CarTaxPerYear", errorMessage: "Укажите налог на авто", validate: /\d/}   
    ]

    const fieldsRender = FieldsWorkerObject.renderCarsFields(fields, { ref: selectRef})

    const trySendRequest = (values: FormikValues, resetForm: any) => {
        FieldsWorkerObject.validate(fields, values)

        FieldsWorkerObject.sendRequest(()=>{
            setIsSendDataButtonDisabled(true)
            RegCar(values.StateNumber, parseInt(values.RegionNumber), values.CarModel, parseInt(values.BodyNumber), parseInt(values.ChassisNumber),
            parseInt(values.EngineNumber), values.BodyModel, values.Color, parseInt(values.EngineCapacity), parseInt(values.EnginePower), values.WheelLocation, values.WheelDrive,
            values.YearManufactured, values.DateRegistration, parseInt(values.CarTaxPerYear)).then(()=>{
                setIsSendDataButtonDisabled(false)
                resetForm()
            })
        })
    }

    return (
        <div className={style.wrapper}>
            <div className={style.form_window}>
                <div className={style.form_container}>
                    <div className={style.funс_block}>
                        <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
                    </div>
                    <h1 className={style.title}>Добавить авто</h1>
                    <Formik
                        initialValues={{ StateNumber: '', RegionNumber: '', Brand: '', CarModel: '', BodyNumber: '', ChassisNumber: '',
                        EngineNumber: '', BodyModel: '',Color: '', EngineCapacity: '', EnginePower: '', WheelLocation: '', WheelDrive: '',
                        YearManufactured: '', DateRegistration: '', InspectionTicketId: '', DateTicketGived: '', CarTaxPerYear: '' }}
                        onSubmit={(values: FormikValues, { resetForm }) => trySendRequest(values, resetForm)}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.fields_container}>
                                    {fieldsRender}
                                </div>
                                <button className={style.button} type="submit" disabled={isSendDataButtonDisabled}>Добавить</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}