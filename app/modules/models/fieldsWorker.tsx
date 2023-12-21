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
    categories?: string[]|null;
}

interface AdditionalDataObject {
    ref?: React.MutableRefObject<null | any>;
    chosenCarsArr?: CarItemFindCarType[];
    chosenOrganization?: OrganizationItemFindOrgType;
    activeCategory?: string[];
    setActiveCategory?: any;
    setPersonChosenCars?: any;
    setPersonChosenOrganization?: any;
}

export class FieldsWorker {

    private ErrorWorker: ErrorComponentWorker

    constructor(addErrorsArr: string[], setAddErrorsArr: (newState: string[]) => void) {
        this.ErrorWorker = new ErrorComponentWorker(addErrorsArr, setAddErrorsArr)
    }

    private renderFindCarWindow(chosenCarsArr: any, setPersonChosenCars: any) {
        const [isWindowOpen, setIsWindowOpen] = useState(false);

        const div = (setIsFindCarOpen: (value: boolean) => void) => (
            <div className="cars_container">
                <div onClick={() => setIsFindCarOpen(true)} className="btn_add">Добавить авто</div>
            </div>
        )

        return (
            <div>
                {chosenCarsArr.map((car: any) => (
                    <div>
                        <p>{car.brand}</p>
                        <p>{car.model}</p>
                    </div>
                ))}
                {div(setIsWindowOpen)}
                {isWindowOpen &&
                    <FindCarBlock
                        closeWindow={() => setIsWindowOpen(false)}
                        setChoosenItem={(item: CarItemFindCarType) => setPersonChosenCars((prevState: string[]) => [...prevState, item])} />
                }
            </div>
        )
    }

    private renderFindOrganizationWindow(chosenOrganization: OrganizationItemFindOrgType|undefined, setPersonChosenOrganization: any) {
        const [isWindowOpen, setIsWindowOpen] = useState(false);

        const div = (setIsFindOrgOpen: (value: boolean) => void) => (
            <div className="cars_container">
                <div onClick={() => setIsFindOrgOpen(true)} className="btn_add">Добавить организацию</div>
            </div>
        )

        return (
            <div>
                {div(setIsWindowOpen)}
                {isWindowOpen&&
                    <FindOrganizationBlock closeWindow={()=>setIsWindowOpen(false)} setChoosenItem={(item: OrganizationItemFindOrgType) => setPersonChosenOrganization(item)} />
                }
                <div>
                    <p>{chosenOrganization?.organization_name}</p>
                </div>
            </div>
        )
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


    public renderPeopleFields<Obj>(fileds: FieldObject<Obj>[], AdditionalDataObject?: AdditionalDataObject): ReactNode {

        const CatigoriesBlock = (catigories: string[]) => {
            return (
                <div className="cat_block">
                    {catigories.map((category: string) => (
                        AdditionalDataObject?.activeCategory !== undefined && AdditionalDataObject !== undefined ?
                            <p className={AdditionalDataObject?.activeCategory.includes(category) ? "active_category" : "category"}
                                onClick={() => AdditionalDataObject?.activeCategory ? AdditionalDataObject?.activeCategory.includes(category) ?
                                    AdditionalDataObject?.setActiveCategory((prevState: string[]) => [...prevState.filter(elem => elem != category)]) :
                                    AdditionalDataObject?.setActiveCategory((prevState: string[]) => [...prevState, category]) : () => { }}
                            >
                                {category}</p> : <></>
                    ))}
                </div>
            )
        }

        return fileds.map((elem) => (
            <div className="field" key={elem.name}>
                <p className="field_title">{elem.title}</p>
                <div className="addcarWindow_container">
                    {
                        elem.findCarNeed &&
                        this.renderFindCarWindow(AdditionalDataObject?.chosenCarsArr, AdditionalDataObject?.setPersonChosenCars)
                    }
                    {
                        elem.findOrganizationNeed &&
                        this.renderFindOrganizationWindow(AdditionalDataObject?.chosenOrganization, AdditionalDataObject?.setPersonChosenOrganization)
                    }
                    {
                        elem.categories && CatigoriesBlock(elem.categories)
                    }
                    {
                        elem.list&&
                        <Field as="select" name={elem.name}>{elem.list.map((element) => (
                            <option value={element} key={element}>{element}</option>
                        ))}</Field>
                    }
                    {
                        !elem.categories && !elem.findCarNeed && !elem.findOrganizationNeed && !elem.list&& <Field name={elem.name} className="input" />
                    }
                </div>
                {
                    this.ErrorWorker?.renderErrors(elem)
                }
            </div>
        ))
    }


    public validate<Component>(arrValidating: FieldObject<Component>[], formikValues: FormikValues, customValidate?:()=>boolean) {
        arrValidating.forEach((field) => {
            if (field.validate)
                validator(field.validate, field.name, this.ErrorWorker.changeError, formikValues[`${field.name}`])
        })
    }

    public sendRequest(func: () => void) {
        if (this.ErrorWorker.getErrorArr().length == 0)
            func()
    }
}