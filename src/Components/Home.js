// TODO: character count limit 45, if greater, add ... in the end
import './homeStyles.css'
// import Header from './Header'
import cardImage from '../static/images/card-img.svg'
import cardTop from '../static/images/card-top.svg'
import podium from '../static/images/podium.svg'
import infoCircle from '../static/images/infoCircle.svg'
import { useEffect, useState } from 'react'
//
import './headerStyles.css'
import React from 'react'
import logo from '../static/images/logo.svg'
import search from '../static/images/search-icon.svg'
import mascotLarge from '../static/images/mascot-large.svg'

function Home()
{
    const [ht, setHt] = useState(1596.81)
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(16)
    const [values, setValues] = useState({
        search: '',
        pastEvents: true
    })
    const [events, setEvents] = useState([])
    const API_URL = 'https://iitm1blt3l.execute-api.ap-southeast-1.amazonaws.com/dev/hosted-events?'
    useEffect(()=>{
        const _API_URL = API_URL + `limit=${limit}`
        fetchData(_API_URL)
            .then(data => {
                console.log(data)
                setEvents(data)
                try{
                    setOffset(prevState => prevState + Math.min(data.length, limit+1))
                }catch(err){
                    throw new Error(err, 'error occurred')
                }
                
            })
            .catch(err => console.log(err))
    }, [])
    //handling header-form changes
    const handleChange = e => {
        const _name = e.target.name
        console.log(_name)
        setValues(prevState => {
            if(_name === 'search') return {...prevState, search:e.target.value }
            else if(_name === 'past-events') return {...prevState, pastEvents:e.target.value }
        })
    }
    const handleClick = e =>{
        console.log(values)
        //fetching data
        const _API_URL = API_URL + `limit=${limit}&offset=${offset}?search_query='${values.search}'&past_events=${values.pastEvents}`
        console.log(_API_URL)
        fetchData(_API_URL)
            .then(data =>{
                //OLD: currently shows only first 12 results of the query results
                data = data.splice(0 + offset, Math.min(limit, data.length-1))
                setOffset(prevState => prevState + Math.min(data.length, limit+1))
                setEvents(data)
            })
            .catch(err => console.log(err))
    }
    const handleLoadMore = e =>{
        const LOAD_MORE_LIMIT = 12
        const _API_URL = API_URL + `limit=${LOAD_MORE_LIMIT}&offset=${offset}`
        console.log(_API_URL)
        fetchData(_API_URL)
            .then(data => {
                console.log(data)
                if(data === undefined) console.log('Undefined')
                setEvents(prevState => {
                    return [...prevState, ...data]
                })
                try{
                    setOffset(prevState => prevState + Math.min(data.length, LOAD_MORE_LIMIT+1))
                }catch(err){
                    throw new Error(err, 'error occurred')
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            {/* <Header /> */}
            <header>
                <div className='logo'>
                    <a href='/'>
                        <img src={logo} alt='Logo' />
                    </a>
                </div>
                <div className='header-static'>
                    <p>Events</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra</p>
                    <img src={mascotLarge} alt='Mascot'/>
                </div>
                <div className='header-form'>
                    <div>
                        <label htmlFor='search'>Search</label>
                        <div className='search'>
                            <input name='search' id='search' type='text' onChange={e => handleChange(e)} />
                            <img src={search } alt='search' onClick={e => handleClick(e)}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='options'>Past Events</label>
                        <select id='options' name='past-events' onChange={e => handleChange(e)} >
                            <option value="0">Select Type</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                </div>
            </header>
            <div className='app'>
                {events.length === 0? (
                    <p>Reading calendar and looking up events...</p>
                ):(
                    events.map(ev => <Event key={ev.event_id} name={ev.name} online={ev.is_virtual} free={ev.is_free}/>)
                )}
            </div>
            <div className='load-more-container'>
                <div className='bar'></div>
                <input className='btn' type='button' value='Load More' onClick={e => handleLoadMore(e)}/>
                <div className='bar'></div>
            </div>
        </>
    )
}

function Event({name, online, free})
{
    return(
        <div className='card'>
            <img className='card-img' src={ cardImage }  alt='Event thumbnail'/>
            <img className='card-top' src={ cardTop } alt='Card top'/>
            <div className='card-info'>
                <p className='title'>{ name.length > 45?name.substring(0, 44) + '...':name }</p>
                <div className='btm-left'>
                    <img className='card-podium' src={ podium } alt='Podium'/>
                    <p className='loc'>Raddison Blue</p>
                </div>
                <div className='btm-right'>
                    <img className='card-info-circle' src={ infoCircle } alt='Circular logo for information' />
                    <p className='free'>{ free?'Free':'Paid'}</p>
                    <p className='free-sep'>|</p>
                    <p className='online'>{online?'Online':'Offline'}</p>
                </div>
                
                
            </div>
        </div>
    )
}


export async function fetchData(API_URL)
{
    let returnThis = null
    await fetch(API_URL)
        .then(response=>{
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from server")
            }
            return response
        })
        .then(data => returnThis = data)
    if(returnThis) return returnThis.events
    else return []
    // const data = await response.json()
    // if(typeof(data) === 'undefined') return []
    // console.log(data.events)
    // return data.events
}


export default Home