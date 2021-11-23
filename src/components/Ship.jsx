import { Square } from "./Square";
import { useDrag } from 'react-dnd'
import { ItemTypes } from "../Constants";


export default function Ship(props) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
        item: {
            id: props.shipId,
            num: props.shipNum,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
          }),
    }))

    const ship =[];
    for (let i=0;i<props.shipNum;i++) {
        ship.push(<Square hit={false} ship ={false} x={0} y={0}
            board={"board1"} playing = {"board1"} winning = {false}/>);
    }

    if (!props.hidden) {
        return (
            <div 
                class="ship"
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    fontSize: 25,
                    fontWeight: 'bold',
                    cursor: 'move',}}
            >
              {ship}
              </div>
        )
    } else {
        return (
            <div 
                class="hidden"
            >
              {ship}
              </div>
        )
    }

    
}
