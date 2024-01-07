import { useRef, useState } from 'react';
import style from './findpeople.module.scss'
import { IoMdClose } from "react-icons/io";
import { GetCurrentPeople } from '../apiservice';
import { FindPeopleObjType } from '@/app/types/types';

type PropsType = {
    closeWindow: any,
    setChoosenItem: any
}

export default function FindPeopleBlock(props:PropsType) {

    const inputRef = useRef(null);

    const [items, setItems] = useState<Array<FindPeopleObjType>>([])

    const findItems = async () => { 
        if(inputRef.current)
            setItems(await GetCurrentPeople(isNaN(parseInt(inputRef.current['value']))?0:parseInt(inputRef.current['value'])).then(res=>res.data))       
    }

    const chooseItem = (item: FindPeopleObjType) => {
        props.setChoosenItem(item)
        props.closeWindow()
    }

    return (
        <div className={style.wrapper}>
            <div className={style.closeWindowBtn} onClick={props.closeWindow}><IoMdClose /></div>
            <input className={style.input} ref={inputRef} type="text" onChange={findItems} placeholder='Начните вводить номер паспорта человека'/>
            <div className={style.blocks_container}>
                {items.map((elem)=>(
                    <div className={style.item} onClick={()=>{chooseItem(elem)}}>
                        <p>Серия/номер паспорта: {elem.passport_series}/{elem.passport_number}</p>
                        <p>{elem.first_name} {elem.last_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}