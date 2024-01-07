'use client'
import { RenderData } from '@/app/modules/models/renderData';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { setChosenData, setInspectionData, setPeopleData } from '@/app/(storage)/reducers/showDataReducer';
import { ChangeDataCars, ChangeDataInspection, ChangeDataPhys, GetAllPeopleCars, GetCompanys, GetCurrCompanyDriver, GetCurrPeople, GetCurrentInspection, deleteCar, deletePeoplePhys, getCurrCar } from '@/app/modules/apiservice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditFieldsWorker } from '@/app/modules/models/editFieldsWorker';
import { setAddPeopleErrors } from '@/app/(storage)/reducers/errorsReducer';
import { setModels } from '@/app/(storage)/reducers/listsReducer';
import { Formik, Form, FormikValues } from 'formik';
import { CarItemFindCarType, InspectorItemFindOrgType, OrganizationItemFindOrgType } from '@/app/types/types';


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

    const [chosenInspector, setChosenInspector] = useState<InspectorItemFindOrgType|null>(null)

    const [personChosenCars, setPersonChosenCars] = useState<CarItemFindCarType[]>([])

    const [personChoosenOrganization, setPersonChosenOrganization] = useState<OrganizationItemFindOrgType>()

    useEffect(() => {
        (async () => {
            const peopleData = await GetCurrCompanyDriver(id).then(res => res.data)
            dispatch(setPeopleData(peopleData))
            const companys = await GetCompanys(id).then(res => res.data)
            setPersonChosenCars(companys)
            // const cars = await GetAllPeopleCars(activeData.id).then(res => res.data)
            // console.log(cars)
            // setPersonChosenCars(cars)
            
        })()
    }, [])

    const fields = [
        { title: "Автомобили во владении", errorMessage: "Укажите автомобили во владении", name: "OwnCar", value: personChoosenOrganization},
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Place_street", value: activeData.street_name},
        { title: "Дом", errorMessage: "Укажите дом", name: "Place_house", value: activeData.place_house},
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Place_room", value: activeData.place_room},

        { title: "Фамилия владельца", errorMessage: "Укажите фамилию", name: "LastName", value: activeData.last_name},
        { title: "Имя владельца", errorMessage: "Укажите имя", name: "FirstName", value: activeData.first_name},
        { title: "Отчество владельца", errorMessage: "Укажите отчество", name: "Pat", value: activeData.patronymic},

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
        { title: "Водитель в организации", errorMessage: "Укажите орагинизацию", name: "WhereWork", findOrganizationNeed: true, elementController: {need: true, controller: personChoosenOrganization}, value: personChoosenOrganization},
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "street_name", list: Streets, validate: /^(?!---|\s)(\S)/, value: activeData.street_name},
        { title: "Дом", errorMessage: "Укажите дом", name: "place_house", validate: /\S/, value: activeData.place_house},
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "place_room", validate: /\S/, value: activeData.place_room },


        { title: "Фамилия владельца", errorMessage: "Укажите фамилию", name: "last_name", value: activeData.last_name, validate: /\S/},
        { title: "Имя владельца", errorMessage: "Укажите имя", name: "first_name", value: activeData.first_name, validate: /\S/},
        { title: "Отчество владельца", errorMessage: "Укажите отчество", name: "patronymic", value: activeData.patronymic, validate: /\S/},

        { title: "Номер телефона владельца", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "phone_number", validate: /^((\+7)|(8))\d{10}$/ , value: activeData.phone_number},
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "passport_series", validate: /^\d{4}$/, value: activeData.passport_series },
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "passport_number", validate: /^\d{6}$/, value: activeData.passport_number },
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "who_passport_inssued", validate: /\S/, value: activeData.who_passport_inssued},
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "data_passport_inssued", date: true, validate: /\S/, value: activeData.data_passport_inssued},
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "driver_lic_number", validate: /^\d{10}$/, value: activeData.driver_lic_number},
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "driver_lic_date_inssued", validate: /\S/, date: true, value: activeData.driver_lic_date_inssued },
        // { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: Categories, elementController: {need: true, controller: activeCategory} }
    ]

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
                    
                    await ChangeDataPhys(field.name, values[`${field.name}`], id).then(()=>{
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
                        first_name: activeData.first_name, last_name: activeData.last_name, patronymic: activeData.patronymic, phone_number: activeData.phone_number, passport_series: activeData.passport_series,
                        passport_number: activeData.passport_number, who_passport_inssued: activeData.who_passport_inssued, data_passport_inssued: activeData.data_passport_inssued,
                        driver_lic_number: activeData.driver_lic_number, driver_lic_date_inssued: activeData.driver_lic_date_inssued }}
                        onSubmit={(values: FormikValues) => trySendRequest(values)}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.fields_container}>
                                    {EditWorker.renderCarsFields(editFieldsCars, {chosenOrganization: personChoosenOrganization,setPersonChosenOrganization: setPersonChosenOrganization})}
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
                {!editMode&&RenderWorker.renderPeoplesData(editFieldsCars)}
            </div>
        </>

    );
}

