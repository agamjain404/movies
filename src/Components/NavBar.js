import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', marginTop: '2rem', marginLeft: '1.5rem'}}>
        <Link to='/' style={{ textDecoration: 'none' }}><h1 style={{fontSize: '30px'}}>Movies App</h1></Link>
        <Link to='/favourites' style={{ textDecoration: 'none' }}><h2 style={{fontSize: '24px', marginLeft: '2rem', marginTop: '0.5remrem'}}>Favourites</h2></Link>
      </div>
    )
  }
}
