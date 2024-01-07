"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import style from './addpeople.module.scss';
import { RootState } from '@/app/(storage)/store';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, Field, FormikValues } from "formik";
import { DataFetcher } from '@/app/modules/models/dataFetcher';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { setAddPeopleErrors } from '@/app/(storage)/reducers/errorsReducer';
import { AddCompanyDriver, AddPeopleJur, AddPeoplePhys } from '@/app/modules/apiservice';
import { CarItemFindCarType, OrganizationItemFindOrgType, PersonFieldType } from '@/app/types/types';
import withAuth from '@/app/modules/Auth/withAuth';

function AddPeople() {

    enum personType {
        physical, juridical, companyDriver
    }

    const [activeCategory, setActiveCategory] = useState<string[]>([])
    const [person, setPerson] = useState<personType>(personType.physical)
    const DataFetcherObject = new DataFetcher()
    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)

    const { errorsArr, Streets, Categories } = useSelector((state:RootState)=>({ 
        errorsArr: state.errors.AddPeoplePage, 
        Streets: state.lists.Streets,
        Categories: state.lists.Categories
    }))

    const dispatch = useDispatch()

    const FieldsWorkerObject = new FieldsWorker(errorsArr, setAddPeopleErrors)

    const [personChosenCars, setPersonChosenCars] = useState<CarItemFindCarType[]>([])
    const [personChoosenOrganization, setPersonChosenOrganization] = useState<OrganizationItemFindOrgType>()


    useEffect(() => {
        (async () => {
            // initialize lists
            if (!Streets)
                await DataFetcherObject.getStreets()
            if (!Categories)
                await DataFetcherObject.getCategories()
            //
        })()
    }, [])

    const fieldsPhysialPerson: PersonFieldType[] = [
        { title: "Автомобили во владении", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true, elementController: {need: true, controller: personChosenCars}},
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Place_street", list: Streets, validate: /^(?!---|\s)(\S)/ },
        { title: "Дом", errorMessage: "Укажите дом", name: "Place_house", validate: /\S/ },
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Place_room", validate: /\S/ },
        { title: "Имя владельца", errorMessage: "Укажите имя", name: "FirstName", validate: /\S/ },
        { title: "Фамилия владельца", errorMessage: "Укажите фамилию", name: "LastName", validate: /\S/ },
        { title: "Отчество владельца", errorMessage: "Укажите отчество", name: "Patronymic", validate: /\S/ },
        { title: "Номер телефона владельца", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "PhoneNumber", validate: /^((\+7)|(8))\d{10}$/ },
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "PassportSeries", validate: /^\d{4}$/ },
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "PassportNumber", validate: /^\d{6}$/ },
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "WhoPassportGived", validate: /\S/ },
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "DatePassportGived", date: true, validate: /\S/ },
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "DriverlicenseNumber", validate: /^\d{10}$/ },
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "DriverlicenseGivedData", validate: /\S/, date: true },
        { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: Categories, elementController: {need: true, controller: activeCategory} }
    ]

    const fieldsJuridicalPerson: PersonFieldType[] = [
        { title: "Автомобили во владении организации", errorMessage: "Укажите автомобили во владении", name: "OwnCar", findCarNeed: true, elementController: {need: true, controller: personChosenCars} },
        { title: "Улица", errorMessage: "Укажите улицу нахождения организации", name: "Place_street", list: Streets, validate: /^(?!---|\s)(\S)/ },
        { title: "Дом", errorMessage: "Укажите дом", name: "Place_house" },
        { title: "Квартира/Офис", errorMessage: "Укажите квартиру/номер офиса", name: "Place_room" },
        { title: "Название организации", errorMessage: "Укажите название организации", name: "Organization_name" },
        { title: "Имя директора организации", errorMessage: "Укажите имя директора", name: "DirectorFirstName" },
        { title: "Фамилия директора организации", errorMessage: "Укажите фамилия директора", name: "DirectorLastName" },
        { title: "Отчество директора организации", errorMessage: "Укажите отчество директора", name: "DirectorPatronymicName" },
        { title: "Номер телефона директора организации", errorMessage: "Укажите номер телефона директора в формате +X XXX XXX XX XX", name: "PhoneNumber" },
    ]

    const fieldsCompanyDriver: PersonFieldType[] = [
        { title: "Водитель в организации", errorMessage: "Укажите орагинизацию", name: "WhereWork", findOrganizationNeed: true, elementController: {need: true, controller: personChoosenOrganization} },
        { title: "Улица", errorMessage: "Укажите улицу проживания", name: "Place_street", list: Streets, validate: /^(?!---|\s)(\S)/ },
        { title: "Имя водителя", errorMessage: "Укажите имя", name: "FirstName", validate: /\S/ },
        { title: "Фамилия водителя", errorMessage: "Укажите фамилию", name: "LastName", validate: /\S/ },
        { title: "Отчество водителя", errorMessage: "Укажите отчество", name: "Patronymic", validate: /\S/ },
        { title: "Дом", errorMessage: "Укажите дом", name: "Place_house", validate: /\S/ },
        { title: "Квартира", errorMessage: "Укажите квартиру", name: "Place_room", validate: /\S/ },
        { title: "Номер телефона", errorMessage: "Укажите номер телефона в формате +X XXX XXX XX XX", name: "PhoneNumber", validate: /^((\+7)|(8))\d{10}$/ },
        { title: "Серия паспорта", errorMessage: "Укажите серию паспорта", name: "PassportSeries" },
        { title: "Номер паспорта", errorMessage: "Укажите номер паспорта", name: "PassportNumber" },
        { title: "Кем паспорт выдан", errorMessage: "Укажите кем выдан паспорт", name: "WhoPassportGived" },
        { title: "Дата выдачи паспорта", errorMessage: "Укажите дату выдачи паспорта", name: "DatePassportGived", date: true },
        { title: "Номер водительского удостоверения", errorMessage: "Укажите номер ВУ", name: "DriverlicenseNumber" },
        { title: "Дата выдачи водительского удостоверения", errorMessage: "Укажите дату выдачи ВУ", name: "DriverlicenseGivedData", date: true },
        { title: "Категории", errorMessage: "Укажите категории", name: "Categories", categories: Categories, elementController: {need: true, controller: activeCategory} }
    ]

    
    const PhysicalPersonSendRequest = (values: FormikValues, resetForm: any) => {
        const chosenCarsId = personChosenCars.map((item: CarItemFindCarType) => item.id)
        const categories = activeCategory
        setIsSendDataButtonDisabled(true)
        AddPeoplePhys(chosenCarsId, values.Place_street, values.Place_house, values.Place_room, 
            values.PhoneNumber,parseInt(values.PassportSeries), parseInt(values.PassportNumber), 
            values.WhoPassportGived, values.DatePassportGived, parseInt(values.DriverlicenseNumber),
            values.DriverlicenseGivedData, categories, values.FirstName, values.LastName, values.Patronymic).then(()=>{
                setIsSendDataButtonDisabled(false)
                resetForm()
                setPersonChosenCars([])
            })
    }

    const JuridicalPersonSendRequest = (values: FormikValues, resetForm: any) => {
        const chosenCarsId = personChosenCars.map((item: CarItemFindCarType) => item.id)
        setIsSendDataButtonDisabled(true)
        AddPeopleJur(chosenCarsId, values.Place_street, values.Place_house, values.Place_room, values.Organization_name,
            values.PhoneNumber, values.DirectorFirstName, values.DirectorLastName, values.DirectorPatronymicName).then(()=>{
                setIsSendDataButtonDisabled(false)
                resetForm()
            })
    }

    const CompanyDriverPersonSendRequest = (values: FormikValues, resetForm: any) => {
        if(personChoosenOrganization){
            const chosenOrganizationId = personChoosenOrganization.id
            const categories = activeCategory
            setIsSendDataButtonDisabled(true)
            AddCompanyDriver(chosenOrganizationId, values.Place_street, values.Place_house, values.Place_room, 
                values.PhoneNumber,parseInt(values.PassportSeries), parseInt(values.PassportNumber), 
                values.WhoPassportGived, values.DatePassportGived, parseInt(values.DriverlicenseNumber),
                values.DriverlicenseGivedData, categories, values.FirstName, values.LastName, values.Patronymic).then(()=>{
                    setIsSendDataButtonDisabled(false)
                    resetForm()
                })
        }
    }

    const trySendRequest = (values: FormikValues, resetForm: any) => {

        switch (person) {
            case personType.physical: {
                FieldsWorkerObject.validate(fieldsPhysialPerson, values)
                FieldsWorkerObject.sendRequest(()=>PhysicalPersonSendRequest(values, resetForm))
                break
            }
            case personType.juridical: {
                FieldsWorkerObject.validate(fieldsJuridicalPerson, values)
                FieldsWorkerObject.sendRequest(()=>JuridicalPersonSendRequest(values, resetForm))
                break
            }
            case personType.companyDriver: {
                FieldsWorkerObject.validate(fieldsCompanyDriver, values)
                FieldsWorkerObject.sendRequest(()=>CompanyDriverPersonSendRequest(values, resetForm))
                break
            }
        }
        
    }

    const defaultVariables = (reset?: () => void) => {
        setActiveCategory([])
        setPersonChosenCars([])
        reset ? reset() : null
        dispatch(setAddPeopleErrors([]))
    }

    const changePeopleType = (personType: personType, reset: () => void) => {
        setPerson(personType)
        defaultVariables(reset)
    }

    const fieldsPhysRender = FieldsWorkerObject.renderPeopleFields(fieldsPhysialPerson, { chosenCarsArr: personChosenCars, setPersonChosenCars, activeCategory, setActiveCategory })
    const fieldsJurRender = FieldsWorkerObject.renderPeopleFields(fieldsJuridicalPerson, { chosenCarsArr: personChosenCars, setPersonChosenCars: setPersonChosenCars })
    const fieldsDriverRender = FieldsWorkerObject.renderPeopleFields(fieldsCompanyDriver, { chosenOrganization: personChoosenOrganization, setPersonChosenOrganization, activeCategory, setActiveCategory })

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
                            WhereWork: '', OwnCar: '', Place_street: '', Place_house: '',
                            Place_room: '', FirstName: '', LastName: '', Patronymic:'', PhoneNumber: '', PassportSeries: '',
                            PassportNumber: '', WhoPassportGived: '', DatePassportGived: '', DriverlicenseNumber: '',
                            DriverlicenseGivedData: '', Categories: '', Organization_name: '', DirectorFirstName: '',
                            DirectorLastName: '', DirectorPatronymicName: ''
                        }}
                        onSubmit={(values, { resetForm }) => {
                            trySendRequest(values, resetForm)
                        }}
                    >
                        {({ resetForm }) => (
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
                                    <div className={style.people_type_block} onClick={() => { changePeopleType(personType.companyDriver, resetForm) }}>
                                        <Field type="checkbox" className={style.checkbox} checked={person === personType.companyDriver} />
                                        <p className={style.people_type_header}>Водитель в компании</p>
                                    </div>
                                </div>
                                <div className={style.fields_container}>
                                    {person == personType.physical && fieldsPhysRender}
                                    {person == personType.juridical && fieldsJurRender}
                                    {person == personType.companyDriver && fieldsDriverRender}
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

// export default withAuth(AddPeople)
export default AddPeople