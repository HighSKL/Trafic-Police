'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './accident.module.scss';
import { RootState } from '@/app/(storage)/store';
import { Formik, Form, FormikValues } from 'formik';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { setAddAccidentErrors } from '@/app/(storage)/reducers/errorsReducer';
import { FindPeopleObjType, InspectorItemFindOrgType } from '@/app/types/types';
import { DataFetcher } from '@/app/modules/models/dataFetcher';
import withAuth from '@/app/modules/Auth/withAuth';
import { AddAccident } from '@/app/modules/apiservice';


function AddAccidentPage() {

    const {errors, peopleOwnCars} = useSelector((state: RootState) => ({
        errors: state.errors.AddAccident,
        peopleOwnCars: state.userData.AccidentPage.peopleOwnCars
    }))

    const FieldWorkerObject = new FieldsWorker(errors, setAddAccidentErrors);

    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)

    const [activeChosenPeople, setActiveChosenPeople] = useState<FindPeopleObjType|null>(null)
    const [participants, setParticipants] = useState<{id: number, owner_name:string, car: any}[]>([])

    const DataFetcherObject = new DataFetcher()

    const Streets = useSelector((state: RootState) => state.lists.Streets)

    const [chosenInspector, setChosenInspector] = useState<InspectorItemFindOrgType | null>(null)

    const fields = {
        Participant: [
            { title: "Участник ДТП", name: "DateInspectionTicketGived", errorMessage: "Укажите дату прохождения ТО", findPeopleNeed: true, },
            { title: "Автомобиль участника ДТП", errorMessage: "Автомобиль участника", name: "ChosenCars", list: peopleOwnCars},
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
            if (!Streets)
                await DataFetcherObject.getStreets()
            //
        })()
    }, [])

    useEffect(()=>{
        if(activeChosenPeople){
            (async()=>{
                await DataFetcherObject.GetOwnCars(activeChosenPeople.id)
            })()
        }
    }, [activeChosenPeople])

    const renderPartFields = FieldWorkerObject.renderPartAccidentFields(fields.Participant, {
        people: {chosenPeople: activeChosenPeople, setChosenPeople: setActiveChosenPeople}
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
            <div>
                <p>Владелец</p>
                {elem.owner_name}
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
                owner_name: activeChosenPeople.owner_name,
                car: values.ChosenCars
            }
            setParticipants((prev: any) => [...prev, dto])
            setActiveChosenPeople(null)
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
                            <button onClick={() => addParticipants(values)}>Добавить участника</button>
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

export default withAuth(AddAccidentPage)
// export default AddAccidentPage