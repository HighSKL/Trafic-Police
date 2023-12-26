import { useRef, useState } from 'react';
import style from './findpeople.module.scss'
import { IoMdClose } from "react-icons/io";
import { GetCurrentInspector, GetCurrentPeople } from '../apiservice';
import { FindPeopleObjType, InspectorItemFindOrgType } from '@/app/types/types';

type PropsType = {
    closeWindow: any,
    setChoosenItem: any
}

export default function FindPeopleBlock(props:PropsType) {

    const inputRef = useRef(null);

    const [items, setItems] = useState<Array<FindPeopleObjType>>([])

    const findItems = async () => { 
        if(inputRef.current){
            const itemss = await GetCurrentPeople(inputRef.current['value']).then(res=>res.data)
            setItems(itemss)
            console.log(itemss)
        }
            
    }

    const chooseItem = (item: FindPeopleObjType) => {
        props.setChoosenItem(item)
        props.closeWindow()
    }

    return (
        <div className={style.wrapper}>
            <div className={style.closeWindowBtn} onClick={props.closeWindow}><IoMdClose /></div>
            <input className={style.input} ref={inputRef} type="text" onChange={findItems} placeholder='Начните вводить имя человека'/>
            <div className={style.blocks_container}>
                {items.map((elem)=>(
                    <div className={style.item} onClick={()=>{chooseItem(elem)}}>
                        <p>{elem.owner_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}