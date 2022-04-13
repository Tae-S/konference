// TODO: better logo shadows | dropdown styling
import './headerStyles.css'
import React from 'react'
import logo from '../static/images/logo.svg'
import search from '../static/images/search-icon.svg'
import mascotLarge from '../static/images/mascot-large.svg'
function Header()
{
    return(
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
            <div className='form header-form'>
                <div>
                    <label htmlFor='search'>Search</label>
                    <div className='search'>
                        <input id='search' type='text'/>
                        <img  src={search } alt='search'/>
                    </div>
                </div>
                <div>
                    <label htmlFor='options'>Past Events</label>
                    <select id='options'>
                        <option value="0">Select Type</option>
                        <option>True</option>
                        <option>False</option>
                    </select>
                </div>
            </div>
        </header>
    )
}

export default Header