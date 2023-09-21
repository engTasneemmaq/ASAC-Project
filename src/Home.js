import React from 'react'
import Categories from './categories'

export default function Home() {
    return (
        <div className='hero'>
            <div className="card text-bg-dark">
                <img src="https://images.herzindagi.info/image/2022/Oct/how-to-do-shopping.jpg" 
                className="card-img" alt="background" height="900px"  />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className="container"></div>
                    <h5 className="card-title display-3 fw-bolder mb-0">New Season Arrivals</h5>
                    <p className="card-text lead fs-2"> 
                     CHECK OUT ALL THE TRENDS</p>
                </div>
            </div>
            <Categories/>
        </div>
    )
}
