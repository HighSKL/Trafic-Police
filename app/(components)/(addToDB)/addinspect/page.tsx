"use client"
import { useState } from 'react';
import { Formik, Form, FormikValues } from 'formik';
import style from './addInspect.module.scss';
import Link from 'next/link';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { setAddTechInspectionErrors } from '@/app/(storage)/reducers/errorsReducer';
import { CarItemFindCarType, InspectorItemFindOrgType } from '@/app/types/types';
import { AddTechnicalInspection } from '@/app/modules/apiservice';
import withAuth from '@/app/modules/Auth/withAuth';

function AddTechnicalInspectionPage() {

    const errors = useSelector((state: RootState)=> state.errors.AddTechInspectionPage)

    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)
    const FieldsWorkerObject = new FieldsWorker(errors, setAddTechInspectionErrors)
    const [chosenCar, setChosenCarsArr] = useState<CarItemFindCarType|null>(null)
    const [chosenInspector, setChosenInspector] = useState<InspectorItemFindOrgType|null>(null)

    const fields = [
        { title: "Дата выдачи технического осмотра", name: "DateInspectionTicketGived", errorMessage: "Укажите дату прохождения ТО", date: true, validate: /./},
        { title: "Автомобиль прошедший ТО", errorMessage: "Автомобиль прошедший ТО", name: "ChosenCars", findCarNeed: true, elementController: {need: true, controller: chosenCar}},
        { title: "Инспектор проводивший ТО", errorMessage: "Инспектор проводивший ТО", name: "Inspector", findInspectorNeed: true, elementController: {need: true, controller: chosenInspector} },
        { title: "Пробег", errorMessage: "Укажите пробег авто", name: "Mileage", validate: /\d/},
        { title: "Размер оплаты ТО", errorMessage: "Укажите размер оплаты ТО", name: "PaymentAmount", validate: /\d/},
        { title: "Размер оплаты за знак ТО", errorMessage: "Укажите размер оплаты за знак ТО", name: "PaymentTIAmount", validate: /\d/}
    ]

    const fieldsRender = FieldsWorkerObject.renderPeopleFields(fields, { chosenCarsArr: chosenCar, 
        setPersonChosenCars: setChosenCarsArr, chosenInspector: chosenInspector,
        setChosenInspector: setChosenInspector
    })

    const trySendRequest = (values: FormikValues, resetForm: any) => {
        FieldsWorkerObject.validate(fields, values)
        FieldsWorkerObject.sendRequest(()=>{
            setIsSendDataButtonDisabled(true)
            if(chosenCar)
                AddTechnicalInspection(chosenCar.id, values.DateInspectionTicketGived, '' , parseInt(values.Mileage),
                parseInt(values.PaymentAmount), parseInt(values.PaymentTIAmount)).then(()=>{
                    resetForm()
                    setIsSendDataButtonDisabled(false)
                })
        })
    }


    return (
        <div>
            <div className={style.funс_block}>
                <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
            </div>
            <h1 className={style.title}>Зарегистрировать ТО</h1>
            <Formik
                initialValues={{
                    DateInspectionTicketGived: '', ChosenCars: '', Mileage: '', PaymentAmount: '', PaymentTIAmount: ''
                }}
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
    );
}

// export default withAuth(AddTechnicalInspectionPage)
export default AddTechnicalInspectionPage