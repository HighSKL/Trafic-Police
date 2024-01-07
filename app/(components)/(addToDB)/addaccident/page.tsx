'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './accident.module.scss';
import { RootState } from '@/app/(storage)/store';
import { Formik, Form, FormikValues } from 'formik';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { setAddAccidentErrors } from '@/app/(storage)/reducers/errorsReducer';
import { CarItemFindCarType, FindPeopleObjType, InspectorItemFindOrgType } from '@/app/types/types';
import { DataFetcher } from '@/app/modules/models/dataFetcher';
import withAuth from '@/app/modules/Auth/withAuth';
import { AddAccident, GetPeopleByCar } from '@/app/modules/apiservice';
import { setCandidatePeople, setPeopleOwnCars } from '@/app/(storage)/reducers/userDataReducer';

function AddAccidentPage() {

    const {errors, peopleOwnCars, candidatePeople} = useSelector((state: RootState) => ({
        errors: state.errors.AddAccident,
        peopleOwnCars: state.userData.AccidentPage.peopleOwnCars,
        candidatePeople: state.userData.AccidentPage.candidatePeople
    }))

    const dispatch = useDispatch()

    const FieldWorkerObject = new FieldsWorker(errors, setAddAccidentErrors);

    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)

    const [activeChosenPeople, setActiveChosenPeople] = useState<FindPeopleObjType|null>(candidatePeople)
    const [activeChosenCar, setActiveChosenCar] = useState<CarItemFindCarType|null>(null)
    const [participants, setParticipants] = useState<{id: number, first_name:string, last_name:string, passport_series:number, passport_number:number, car: any}[]>([])


    const DataFetcherObject = new DataFetcher()

    const Streets = useSelector((state: RootState) => state.lists.Streets)

    const [chosenInspector, setChosenInspector] = useState<InspectorItemFindOrgType | null>(null)

    const fields = {
        Participant: [
            { title: "Участник ДТП", name: "DateInspectionTicketGived", errorMessage: "Укажите дату прохождения ТО", list: peopleOwnCars, findPeopleNeed: true, },
            { title: "Автомобиль участника ДТП", errorMessage: "Автомобиль участника", name: "ChosenCars", list: peopleOwnCars, findCarNeed: true},
        ],
        OtherFields: [
            { title: "Инспектор оформлявший ДТП", errorMessage: "Укажите инспектора оформлявшего ДТП", name: "Inspector", findInspectorNeed: true, elementController: {need: true, controller: chosenInspector} },
            { title: "Улица на которой произошло ДТП", errorMessage: "Укажите улицу", name: "Place_street", list: Streets, validate: /^(?!----|\s)(\S)/ },
            { title: "Описание", errorMessage: "Дайте описание", name: "Description", validate: /\S/ }
        ],
        Custom: [
            { title: "", custom: true, errorMessage: "Укажите участников ДТП ", name: "PartAccident", elementController: {need: true, controller: participants} }
        ]
    }

    useEffect(() => {
        (async () => {
            // initialize lists
            setActiveChosenPeople(candidatePeople)
            if (!Streets)
                await DataFetcherObject.getStreets()
            //
        })()
    }, [])

    useEffect(()=>{
        if(activeChosenPeople&&!activeChosenCar){
            (async()=>{
                await DataFetcherObject.GetOwnCars(activeChosenPeople.id)
            })()
        }
    }, [activeChosenPeople])

    useEffect(()=>{

            (async()=>{
                if (activeChosenCar&&!activeChosenPeople){
                    const pep = await GetPeopleByCar(activeChosenCar.id).then(res=>res.data)
                    dispatch(setCandidatePeople(pep))
                }
            })()
    }, [activeChosenCar])

    const renderPartFields = FieldWorkerObject.renderPartAccidentFields(fields.Participant, {
        accident: {
            chosenPeople: activeChosenPeople, setChosenPeople: setActiveChosenPeople, 
            chosenCars: activeChosenCar, setChosenCars: setActiveChosenCar
        }
    })

    const renderCustom = FieldWorkerObject.renderPartAccidentFields(fields.Custom)

    const renderOtherFields = FieldWorkerObject.renderAccidentFields(fields.OtherFields, {
        chosenInspector: chosenInspector, setChosenInspector: setChosenInspector
    })

    const trySendRequest = (values: FormikValues, resetForm: any) => {
        FieldWorkerObject.validate(fields.OtherFields,values)
        FieldWorkerObject.validate(fields.Participant,values)
        FieldWorkerObject.validate(fields.Custom, values)

        FieldWorkerObject.sendRequest(()=>{
            setIsSendDataButtonDisabled(true)
            if(chosenInspector){
                
                AddAccident(values.Place_street, chosenInspector.id, values.Description, participants).then(()=>{
                    resetForm()
                    setParticipants([])
                    setActiveChosenPeople(null)
                    setChosenInspector(null)
                    setIsSendDataButtonDisabled(false)
                })
            }
        })
    }

    const renderParticipantsFields = ()=>(
        <div className={style.part_container}>
            {renderPartFields}
        </div>
    )

    const renderChosenPart = participants.map((elem)=>(
        <div className={style.part_item}>
            <div style={{position:'absolute', marginTop:'-10px', cursor:'pointer'}} onClick={()=>{
                setParticipants((prevState:any)=>
                    prevState.filter((element:any)=>elem.id !== element.id)
                )
            }}>X</div>
            <div>
                <p>Владелец</p>
                <p>Серия/номер паспорта: {elem.passport_series}/{elem.passport_number}</p>
                <p>{elem.first_name} {elem.last_name}</p>
            </div>
            <div>
                <p>Автомобиль</p>
                {elem.car}
            </div>
            
            
        </div>
    ))

    const addParticipants = (values:FormikValues) => {
        if(activeChosenPeople){
            const dto = {
                id: activeChosenPeople.id,
                first_name: activeChosenPeople.first_name,
                last_name: activeChosenPeople.last_name,
                car: values.ChosenCars,
                passport_series: activeChosenPeople.passport_series, 
                passport_number: activeChosenPeople.passport_number,
            }
            setParticipants((prev: any) => [...prev, dto])
            setActiveChosenPeople(null)
            dispatch(setPeopleOwnCars(['---']))
            dispatch(setCandidatePeople(null))
            setActiveChosenCar(null)
        }
        else if(candidatePeople&&activeChosenCar){
            const dto = {
                id: candidatePeople.id,
                first_name: candidatePeople.first_name,
                last_name: candidatePeople.last_name,
                car: `${activeChosenCar.state_number} ${activeChosenCar.brand} ${activeChosenCar.model}`,
                passport_series: candidatePeople.passport_series, 
                passport_number: candidatePeople.passport_number,
            }
            setParticipants((prev: any) => [...prev, dto])
            setActiveChosenPeople(null)
            dispatch(setPeopleOwnCars(['---']))
            dispatch(setCandidatePeople(null))
            setActiveChosenCar(null)
        }
    }

    return (
        <div>
            <div className={style.funс_block}>
                <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
            </div>
            <h1 className={style.title}>Зарегистрировать ДТП</h1>
            <Formik
                initialValues={{
                    DateInspectionTicketGived: '', ChosenCars: '', Mileage: '', PaymentAmount: '', PaymentTIAmount: '', 
                    Street: '',Description: '', Inspector: ''
                }}
                onSubmit={(values: FormikValues, { resetForm }) => trySendRequest(values, resetForm)}
            >
                {({values}) => (
                    <Form className={style.from_container} id={style.form}>
                        <div className={style.chosen_part_container}>
                            {renderChosenPart}
                        </div>
                        <div className={style.part_block}>
                            {renderParticipantsFields()}
                            <button type='button' onClick={() => addParticipants(values)}>Добавить участника</button>
                        </div>
                        {renderCustom}
                        <div className={style.fields_container}>
                            {renderOtherFields}
                        </div>
                        <button className={style.button} type="submit" disabled={isSendDataButtonDisabled}>Добавить</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

// export default withAuth(AddAccidentPage)
export default AddAccidentPage