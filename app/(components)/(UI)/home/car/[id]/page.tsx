'use client'
import { RenderData } from '@/app/modules/models/renderData';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { setChosenData, setInspectionData } from '@/app/(storage)/reducers/showDataReducer';
import { ChangeDataCars, ChangeDataInspection, GetCurrentInspection, deleteCar, getCurrCar } from '@/app/modules/apiservice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditFieldsWorker } from '@/app/modules/models/editFieldsWorker';
import { setAddCarErrors } from '@/app/(storage)/reducers/errorsReducer';
import { setModels } from '@/app/(storage)/reducers/listsReducer';
import { Formik, Form, FormikValues } from 'formik';
import { InspectorItemFindOrgType } from '@/app/types/types';


export default function ShowInfoBlock({ params: { id } }: any) {

    const activeData: any = useSelector((state: RootState) => state.showData.chosenCarData)
    const activeInspData: any = useSelector((state: RootState) => state.showData.InspectorData)
    const { errorArr, BodyModels } = useSelector((state:RootState)=>({ 
        errorArr: state.errors.AddCarPage, 
        BodyModels: state.lists.BodyModels,
    }))

    const RenderWorker = new RenderData()
    const EditWorker = new EditFieldsWorker(errorArr, setAddCarErrors)

    const dispatch = useDispatch()
    const router = useRouter();

    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)

    const [chosenInspector, setChosenInspector] = useState<InspectorItemFindOrgType|null>(null)

    useEffect(() => {
        (async () => {
            const data = await getCurrCar(id).then(res => res.data)
            dispatch(setChosenData(data))
            const inspectionData = await GetCurrentInspection(id).then(res => res.data)
            dispatch(setInspectionData(inspectionData))
            setChosenInspector({id: inspectionData.inspector_id, name: inspectionData.inspector_name})
        })()
    }, [])

    const fields = [
        { title: "Гос. номер", name: "StateNumber", errorMessage: "Гос номер должен удовлетворять шаблону Е555ЕЕ", value: activeData?.state_number },
        { title: "Номер региона", name: "RegionNumber", errorMessage: "Номер должен содержать номер региона", value: activeData?.region_number },
        { title: "Марка авто", name: "Brand", errorMessage: "Выберите марку авто", value: activeData?.brand },
        { title: "Модель авто", name: "CarModel", errorMessage: "Выберите модель авто", value: activeData?.models },
        { title: "Номер кузова VIN", name: "BodyNumber", errorMessage: "Укажите VIN", value: activeData?.body_number },
        { title: "Номер шасси", name: "ChassisNumber", errorMessage: "Укажите шасси", value: activeData?.chassis_number },
        { title: "Номер двигателя", name: "EngineNumber", errorMessage: "Укажите номер двигателя", value: activeData?.engine_number },
        { title: "Модель кузова", name: "BodyModel", errorMessage: "Выберите модель кузова", value: activeData?.body_model },
        { title: "Цвет автомобиля", name: "Color", errorMessage: "Укажите цвет авто", value: activeData?.color },
        { title: "Объем двигателя", name: "EngineCapacity", errorMessage: "Укажите объем двигателя", value: activeData?.engine_capacity },
        { title: "Мощность двигателя", name: "EnginePower", errorMessage: "Укажите мощность двигателя", value: activeData?.engine_power },
        { title: "Расположение руля", name: "WheelLocation", errorMessage: "Выберите расположения руля", value: activeData?.wheel_location },
        { title: "Привод", name: "WheelDrive", errorMessage: "Выберите привод авто", value: activeData?.wheel_drive },
        { title: "Год выпуска", name: "YearManufactured", errorMessage: "Укажите год выпуска", value: activeData?.year_manufactured },
        { title: "Дата постановки на учет", name: "DateRegistration", errorMessage: "Укажите дату постановки на учет", value: activeData?.date_registration },
        { title: "Годовой налог на авто", name: "CarTaxPerYear", errorMessage: "Укажите налог на авто", value: activeData?.car_tax_per_year },

        { title: "Дата выдачи технического осмотра", name: "DateInspectionTicketGived", errorMessage: "Укажите дату прохождения ТО", value: activeInspData?.date_inssue},
        { title: "Инспектор проводивший ТО", errorMessage: "Инспектор проводивший ТО", name: "Inspector", value: activeInspData?.inspector_name},
        { title: "Пробег", errorMessage: "Укажите пробег авто", name: "Mileage", value: activeInspData?.mileage},
        { title: "Размер оплаты ТО", errorMessage: "Укажите размер оплаты ТО", name: "PaymentAmount", value: activeInspData?.payment_amount},
        { title: "Размер оплаты за знак ТО", errorMessage: "Укажите размер оплаты за знак ТО", name: "PaymentTIAmount", value: activeInspData?.payment_technical_inspection_ticket_gived}
    ]

    const editFieldsCars = [
        {title: "Гос. номер", name: "state_number", errorMessage: "Гос номер должен удовлетворять шаблону Е555ЕЕ", validate: /(^[АВЕКМНОРСТУХ][0-9][0-9][0-9][АВЕКМНОРСТУХ][АВЕКМНОРСТУХ]$|^[АВЕКМНОРСТУХ][0-9][0-9][0-9]$|^[0-9][0-9][0-9][0-9][АВЕКМНОРСТУХ][АВЕКМНОРСТУХ]$|^[АВЕКМНОРСТУХ][АВЕКМНОРСТУХ][0-9][0-9][0-9]$)/, value: activeData?.state_number},
        {title: "Номер региона", name: "region_number", errorMessage: "Номер должен содержать номер региона", validate: /^([1-9][0-9][0-9]|0[1-9]|[1-9][0-9])$/, value: activeData?.region_number },
        {title: "Номер кузова VIN", name: "body_number", errorMessage: "Укажите VIN", validate: /\S/,  value: activeData?.body_number},
        {title: "Номер шасси", name: "chassis_number", errorMessage: "Укажите шасси", validate: /\S/, value: activeData?.chassis_number},
        {title: "Номер двигателя", name: "engine_number", errorMessage: "Укажите номер двигателя", validate: /\S/, value: activeData?.engine_number},
        {title: "Модель кузова", name: "body_model", errorMessage: "Выберите модель кузова", list: BodyModels, validate: /^(?!---|\s)(\S)/, value: activeData?.body_model},
        {title: "Цвет автомобиля", name: "color", errorMessage: "Укажите цвет авто", validate: /\S/, value: activeData?.color},
        {title: "Объем двигателя", name: "engine_capacity", errorMessage: "Укажите объем двигателя", validate: /\d/, value: activeData?.engine_capacity},
        {title: "Мощность двигателя", name: "engine_power", errorMessage: "Укажите мощность двигателя", validate: /\d/, value: activeData?.engine_power},
        {title: "Расположение руля", name: "wheel_location", errorMessage: "Выберите расположения руля", list: ["---", "Левый", "Правый"], validate: /^(?!---|\s)(\S)/, value: activeData?.wheel_location},
        {title: "Привод", name: "wheel_drive", errorMessage: "Выберите привод авто", list: ["---", "Передний", "Задний", "Полный"], validate: /^(?!---|\s)(\S)/, value: activeData?.wheel_drive},
        {title: "Год выпуска", name: "year_manufactured", errorMessage: "Укажите год выпуска", validate: /^([1][789][0-9][0-9]|[2][0][0][0-9]|[2][0][1][0-9]|[2][0][2][0-4])$/, value: activeData?.year_manufactured},
        {title: "Дата постановки на учет", name: "date_registration", errorMessage: "Укажите дату постановки на учет", date: true, validate: /./, value: activeData?.date_registration},
        {title: "Годовой налог на авто", name: "car_tax_per_year", errorMessage: "Укажите налог на авто", validate: /\d/, value: activeData?.car_tax_per_year}, 
    ]

    const editFieldsInspect = [
        { title: "Дата выдачи технического осмотра",  errorMessage: "Укажите дату прохождения ТО", name: "date_inssue", date: true, validate: /./, value: activeInspData?.date_inssue},
        { title: "Инспектор проводивший ТО", errorMessage: "Инспектор проводивший ТО", name: "inspector_id", findInspectorNeed: true, elementController: {need: true, controller: chosenInspector}, value: activeInspData?.inspector_name },
        { title: "Пробег", errorMessage: "Укажите пробег авто", name: "mileage", validate: /\d/, value: activeInspData?.mileage},
        { title: "Размер оплаты ТО", errorMessage: "Укажите размер оплаты ТО", name: "payment_amount", validate: /\d/, value: activeInspData?.payment_amount},
        { title: "Размер оплаты за знак ТО", errorMessage: "Укажите размер оплаты за знак ТО", name: "payment_technical_inspection_ticket_gived", validate: /\d/, value: activeInspData?.payment_technical_inspection_ticket_gived}
    ]
    
    

    const deleteData = async () => {
        setIsSendDataButtonDisabled(true)
        await deleteCar(id).then(()=>{
            setIsSendDataButtonDisabled(false)
        })
        router.refresh()
        router.push('/home')
    }

    const trySendRequest = (values: FormikValues) => {
        // EditWorker.validate(editFields, values)
        EditWorker.sendRequest(()=>{
            editFieldsCars.forEach(async (field)=>{
                if(field.value != values[`${field.name}`]){
                    setIsSendDataButtonDisabled(true)
                    await ChangeDataCars(field.name, values[`${field.name}`], id).then(()=>{
                        setIsSendDataButtonDisabled(false)
                        router.push('/home')
                        setEditMode(false)
                    })
                }
            })
            editFieldsInspect.forEach(async (field)=>{
                if((chosenInspector?.id !== activeInspData.inspector_id)&&field.findInspectorNeed){
                    setIsSendDataButtonDisabled(true)
                    await ChangeDataInspection(field.name, chosenInspector?.id, id).then(()=>{
                        setIsSendDataButtonDisabled(false)
                        router.push('/home')
                        setEditMode(false)
                    })
                }
                if((field.value != values[`${field.name}`])&&!field.findInspectorNeed){
                    await ChangeDataInspection(field.name, values[`${field.name}`], id).then(()=>{
                        setIsSendDataButtonDisabled(false)
                        router.push('/home')
                        setEditMode(false)
                    })
                }
            })
        })
    }

    const fieldsFormikComponent = () => {
        return(
            <div className={style.formikPrev}>
                <Formik
                        initialValues={{ state_number: activeData?.state_number, region_number: activeData?.region_number, body_number: activeData?.body_number, chassis_number: activeData?.chassis_number,
                        engine_number: activeData?.engine_number, body_model: activeData?.body_model, color: activeData?.color, engine_capacity: activeData?.engine_capacity, engine_power: activeData?.engine_power, wheel_location: activeData?.wheel_location, wheel_drive: activeData?.wheel_drive,
                        year_manufactured: activeData?.year_manufactured, date_registration: activeData?.date_registration, car_tax_per_year: activeData?.car_tax_per_year, date_inssue: activeInspData?.date_inssue,
                        mileage: activeInspData?.mileage, payment_amount: activeInspData?.payment_amount,  payment_technical_inspection_ticket_gived: activeInspData?.payment_technical_inspection_ticket_gived }}
                        onSubmit={(values: FormikValues) => trySendRequest(values)}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.fields_container}>
                                    {EditWorker.renderCarsFields(editFieldsCars)}
                                    {EditWorker.renderCarsFields(editFieldsInspect, {chosenInspector: chosenInspector, setChosenInspector: setChosenInspector})}
                                </div>
                                <button className={style.button} type="submit" disabled={isSendDataButtonDisabled}>Применить изменения</button>
                            </Form>
                        )}
                    </Formik>
            </div>
        )
    }

    return (
        <>
            <div className={style.funс_block}>
                <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
                <button className={style.delete_button} disabled={isSendDataButtonDisabled} onClick={()=>deleteData()}>Удалить</button>
                <button className={style.red_button} onClick={()=>{editMode?setEditMode(false):setEditMode(true)}}>{editMode?'Отменить':'Редактировать'}</button>
            </div>
            {editMode&&fieldsFormikComponent()}
            <div className={style.fields_container}>
                {!editMode&&RenderWorker.renderCarsData(fields)}
            </div>
        </>

    );
}

