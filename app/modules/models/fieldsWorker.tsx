import { Field, FormikValues } from "formik";
import { ReactNode, useEffect } from "react";
import { ErrorComponentWorker } from "./errorComponentWorker";
import { validator } from "../validator";
import { CarItemFindCarType, FindPeopleObjType, InspectorItemFindOrgType, OrganizationItemFindOrgType } from "@/app/types/types";
import { useState } from "react";
import FindCarBlock from "../FindCarBlock/FindCarBlock";
import FindOrganizationBlock from "../FindOrganizationBlock/FindOrganizationBlock";
import FindInspectorBlock from "../FindInspectorBlock/FindInspectorBlock";
import FindPeopleBlock from "../FindPeopleBlock/FindPeopleBlock";
import { GetPeopleByCar } from "../apiservice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(storage)/store";

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
    findInspectorNeed?: boolean;
    findOrganizationNeed?: boolean;
    findPeopleNeed?: boolean;
    categories?: string[]|null;
    elementController?: {need: boolean, controller: any};
    custom?: boolean
}

interface CarsExtend<CarType>{
    id: number;
    brand: string;
    model: string;
}

interface AdditionalDataObject {
    ref?: React.MutableRefObject<null | any>;
    chosenCarsArr?: CarItemFindCarType[]|any;
    chosenOrganization?: OrganizationItemFindOrgType;
    chosenInspector?: InspectorItemFindOrgType|any;
    activeCategory?: string[];
    setActiveCategory?: any;
    setPersonChosenCars?: any;
    setPersonChosenOrganization?: any;
    setChosenInspector?: any;
    people?: {
        chosenPeople: any;
        setChosenPeople: any;
    }
    accident?: {
        chosenPeople: any;
        setChosenPeople: any;
        chosenCars: any;
        setChosenCars: any; 
    }
}

export class FieldsWorker {

    private ErrorWorker: ErrorComponentWorker

    constructor(addErrorsArr: string[], setAddErrorsArr: any) {
        this.ErrorWorker = new ErrorComponentWorker(addErrorsArr, setAddErrorsArr)
    }

    private renderFindCarWindow<CarType>(chosenCars: CarType[]|CarsExtend<CarType>, setPersonChosenCars: any) {
        const [isWindowOpen, setIsWindowOpen] = useState(false);

        const div = (setIsFindCarOpen: (value: boolean) => void) => (
            <div className="cars_container">
                <div onClick={() => setIsFindCarOpen(true)} className="btn_add">Добавить авто</div>
            </div>
        )

        return (
            <div>
                {Array.isArray(chosenCars) ? chosenCars.map((car: any) => (
                    <div>
                        <p>{car.brand}</p>
                        <p>{car.model}</p>
                    </div>
                )):
                    <div>
                        <p>{chosenCars?.brand}</p>
                        <p>{chosenCars?.model}</p>
                    </div>
                }
                {Array.isArray(chosenCars)?div(setIsWindowOpen):!chosenCars&&div(setIsWindowOpen)}
                {isWindowOpen &&
                    <FindCarBlock
                        closeWindow={() => setIsWindowOpen(false)}
                        setChoosenItem={(item: CarItemFindCarType) => {Array.isArray(chosenCars)?setPersonChosenCars((prevState: string[]) => [...prevState, item]):setPersonChosenCars(item)}} />
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
                {!chosenOrganization&&div(setIsWindowOpen)}
                {isWindowOpen&&
                    <FindOrganizationBlock closeWindow={()=>setIsWindowOpen(false)} setChoosenItem={(item: OrganizationItemFindOrgType) => setPersonChosenOrganization(item)} />
                }
                <div>
                    <p>{chosenOrganization?.organization_name}</p>
                </div>
            </div>
        )
    }

    private renderFindPeopleWindow(chosenPeople: FindPeopleObjType|undefined, setChosenPeople: any) {
        const [isWindowOpen, setIsWindowOpen] = useState(false);

        const div = (setIsFindOrgOpen: (value: boolean) => void) => (
            <div className="cars_container">
                <div onClick={() => setIsFindOrgOpen(true)} className="btn_add">Найти человека</div>
            </div>
        )

        return (
            <div>
                {!chosenPeople&&div(setIsWindowOpen)}
                {isWindowOpen&&
                    <FindPeopleBlock closeWindow={()=>setIsWindowOpen(false)} setChoosenItem={(item: any) => setChosenPeople(item)} />
                }
                <div>
                    {chosenPeople&&<p>Серия/номер паспорта: {chosenPeople?.passport_series}/{chosenPeople?.passport_number}</p>}
                    {chosenPeople&&<p>{chosenPeople?.first_name} {chosenPeople?.last_name}</p>}
                </div>
            </div>
        )
    }

    private renderFindInspectorWindow(chosenInspector: InspectorItemFindOrgType|undefined, setChosenInspector: any){
        const [isWindowOpen, setIsWindowOpen] = useState(false);

        const div = (setIsFindOrgOpen: (value: boolean) => void) => (
            <div className="cars_container">
                <div onClick={() => setIsFindOrgOpen(true)} className="btn_add">Добавить инспектора</div>
            </div>
        )

        return (
            <div>
                {!chosenInspector&&div(setIsWindowOpen)}
                {isWindowOpen&&
                    <FindInspectorBlock closeWindow={()=>setIsWindowOpen(false)} setChoosenItem={(item: InspectorItemFindOrgType) => setChosenInspector(item)} />
                }
                <div>
                    <p>{chosenInspector?.name}</p>
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
                        elem.findInspectorNeed &&
                        this.renderFindInspectorWindow(AdditionalDataObject?.chosenInspector, AdditionalDataObject?.setChosenInspector)
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
                        elem.date && <Field type="date" name={elem.name} className="input" />
                    }
                    {
                        !elem.categories && !elem.findCarNeed && !elem.findOrganizationNeed && !elem.list&& !elem.date &&
                        !elem.findInspectorNeed && <Field name={elem.name} className="input" />
                    }
                </div>
                {
                    this.ErrorWorker?.renderErrors(elem)
                }
            </div>
        ))
    }

    public renderPartAccidentFields<Obj>(fieldsPart: FieldObject<Obj>[], AdditionalDataObject?: AdditionalDataObject){

        enum findByTypes {
            people, car
        }

        const {candidatePeople} = useSelector((state: RootState) => ({
            candidatePeople: state.userData.AccidentPage.candidatePeople
        }))

        const [findBy, setFindBy] = useState(findByTypes.people)

        return fieldsPart.map((elem) => (
            <div className="field" key={elem.name}>
                <p className="field_title">{elem.title}</p>
                <div className="addcarWindow_container">
                    {elem.findPeopleNeed&&
                    <div style={{display:'flex', cursor: 'pointer', alignItems: 'center', gap: '10px'}} onClick={()=>{setFindBy(findByTypes.people); AdditionalDataObject?.accident?.setChosenCars(null)}}>
                        <input type="checkbox" checked={findBy === findByTypes.people} />
                        <p>Поиск по владельцу</p>
                    </div>}
                    {elem.findCarNeed&&
                        <div style={{display:'flex', cursor: 'pointer',  alignItems: 'center', gap: '10px'}} onClick={()=>{setFindBy(findByTypes.car); AdditionalDataObject?.accident?.setChosenPeople(null)}}>
                        <input type="checkbox" checked={findBy === findByTypes.car}/>
                        <p>Поиск по автомобилю</p>
                    </div>}
                    {
                        !AdditionalDataObject?.accident?.chosenPeople && elem.findCarNeed && findBy == findByTypes.car &&
                        this.renderFindCarWindow(AdditionalDataObject?.accident?.chosenCars, AdditionalDataObject?.accident?.setChosenCars)
                    }
                    {
                        !AdditionalDataObject?.accident?.chosenCars && findBy == findByTypes.people && elem.findPeopleNeed && 
                        this.renderFindPeopleWindow(AdditionalDataObject?.accident?.chosenPeople, AdditionalDataObject?.accident?.setChosenPeople)
                    }
                    {
                        elem.findPeopleNeed && elem.list && findBy == findByTypes.car && !AdditionalDataObject?.accident?.chosenCars && 
                        <>Владелец не указан</>
                    }
                    {
                        elem.findPeopleNeed && candidatePeople &&
                        <>Серия/номер паспорта: {candidatePeople.passport_series}, {candidatePeople.passport_series}</>
                    }
    
                    {/* {
                        elem.findPeopleNeed && elem.list && findBy == findByTypes.car && AdditionalDataObject?.accident?.chosenCars && AdditionalDataObject?.accident?.chosenPeople &&
                        <>
                            <p>Серия/номер паспорта: {AdditionalDataObject?.accident?.chosenPeople?.passport_series}/{AdditionalDataObject?.accident?.chosenPeople?.passport_number}</p>
                            <p>{AdditionalDataObject?.accident?.chosenPeople?.first_name} {AdditionalDataObject?.accident?.chosenPeople?.last_name}</p>
                        </>
                    } */}
                    {
                        elem.findCarNeed && elem.list && findBy == findByTypes.people &&
                        <Field as="select" name={elem.name}>{elem.list.map((element:any) => (
                            <option value={element} key={element}>{element}</option>
                        ))}</Field>
                    }
                    {/* {
                    
                        AdditionalDataObject?.accident?.chosenPeople === null ||
                        AdditionalDataObject?.accident?.chosenCars === null && elem.list&&
                        <Field as="select" name={elem.name}>{elem.list.map((element:any) => (
                            <option value={element} key={element}>{element}</option>
                        ))}</Field>
                    } */}
                    {
                        !elem.findCarNeed && !elem.findInspectorNeed && !elem.findPeopleNeed && !elem.list && !elem.custom &&
                        <Field name={elem.name} className="input" />
                    }
                    
                </div>
                {
                    this.ErrorWorker?.renderErrors(elem)
                }
            </div>
        ))
    }

    public renderAccidentFields<Obj>(otherFileds: FieldObject<Obj>[], AdditionalDataObject?: AdditionalDataObject){


        return otherFileds.map((elem) => (
            <div className="field" key={elem.name}>
                <p className="field_title">{elem.title}</p>
                <div className="addcarWindow_container">
                    {
                        elem.findCarNeed &&
                        this.renderFindCarWindow(AdditionalDataObject?.chosenCarsArr, AdditionalDataObject?.setPersonChosenCars)
                    }
                    {
                        elem.findInspectorNeed &&
                        this.renderFindInspectorWindow(AdditionalDataObject?.chosenInspector, AdditionalDataObject?.setChosenInspector)
                    }
                    {
                        elem.list&&
                        <Field as="select" name={elem.name}>{elem.list.map((element) => (
                            <option value={element} key={element}>{element}</option>
                        ))}</Field>
                    }
                    {
                        !elem.findCarNeed && !elem.list && !elem.findInspectorNeed &&
                        <Field name={elem.name} className="input" />
                    }
                </div>
                {
                    this.ErrorWorker?.renderErrors(elem)
                }
            </div>
        ))
    }

    public validate<Component>(arrValidating: FieldObject<Component>[], formikValues: FormikValues) {
        arrValidating.forEach((field) => {
            if (field.validate)
                validator(field.validate, field.name, this.ErrorWorker.changeError, formikValues[`${field.name}`])
            if (field.elementController){
                if(
                    field.elementController.controller === null ||
                    field.elementController.controller === undefined || 
                    field.elementController.controller.length === 0
                )
                    validator(/\S/, field.name, this.ErrorWorker.changeError, '')
                else validator(/\S/, field.name, this.ErrorWorker.changeError, 's')
            }
        })

    }

    public sendRequest(func: () => void) {        
        if (this.ErrorWorker.getErrorArr().length == 0)
            func()
    }
}