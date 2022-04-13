import React from 'react'
import { useEffect } from 'react'
import './chessStyles.css'

function Chess()
{
    useEffect(()=>{
        //generate chessboard
        const grid = document.querySelector('.grid')
        for(let i=0; i<64; i++){
            const box = document.createElement('div')
            box.setAttribute('data-id', i)
            box.setAttribute('class', 'box')
            box.addEventListener('click', (e)=>{
                e.target.style.background = 'yellow'
                const _id = e.target.dataset.id
                const boxes = document.querySelectorAll('.box')
                boxes.forEach(b => {
                    if(b.getAttribute('data-id') !== _id) b.style.background = b.getAttribute('data-color')
                })
            })
            // box.addEventListener('mouseleave', e => {
            //     e.target.style.background = e.target.dataset.color
            // })
            //assigning white and black
            const row = Math.floor(i/8)
            const _in = i%2
            // console.log(i, 'has row, _in: ', row, _in)
            if(row%2 === 0){
                if(_in === 0){
                    box.style.backgroundColor = '#000000'
                    box.setAttribute('data-color', 'black')
                }
                else{
                    box.style.backgroundColor = '#ffffff'
                    box.setAttribute('data-color', 'white')
                }
            }
            else{
                if(_in === 1){
                    box.style.backgroundColor = '#000000'
                    box.setAttribute('data-color', 'black')
                }
                else{
                    box.style.backgroundColor = '#ffffff'
                    box.setAttribute('data-color', 'white')
                }
            }
            grid.append(box)
        }
        return() => {}
    }, [])

    return(
        <div className='grid'></div>
    )
}

export default Chess