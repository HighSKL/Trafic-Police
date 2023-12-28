import { CarItemFindCarType } from "@/app/types/types";
import { ReactNode } from "react";

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
    value?: any;
    carsList?: CarItemFindCarType[]
}


export class RenderData {

    public renderCarsData<Component>(fileds: FieldObject<Component>[]): ReactNode {
        return fileds.length == 0 ? <></> :
            fileds.map((elem) => (
                <div className="field_item_block" key={elem.name}>
                    {elem.value as Array<any>?<>
                    {elem.value.map((value:any) =>(
                        <div>{value.brand} {value.model}</div>
                    ))}
                    </>:
                    
                    <>
                        <div className="title">{elem.title}</div>
                        <div className="field_value">{elem.value}</div>
                    </>
                    }
                    
                </div>
            ))
    }

    public renderPeoplesData<Component>(fileds: FieldObject<Component>[]): ReactNode {
        return fileds.length == 0 ? <></> :
            fileds.map((elem) => (
                <div className="field_item_block" key={elem.name}>
                    {
                        elem.carsList?.map((value:any) =>(
                            <div>{value.brand} {value.model}</div>
                        ))
                    }
                    {!elem.carsList && 
                    <>
                        <div className="title">{elem.title}</div>
                        <div className="field_value">{elem.value}</div>
                    </>
                    }
                    
                </div>
            ))
    }

}