'use client'
import { RenderData } from '@/app/modules/models/renderData';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { setChosenData, setInspectionData, setPeopleData } from '@/app/(storage)/reducers/showDataReducer';
import { ChangeDataCars, ChangeDataInspection, ChangeDataPhys, ChangePeopleCarOwn, GetAllPeopleCars, GetCurrPeople, GetCurrentInspection, GetPeopleOwnCars, deleteCar, deletePeoplePhys, getCurrCar } from '@/app/modules/apiservice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditFieldsWorker } from '@/app/modules/models/editFieldsWorker';
import { setAddPeopleErrors } from '@/app/(storage)/reducers/errorsReducer';
import { setModels } from '@/app/(storage)/reducers/listsReducer';
import { Formik, Form, FormikValues } from 'formik';
import { CarItemFindCarType, InspectorItemFindOrgType } from '@/app/types/types';


export default function ShowInfoPeopleBlock({ params: { id } }: any) {

    const activeData: any = useSelector((state: RootState) => state.showData.PeopleData)
    const activeInspData: any = useSelector((state: RootState) => state.showData.InspectorData)
    const { errorArr, Streets } = useSelector((state:RootState)=>({ 
        errorArr: state.errors.AddPeoplePage, 
        Streets: state.lists.Streets,
    }))

    const RenderWorker = new RenderData()
    const EditWorker = new EditFieldsWorker(errorArr, setAddPeopleErrors)

    const dispatch = useDispatch()
    const router = useRouter();

    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)

    const [personChosenCars, setPersonChosenCars] = useState<CarItemFindCarType[]>([])

    useEffect(() => {
        (async () => {
            const peopleData = await GetCurrPeople(id).then(res => res.data)
            dispatch(setPeopleData(peopleData))
            const cars = await GetPeopleOwnCars(peopleData.id).then(res => res.data)
            setPersonChosenCars(cars)
        })()
    }, [])

    const fields = [
        { title: "Автомобили во владении", errorMessage: "Укажите автомобили во владении", name: "OwnCar", carsList: personChosenCars},
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Place_street", value: activeData.street_name},
        { title: "Дом", errorMessage: "Укажите дом", name: "Place_house", value: activeData.place_house},
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Place_room", value: activeData.place_room},
        { title: "Имя владельца", errorMessage: "Укажите имя", name: "OwnerName", value: activeData.owner_name},
        { title: "Номер телефона владельца", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "PhoneNumber", value: activeData.phone_number},
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "PassportSeries", value: activeData.passport_series},
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "PassportNumber", value: activeData.passport_number},
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "WhoPassportGived", value: activeData.who_passport_inssued},
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "DatePassportGived", value: activeData.data_passport_inssued},
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "DriverlicenseNumber", value: activeData.driver_lic_number},
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "DriverlicenseGivedData", value: activeData.driver_lic_date_inssued}
        // { title: "Категории", errorMessage: "Укажите категории", name: "Categories"}
    ]

    const editFieldsCars = [
        { title: "Автомобили во владении", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true, elementController: {need: true, controller: personChosenCars}, value: personChosenCars},
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "street_name", list: Streets, validate: /^(?!---|\s)(\S)/, value: activeData.street_name},
        { title: "Дом", errorMessage: "Укажите дом", name: "place_house", validate: /\S/, value: activeData.place_house},
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "place_room", validate: /\S/, value: activeData.place_room },
        { title: "Имя владельца", errorMessage: "Укажите имя", name: "owner_name", validate: /\S/, value: activeData.owner_name },
        { title: "Номер телефона владельца", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "phone_number", validate: /^((\+7)|(8))\d{10}$/ , value: activeData.phone_number},
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "passport_series", validate: /^\d{4}$/, value: activeData.passport_series },
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "passport_number", validate: /^\d{6}$/, value: activeData.passport_number },
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "who_passport_inssued", validate: /\S/, value: activeData.who_passport_inssued},
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "data_passport_inssued", date: true, validate: /\S/, value: activeData.data_passport_inssued},
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "driver_lic_number", validate: /^\d{10}$/, value: activeData.driver_lic_number},
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "driver_lic_date_inssued", validate: /\S/, date: true, value: activeData.driver_lic_date_inssued },
        // { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: Categories, elementController: {need: true, controller: activeCategory} }
    ]

    // const editFieldsInspect = [
    //     { title: "Инспектор проводивший ТО", errorMessage: "Инспектор проводивший ТО", name: "inspector_id", findInspectorNeed: true, elementController: {need: true, controller: chosenInspector}, value: activeInspData?.inspector_name },
    // ]
    
    

    const deleteData = async () => {
        setIsSendDataButtonDisabled(true)
        await deletePeoplePhys(id).then(()=>{
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
                    await ChangeDataPhys(field.name, values[`${field.name}`], id)
                    await ChangePeopleCarOwn(personChosenCars, id).then(()=>{
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
                        initialValues={{ street_name: activeData.street_name, place_house: activeData.place_house, place_room: activeData.place_room,
                        owner_name: activeData.owner_name, phone_number: activeData.phone_number, passport_series: activeData.passport_series,
                        passport_number: activeData.passport_number, who_passport_inssued: activeData.who_passport_inssued, data_passport_inssued: activeData.data_passport_inssued,
                        driver_lic_number: activeData.driver_lic_number, driver_lic_date_inssued: activeData.driver_lic_date_inssued }}
                        onSubmit={(values: FormikValues) => trySendRequest(values)}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.fields_container}>
                                    {EditWorker.renderPeopleFields(editFieldsCars, {chosenCarsArr: personChosenCars, setPersonChosenCars: setPersonChosenCars})}
                                    {/* {EditWorker.renderCarsFields(editFieldsInspect, {chosenInspector: chosenInspector, setChosenInspector: setChosenInspector})} */}
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
                {!editMode&&RenderWorker.renderPeoplesData(fields)}
            </div>
        </>

    );
}

