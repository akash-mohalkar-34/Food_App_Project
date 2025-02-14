/* eslint-disable no-constant-binary-expression */
/* eslint-disable react/jsx-key */
import React from "react";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";



export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    // console.log(foodCat);

    const loadData = async () => {
        let response = await fetch("http://localhost:8000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodCat(response[0]);
        setFoodItem(response[1]);
    }

    useEffect(() => {
        loadData();

    }, [])

    return (
        <div>
            <Navbar />

            <div>   <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "object-fit-contain border rounded !important" }}>

                <div className="carousel-inner" id="carousel">

                    <div className="carousel-caption" style={{ zIndex: 10 }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {   /* <button className="btn btn-outline-success default text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg" className="d-block w-100 " style={{objectFit:"fill", filter: "brightness(100%) " }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/photos/king-fish-biryani-with-raita-serv…" className="d-block w-100" style={{ objectFit: "fill", filter: "brightness(80%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/photos/king-fish-biryani-with-raita-serv…" className="d-block w-100" style={{ objectFit: "fill", filter: "brightness(80%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>

            <div className="container">
                {
                    foodItem != [] ?
                        foodItem.map((data) => {
                            return (
                                <div className='row m-3'>
                                    <div key={data._id} className="fs-3 m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr></hr>
                                    {
                                        foodCat != [] ?
                                            foodCat.filter((item) =>
                                                (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLowerCase()))
                                                .map((filterItem) => {
                                                //    console.log(filterItem);
                                                    return (
                                                        <div key={filterItem._id} className=" m-6 col-12 col-md-6 col-lg-3" style={{ margin: "2rem" }}>
                                                            <Card
                                                                foodItem={filterItem}
                                                                
                                                                options={filterItem.options[0]} />
                                                        </div>
                                                    )
                                                }) : ""
                                    }
                                </div>
                            )
                        }) : ""
                }
            </div>
            <Footer />

        </div>
    )
} 