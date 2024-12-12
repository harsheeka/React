import ResCard from "./ResCard"
import { useState, useEffect } from "react"
import Shimmer from "./Shimmer";

const Body = () => {
    const[lisRes, setlisRes] =  useState([]);  //has to be declared inside the component !!!!!!!
    const[flisRes,setflisRes] = useState([]);  //new state varibale for filtered content and to not modify our original data

    const[searchText,setSearchText] = useState([""]);

    const fetchData = async() =>{   //fetch data from an api !!!!!

        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");    //we use asynch and await to resolve promise
        const json = await data.json();   //convert the data fetched to json

        setlisRes(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants); //to update the new  rendered data on UI !!!!!!!!!
        setflisRes(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };


    useEffect(()=>{ fetchData() },[]);


    return lisRes.length===0 ? <Shimmer/> : 
    (
        <div className="body">
            <div className="filter">
                <div className="search"> 
                   <input type="text" placeholder="search here..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                   <button className="search-btn" onClick={()=> {
                    const filterlis = lisRes.filter((res) => { return res.info.name.toLowerCase().includes(searchText.toLowerCase()) } );
                    setflisRes(filterlis);
                   }} >Search</button>
                </div>

                <button className="filter-btn" onClick = { () => {
                    const filteredLis = lisRes.filter( (res) => { return (res.info.avgRating >= 4 )} );
                    setflisRes(filteredLis);
                }
                }> Top restaurants</button>

            </div>
            <div className = "res-container">
                {
                    flisRes.map(
                        (restaurant) => (<ResCard key = {restaurant?.info?.id} resData={restaurant}/>)
                    )
                }
            </div>
        </div>
    )
}

export default Body;