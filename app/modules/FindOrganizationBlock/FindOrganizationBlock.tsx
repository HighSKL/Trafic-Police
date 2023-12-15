import { useRef, useState } from 'react';
import style from './findorganization.module.scss'
import { IoMdClose } from "react-icons/io";
import { GetCurrentCar, GetCurrentOrganization } from '../apiservice';
import { CarItemFindCarType } from '@/app/types/types';

type PropsType = {
    closeWindow: any,
    setChoosenItem: any
}

export default function FindOrganizationBlock(props:PropsType) {

    const inputRef = useRef(null);

    const [items, setItems] = useState<Array<CarItemFindCarType>>([])

    const findItems = async () => { 
        if(inputRef.current)
            setItems(await GetCurrentOrganization(inputRef.current['value']).then(res=>res.data))
    }

    const chooseItem = (item: CarItemFindCarType) => {
        props.setChoosenItem(item)
        props.closeWindow()
    }

    return (
        <div className={style.wrapper}>
            <div className={style.closeWindowBtn} onClick={props.closeWindow}><IoMdClose /></div>
            <input className={style.input} ref={inputRef} type="text" onChange={findItems} placeholder='Начните вводить название организации '/>
            <div className={style.blocks_container}>
                
                {items.map((elem)=>(
                    <div className={style.item} onClick={()=>{chooseItem(elem)}}>
                        <p>{elem.brand}</p>
                        <p>{elem.model}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}