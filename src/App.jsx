import React, { useState, useEffect } from 'react';
import { initialMovies } from './data/movies';


function App() {

    const [favorite, setfavorite] = useState(0)
    
    
    const [activeTab, setactiveTab] = useState("All")
    console.log(activeTab);
    
    
    
    const [movies, setmovies] = useState(initialMovies)
  
   

    useEffect(() => {
    let savedCount = localStorage.getItem("favoriteCount")
   
    
    if (savedCount) {
        setfavorite(Number(savedCount))
    }
  
    }, [favorite])
    useEffect(() => {
       let savedMovies = localStorage.getItem("svgsCount");
    if (savedMovies) {
        setmovies(JSON.parse(savedMovies)); 
    }
  
    }, [])
    

    
 const saveToFS = (count) => {
    localStorage.setItem("favoriteCount", count)
  }
 const saveToMS = (updateFavouritesSvgs) => {
    localStorage.setItem("svgsCount", JSON.stringify(updateFavouritesSvgs));
  }


    const favouriteClick = (clickedID) => {
        
        
     const updateMovies = movies.map((movie)=>{
        if (movie.id === clickedID) {
            return {...movie,isFavorite : !movie.isFavorite}
        }
      
        
        return movie
     })
    
     setmovies(updateMovies)
      saveToMS(updateMovies)
    
     const totalFavorites = updateMovies.filter((movie)=>
        movie.isFavorite === true).length
     setfavorite(totalFavorites)
     saveToFS(totalFavorites)
    }





const filterMovies = movies.filter((movie)=>{
    if (activeTab === "All") {
        return true
    }else if(activeTab === "Favorites"){

        return movie.isFavorite === true
    }else if(activeTab === "Watching"){
        return movie.status === "watching"
    }else if(activeTab === "Watched"){
        return movie.status === "watched"
    }
    else if(activeTab === "Up Next"){
        return movie.status === "Up Next"
    }
})


    return (
        <>
            <div className="container w-[70vw] h-screen overflow-hidden bg-gray-300 flex flex-col">
                <div className="box  flex flex-col m-3">
                    <div className="firstLine flex justify-between">


                        <div className="LogoAndName flex  items-center justify-center">
                            <img className='w-10 h-10' src="/icons/cuts.png" alt="" />
                            <p className='font-bold text-2xl'>Movie Watchlist</p>
                        </div>
                        <div className="button ">
                            <button className='text-black flex gap-2 border p-1 font-bold rounded-2xl'><img src="components/plus.svg" alt="" />
                                Add new movie</button>
                        </div>
                    </div>
                    <div className="secondLine m-2 flex">
                        <p className='font-bold'>My Collection: </p>
                        <p>{initialMovies?.length || 0} Movies</p>
                    </div>
                    <div className="thirdLine flex space-x-5 ">

                        <button
                            onClick={()=>{setactiveTab("All")}}
                            id="allBtn"
                            className={`border rounded-2xl p-1 w-20 ${activeTab === "All" ? "bg-blue-400 " : ""
                                }`}
                            type="button"
                        >
                            All ({initialMovies?.length || 0})
                        </button>
                        
                        <button onClick={()=>{setactiveTab("Up Next")}} id='upNExtbtn' className={`border rounded-2xl p-1 w-30 ${activeTab === "Up Next" ? "bg-blue-400 " : ""
                                }`} type='button'>Up Next({movies.filter((movie)=>{return movie.status?.trim() === "Up Next"}).length})  </button>

                        <button onClick={()=>{setactiveTab("Watching")}} id='watchingbtn' className={`border rounded-2xl p-1 w-30 ${activeTab === "Watching" ? "bg-blue-400 " : ""
                                }`} type='button'>Watching ({movies.filter((movie)=>{return movie.status === "watching"}).length})  </button>

                        <button onClick={()=>{setactiveTab("Watched")}} id='watchedbtn' className={`border rounded-2xl p-1 w-30 ${activeTab === "Watched" ? "bg-blue-400 " : ""
                                }`} type='button'>Watched ({movies.filter((movie)=>{return movie.status === "watched"}).length}) </button>


                        <button onClick={()=>{setactiveTab("Favorites")}}className={`border rounded-2xl p-1 w-30 ${activeTab === "Favorites" ? "bg-blue-400 " : ""
                                }`}  type='button'>Favorites ({favorite}) </button>

                    </div>
                </div>

                <div className="movieCardContainer w-full p-6 flex flex-wrap flex-1 overflow-y-auto scrollbar-none">


                    {filterMovies.map((movie) => (
                        <article className="movieCard flex flex-col border w-40 p-3 m-3 rounded-2xl">
                            <div className="posterContainer  flex  relative h-44">
                                <img className=' relative m-2 w-full h-[90%] object-cover rounded-2xl' src={movie.poster} alt="" />
                                <button className="favoriteBtn absolute top-0 right-0 z-10 m-4"><img onClick={()=>favouriteClick(movie.id)} src={movie.isFavorite ? "/components/favoriteWhite.svg" : "/components/favorite.svg"} alt="favorite" /></button>
                            </div>

                            <div className="movieDetails gap-1.5  flex flex-col">
                                <h3 className="title text-sm">{movie.title}</h3>

                                <div className="yearGenre text-sm">
                                    <span className="year p-2 text-xs">{movie.year}</span>
                                    <span className="genre p-1 text-xs bg-gray-400 rounded-2xl">{movie.genre} </span>
                                </div>

                                <div className="rating">{movie.rating}</div>

                                <div className="status border flex justify-center rounded-2xl bg-[#2596be]">{movie.status}</div>


                            </div>
                        </article>
                    ))

                    }

                </div>
            </div>
        </>
    )
}


export default App;


