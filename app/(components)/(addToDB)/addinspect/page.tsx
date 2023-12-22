"use client"
import { useEffect, useState } from 'react';
import { Formik, Form, FormikValues } from 'formik';
import style from './addInspect.module.scss';
import Link from 'next/link';
import { FieldsWorker } from '@/app/modules/models/fieldsWorker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { setAddTechInspectionErrors } from '@/app/(storage)/reducers/errorsReducer';
import { useRouter } from 'next/navigation';

export default function AddTechnicalInspectionPage() {

    const errors = useSelector((state: RootState)=> state.errors.AddTechInspectionPage)
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(()=>{
        console.log(errors)
    })

    const [isSendDataButtonDisabled, setIsSendDataButtonDisabled] = useState<boolean>(false)
    const FieldsWorkerObject = new FieldsWorker(errors, setAddTechInspectionErrors)
    const [chosenCarsArr, setChosenCarsArr] = useState()

    const fields = [
        { title: "Дата выдачи технического осмотра", name: "DateInspectionTicketGived", errorMessage: "Укажите дату прохождения ТО", date: true, validate: /./},
        { title: "Автомобиль прошедший ТО", errorMessage: "Автомобиль прошедший ТО", name: "ChosenCars", findCarNeed: true },
        { title: "Пробег", errorMessage: "Укажите пробег авто", name: "Mileage", findCarNeed: true, validate: /\d/},
        { title: "Размер оплаты ТО", errorMessage: "Укажите размер оплаты ТО", name: "PaymentAmount", findCarNeed: true, validate: /\d/},
        { title: "Размер оплаты за знак ТО", errorMessage: "Укажите размер оплаты за знак ТО", name: "PaymentTIAmount", findCarNeed: true, validate: /\d/}
    ]

    const trySendRequest = (values: FormikValues, resetForm: any) => {

    }

    // const fieldsRender = FieldsWorkerObject.renderPeopleFields(fields, { chosenCarsArr: chosenCarsArr, setPersonChosenCars: setChosenCarsArr })

    return (
        <div>
            <div className={style.funс_block}>
                <Link href={"/home"} className={style.redirect_link}>&#60;&lt;Назад</Link>
            </div>
            <Formik
                initialValues={{
                }}
                onSubmit={(values: FormikValues, { resetForm }) => trySendRequest(values, resetForm)}
            >
                {() => (
                    <Form className={style.from_container} id={style.form}>
                        <div className={style.fields_container}>
                            {/* {fieldsRender} */}
                        </div>
                        <button className={style.button} type="submit" disabled={isSendDataButtonDisabled} onClick={()=>{
                            // dispatch(setErrors(["aaa", 'bbb']))
                            router.refresh()
                        }}>Добавить</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

