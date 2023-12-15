import { Field, FormikValues } from "formik";
import { ReactNode } from "react";
import { ErrorComponentWorker } from "./errorComponentWorker";
import { validator } from "../validator";
import { CarItemFindCarType, OrganizationItemFindOrgType } from "@/app/types/types";
import { useState } from "react";
import FindCarBlock from "../FindCarBlock/FindCarBlock";
import FindOrganizationBlock from "../FindOrganizationBlock/FindOrganizationBlock";

interface FieldObject<Object> {
    name: string;
    title: string;
    errorMessage: string;
    validate?: RegExp
    list?: string[] | null;
    isBrands?: boolean;
    date?: boolean;
    changeFieldFunc?: any;
    findCarNeed?: boolean;
    findOrganizationNeed?: boolean;
    categories?: string[];
}

interface AdditionalDataObject {
    ref?: React.MutableRefObject<null | any>;
    chosenCarsArr?: CarItemFindCarType[];
    choosenOrganization?: OrganizationItemFindOrgType;
    activeCategory?: string[];
    setActiveCategory?: any;
}

export class FieldsWorker {

    private ErrorWorker: ErrorComponentWorker

    constructor(addErrorsArr: string[], setAddErrorsArr: (newState: string[]) => void) {
        this.ErrorWorker = new ErrorComponentWorker(addErrorsArr, setAddErrorsArr)
    }

    public renderCarsFields<Component>(fileds: FieldObject<Component>[], AdditionalDataObject?: AdditionalDataObject): ReactNode {
        return fileds.length == 0 ? <></> :
            fileds.map((elem) => (
                <div className="field" key={elem.name}>
                    <p className="field_title">{elem.title}</p>
                    {
                        elem.list ?
                            elem.isBrands ?
                                <select name="" id="" ref={AdditionalDataObject?.ref} onChange={elem.changeFieldFunc ? elem.changeFieldFunc : () => { }}>
                                    {elem.list.map((element) => (
                                        <option value={element} key={element}>{element}</option>
                                    ))}
                                </select>
                                :
                                <Field as="select" name={elem.name}>{elem.list.map((element) => (
                                    <option value={element} key={element}>{element}</option>
                                ))}</Field>
                            : elem.date ?
                                <Field type="date" name={elem.name} className="input" />
                                : <Field name={elem.name} className="input" />
                    }
                    {
                        this.ErrorWorker?.renderErrors(elem)
                    }
                </div>
            ))
    }

    public renderPeopleFilds<Obj>(fileds: FieldObject<Obj>[], AdditionalDataObject?: AdditionalDataObject): ReactNode {

        const [isFindCarOpen, setIsFindCarOpen] = useState(false)
        const [isFindOrgOpen, setIsFindOrgOpen] = useState(false)

        const CatigoriesBlock = (catigories: string[]) => {
            return (
                <div className="cat_block">
                    {catigories.map((category: string) => (
                        AdditionalDataObject?.activeCategory!==undefined&&AdditionalDataObject!==undefined?
                        <p className={AdditionalDataObject?.activeCategory.includes(category) ? "active_category" : "category"}
                            onClick={() => AdditionalDataObject?.activeCategory?AdditionalDataObject?.activeCategory.includes(category) ?
                                AdditionalDataObject?.setActiveCategory((prevState:string[]) => [...prevState.filter(elem => elem != category)]) :
                                AdditionalDataObject?.setActiveCategory((prevState:string[]) => [...prevState, category]):()=>{}}
                        >
                            {category}</p>:<></>
                    ))}
                </div>
            )
        }

        const findCarDiv = (setIsFindCarOpen: (value: boolean) => void) => (
            <div className="cars_container">
                <div onClick={() => setIsFindCarOpen(true)} className="btn_add">Добавить авто</div>
            </div>
        )

        const findOrganizationDiv = (setIsFindOrgOpen: (value: boolean) => void) => (
            <div className="cars_container">
                <div onClick={() => setIsFindOrgOpen(true)} className="btn_add">Указать организацию</div>
            </div>
        )

        return fileds.map((elem) => (
            <div className="field" key={elem.name}>
                <p className="field_title">{elem.title}</p>
                {elem.findCarNeed && AdditionalDataObject?.chosenCarsArr ? AdditionalDataObject.chosenCarsArr.map((car) => (
                    <div>
                        <p>{car.brand}</p>
                        <p>{car.model}</p>
                    </div>
                )) : elem.findOrganizationNeed && AdditionalDataObject?.choosenOrganization ?
                    <div>
                        <p>{AdditionalDataObject.choosenOrganization?.organization_name}</p>
                    </div> : null}
                {
                    elem.findCarNeed ? findCarDiv(setIsFindCarOpen) : elem.findOrganizationNeed ? findOrganizationDiv(setIsFindOrgOpen) :
                        elem.categories ? CatigoriesBlock(elem.categories) : <Field name={elem.name} className="input" />
                }
                <div className="addcarWindow_container">
                    {isFindCarOpen ? <FindCarBlock closeWindow={() => { setIsFindCarOpen(false) }} setChoosenItem={(item: CarItemFindCarType) => setPersonChoosenCars((prevState) => [...prevState, item])} /> : null}
                    {isFindOrgOpen ? <FindOrganizationBlock closeWindow={() => { setIsFindOrgOpen(false) }} setChoosenItem={(item: OrganizationItemFindOrgType) => setPersonChoosenOrganization(item)} /> : null}
                </div>
            </div>
        ))
    }


    public validate<Component>(arrValidating: FieldObject<Component>[], formikValues: FormikValues) {
        arrValidating.forEach((field) => {
            if (field.validate)
                validator(field.validate, field.name, this.ErrorWorker.changeError, formikValues[`${field.name}`])
        })
    }

    public sendRequest(func: () => any) {
        if (this.ErrorWorker.getErrorArr().length == 0)
            func()
    }
}