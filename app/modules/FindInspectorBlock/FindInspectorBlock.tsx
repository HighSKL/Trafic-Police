import { useRef, useState } from 'react';
import style from './findinspector.module.scss'
import { IoMdClose } from "react-icons/io";
import { GetCurrentInspector } from '../apiservice';
import { InspectorItemFindOrgType } from '@/app/types/types';

type PropsType = {
    closeWindow: any,
    setChoosenItem: any
}

export default function FindInspectorBlock(props:PropsType) {

    const inputRef = useRef(null);

    const [items, setItems] = useState<Array<InspectorItemFindOrgType>>([])

    const findItems = async () => { 
        if(inputRef.current)
            setItems(await GetCurrentInspector(inputRef.current['value']).then(res=>res.data))
    }

    const chooseItem = (item: InspectorItemFindOrgType) => {
        props.setChoosenItem(item)
        props.closeWindow()
    }

    return (
        <div className={style.wrapper}>
            <div className={style.closeWindowBtn} onClick={props.closeWindow}><IoMdClose /></div>
            <input className={style.input} ref={inputRef} type="text" onChange={findItems} placeholder='Начните вводить имя инспектора '/>
            <div className={style.blocks_container}>
                {items.map((elem)=>(
                    <div className={style.item} onClick={()=>{chooseItem(elem)}}>
                        <p>{elem.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}