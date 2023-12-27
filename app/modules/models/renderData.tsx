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
    value: any;
}


export class RenderData {

    public renderCarsData<Component>(fileds: FieldObject<Component>[]): ReactNode {
        return fileds.length == 0 ? <></> :
            fileds.map((elem) => (
                <div className="field_item_block" key={elem.name}>
                    <div className="title">{elem.title}</div>
                    <div className="field_value">{elem.value}</div>
                </div>
            ))
    }

}