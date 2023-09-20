import React from 'react'
import { Link } from 'react-router-dom';


export default function About() {
    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary fw-bold mb-4 ">About Us</h1>
                        <p className="lead mb-4 fs-bold">
                            Welcome to our online shop, where style meets convenience. Discover a curated selection of high-quality products
                            designed to elevate your everyday life. From fashion-forward apparel and accessorie, our shop offers something for everyone.
                            Our commitment to excellence means you can shop with confidence, knowing that every item is handpicked for its quality and uniqueness.
                            we're here to make your online shopping experience
                            enjoyable and hassle-free. Explore our collections and treat yourself or your loved ones to a touch of luxury today.
                        </p>
                        <Link to="/contact" className="btn btn-outline-primary px-3">Contact Us</Link>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src="https://www.peoplecube.ai/assets/img/about-us.png" 
                        alt="About Us" height="400px" width="700px" />
                    </div>
                </div>
            </div>
        </div>
    )
}
