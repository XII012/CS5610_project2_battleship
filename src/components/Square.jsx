import React, { useContext, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Square.css';
import { BsXLg } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { BsFillRecordFill } from "react-icons/bs";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../Constants';




function classNames(classes) {
    return Object.entries(classes)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
      .join(' ');
  }

export function Square(props) {

    const hit = props.hit;
    const ship = props.ship;
    let content = '';


    const dispatch = useDispatch();

    if ((ship!==undefined) && props.board === "board1") {
        content = <BsFillRecordFill />;
    }

    // Cheat: Show the ships of the board2
    // if ((ship!==undefined)) {
    //     content = <BsFillRecordFill />;
    // }

    if(hit && (ship!==undefined)) {
        content = <BsXLg />;
    }
    if (hit && (ship === undefined)) {
        content = <BsCheckLg />
    }

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.SHIP,
        drop: (item) => dispatch({
            type: 'SELECT_SHIP',
            x: props.x,
            y: props.y,
            board: props.board,
            shipNum: item.num,
            shipId: item.id,
        }),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    })
    


    let liClasses = classNames({
        'backgroundAqua': hit && (ship === undefined),
        'backgroundCoral': hit && (ship!==undefined),
        'backgroundWhite': !hit,
        'contentRed': hit && (ship!==undefined),
        'contentBlack': !hit,
        'backgroundgreen': isOver,
        'square': true
      });


    if (props.winning) {
        return (<div class={liClasses}> {content}</div>);
    } else {
        return (<div onClick={() => {
            dispatch({
                type: 'boardClick',
                x: props.x,
                y: props.y,
                board: props.board,
                playing: props.playing,
                hit: hit,
            })
        }
        } 
        ref={drop} 
        class={liClasses}>
            {content}
        </div>);

    }
}
