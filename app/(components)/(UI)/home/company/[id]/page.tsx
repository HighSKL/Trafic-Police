'use client'
import { RenderData } from '@/app/modules/models/renderData';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { setChosenData, setCompanyData, setInspectionData, setPeopleData } from '@/app/(storage)/reducers/showDataReducer';
import { ChangeDataCars, ChangeDataInspection, ChangeDataJur, GetAllPeopleCars, GetCurrCompany, GetCurrPeople, GetCurrentInspection, deleteCar, deletePeopleJur, getCurrCar } from '@/app/modules/apiservice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditFieldsWorker } from '@/app/modules/models/editFieldsWorker';
import { setAddPeopleErrors } from '@/app/(storage)/reducers/errorsReducer';
import { setModels } from '@/app/(storage)/reducers/listsReducer';
import { Formik, Form, FormikValues } from 'formik';
import { CarItemFindCarType, InspectorItemFindOrgType } from '@/app/types/types';


export default function ShowInfoCompanyBlock({ params: { id } }: any) {

    const activeData: any = useSelector((state: RootState) => state.showData.CompanyData)
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

    useEffect(() => {
        (async () => {
            const companyData = await GetCurrCompany(id).then(res => res.data)
            dispatch(setCompanyData(companyData))
            // const cars = await GetAllPeopleCars(activeData.id).then(res => res.data)
            // console.log(cars)
            // setPersonChosenCars(cars)
            
        })()
    }, [])

    const fields = [
        // { title: "Автомобили во владении организации", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true, elementController: {need: true, controller: personChosenCars}, value: activeData.},
        { title: "Улица", errorMessage: "Укажите улицу нахождения организации", name: "Place_street", value: activeData.street_name },
        { title: "Дом", errorMessage: "Укажите дом", name: "Place_house", value: activeData.place_house },
        { title: "Квартира/Офис", errorMessage: "Укажите квартиру/номер офиса", name: "Place_room", value: activeData.place_room },
        { title: "Название организации", errorMessage: "Укажите название организации", name: "Organization_name", value: activeData.organization_name },
        { title: "ФИО директора организации", errorMessage: "Укажите имя директора", name: "DirectorName", value: activeData.director_name },
        { title: "Номер телефона директора организации", errorMessage: "Укажите номер телефона директора в формате +X XXX XXX XX XX", name: "PhoneNumber", value: activeData.director_phone_number },
    ]

    const editFieldsCars = [
        // { title: "Автомобили во владении организации", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true, elementController: {need: true, controller: personChosenCars}, value: activeData. },
        { title: "Улица", errorMessage: "Укажите улицу нахождения организации", name: "street_name", list: Streets, validate: /^(?!---|\s)(\S)/, value: activeData.street_name },
        { title: "Дом", errorMessage: "Укажите дом", name: "place_house", value: activeData.place_house },
        { title: "Квартира/Офис", errorMessage: "Укажите квартиру/номер офиса", name: "place_room", value: activeData.place_room },
        { title: "Название организации", errorMessage: "Укажите название организации", name: "organization_name", value: activeData.organization_name },
        { title: "ФИО директора организации", errorMessage: "Укажите имя директора", name: "director_name", value: activeData.director_name },
        { title: "Номер телефона директора организации", errorMessage: "Укажите номер телефона директора в формате +X XXX XXX XX XX", name: "director_phone_number", value: activeData.director_phone_number },
    ]

    // const editFieldsInspect = [
    //     { title: "Инспектор проводивший ТО", errorMessage: "Инспектор проводивший ТО", name: "inspector_id", findInspectorNeed: true, elementController: {need: true, controller: chosenInspector}, value: activeInspData?.inspector_name },
    // ]
    
    

    const deleteData = async () => {
        setIsSendDataButtonDisabled(true)
        await deletePeopleJur(id).then(()=>{
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
                    await ChangeDataJur(field.name, values[`${field.name}`], id).then(()=>{
                        setIsSendDataButtonDisabled(false)
                        router.push('/home')
                        setEditMode(false)
                    })
                }
            })
            // editFieldsInspect.forEach(async (field)=>{
            //     if((chosenInspector?.id !== activeInspData.inspector_id)&&field.findInspectorNeed){
            //         setIsSendDataButtonDisabled(true)
            //         await ChangeDataInspection(field.name, chosenInspector?.id, id).then(()=>{
            //             setIsSendDataButtonDisabled(false)
            //             router.push('/home')
            //             setEditMode(false)
            //         })
            //     }
            //     if((field.value != values[`${field.name}`])&&!field.findInspectorNeed){
            //         await ChangeDataInspection(field.name, values[`${field.name}`], id).then(()=>{
            //             setIsSendDataButtonDisabled(false)
            //             router.push('/home')
            //             setEditMode(false)
            //         })
            //     }
            // })
        })
    }

    const fieldsFormikComponent = () => {
        return(
            <div className={style.formikPrev}>
                <Formik
                        initialValues={{ street_name: activeData.street_name, place_house: activeData.place_house, place_room: activeData.place_room,
                        organization_name: activeData.organization_name, director_name: activeData.director_name, director_phone_number: activeData.director_phone_number}}
                        onSubmit={(values: FormikValues) => trySendRequest(values)}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.fields_container}>
                                    {EditWorker.renderCarsFields(editFieldsCars)}
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

