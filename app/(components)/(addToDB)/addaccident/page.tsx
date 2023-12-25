'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './accident.module.scss';
import { RootState } from '@/app/(storage)/store';
import { Formik, Form, FormikValues } from 'formik';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { setAddAccidentErrors } from '@/app/(storage)/reducers/errorsReducer';
import { CarItemFindCarType, InspectorItemFindOrgType } from '@/app/types/types';
import { DataFetcher } from '@/app/modules/models/dataFetcher';
import withAuth from '@/app/modules/Auth/withAuth';


function AddAccidentPage() {

    const errors = useSelector((state: RootState) => state.errors.AddAccident)
    const FieldWorkerObject = new FieldsWorker(errors, setAddAccidentErrors);
    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)

    const [participants, setParticipants] = useState<any>([])

    const DataFetcherObject = new DataFetcher()

    const Streets = useSelector((state: RootState) => state.lists.Streets)

    const [chosenCarsArr, setChosenCarsArr] = useState<CarItemFindCarType[]>()
    const [chosenInspector, setChosenInspector] = useState<InspectorItemFindOrgType | null>(null)

    const fields = {
        Participant: [
            { title: "Участник ДТП", name: "DateInspectionTicketGived", errorMessage: "Укажите дату прохождения ТО" },
            { title: "Автомобиль участника ДТП", errorMessage: "Автомобиль прошедший ТО", name: "ChosenCars", list: [] }
        ],
        OtherFields: [
            { title: "Инспектор оформлявший ДТП", errorMessage: "Укажите инспектора оформлявшая ДТП", name: "Inspector", findInspectorNeed: true },
            { title: "Улица на которой произошло ДТП", errorMessage: "Укажите улицу", name: "Street", list: Streets, validate: /\d/ },
            { title: "Описание", errorMessage: "", name: "Description" }
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

    const renderPartFields = FieldWorkerObject.renderPartAccidentFields(fields.Participant, {
        chosenInspector: chosenInspector, setChosenInspector: setChosenInspector
    })

    const renderOtherFields = FieldWorkerObject.renderAccidentFields(fields.OtherFields, {
        chosenInspector: chosenInspector, setChosenInspector: setChosenInspector
    })

    const trySendRequest = (values: FormikValues, resetForm: any) => {

    }

    const a = participants.map((elem:any) => (
        <div className={style.part_container}>
            {renderPartFields}
        </div>
    )
    )

    return (
        <div>
            <div className={style.funс_block}>
                <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
            </div>
            <h1 className={style.title}>Зарегистрировать ДТП</h1>
            <Formik
                initialValues={{
                    DateInspectionTicketGived: '', ChosenCars: '', Mileage: '', PaymentAmount: '', PaymentTIAmount: ''
                }}
                onSubmit={(values: FormikValues, { resetForm }) => trySendRequest(values, resetForm)}
            >
                {() => (
                    <Form className={style.from_container} id={style.form}>
                        <div className={style.part_block}>
                            {a}
                            <button onClick={() => setParticipants((prev: any) => [...prev, {}])}>Добавить участника</button>
                        </div>
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