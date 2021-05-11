import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import "./AppBody.css"

const Title = () =>{
    return(
        <h1>
            Rick and Morty wiki
        </h1>
    )
}


const Footer = () =>{

    const footerStyle={
        padding: "11px",
        width: "100%",
        color: "lightgreen",
        textAlign: "center",
        background: "rgb(18 18 70)",
        marginTop: "33px"
    }

    return(
        <div style={ footerStyle }>
            <a href="" ></a>
            developed by giuseppe tarallo  :: <a href="mailto:tarallo.giuseppe@libero.it">✉️</a> :: <a href="https://www.dev-ita.it" target='_blank'>💻</a> ::  <a href="https://github.com/pippo-github" target='_blank'> 📄 </a> :: -==- London 2021 -==-  
        </div>
    )
}


const AppBody = () => {

    const [allCharatters, setAllCharatter] = useState([])
    const [singleCharatter, setSingleCharatter] = useState([])
    const [showAll, setShowAll] = useState(false)
    const [showCaratterDetail, setShowCaratterDetail] = useState(false)

    const [nextPage, setNextPage] = useState("")
    const [prevPage, setPrevPage] = useState("")

    const [initialPage, setCurPage] = useState(1) 
    const [dettailPage, setDettailPage] = useState(false) 

    const [currentPage, setCurrentPage] = useState(1)

    const [findText, setFindText] = useState("")

    const [findNotFoud, setFindNotFoud] = useState(false)


    const my_labelStyle={
        marginRight: "11px",
        minWidth: "77px",
        // border: "solid red 1px",
        display: "inline-block"
    }

    const submitFindText = async (e) =>{

        e.preventDefault();
        let baseUrl = `https://rickandmortyapi.com/api/character?page=${currentPage}`;

        const result = await fetch(baseUrl)
        const dataJson = await result.json()

        let charachtersVector = dataJson.results

        const retVet = charachtersVector.filter( (charatter) => charatter.name.toLowerCase().indexOf(findText.toLocaleLowerCase()) !== -1  )

        setAllCharatter({results: retVet})

        if(retVet.length > 0){
            setFindNotFoud(true)
        }
        else
        setFindNotFoud(false)

        
    }
    

    let baseUrl = `https://rickandmortyapi.com/api/character?page=${initialPage}`;

    async function  getApi(url){


        const result = await fetch(url);
        const jsonData = await result.json();

        setAllCharatter(jsonData)

        setNextPage(jsonData.info.next)
        setPrevPage(jsonData.info.prev)
    }

    const loadAllContents = () => {
        console.log( allCharatters )
        setShowAll(!showAll)
    } 
    

    const getSpeficicCharatter = async (id) =>{

        let baseUrl = `https://rickandmortyapi.com/api/character/${id}`;


        const result = await fetch(baseUrl);
        const characterPage = await result.json();

        setAllCharatter([])

        setSingleCharatter(characterPage)
        setShowCaratterDetail(true)
        setShowAll(false)
    }

    const loadCarateristPage = (name, id) => {
        setSingleCharatter([])

        getSpeficicCharatter(id);  
        setDettailPage(true)      
    } 
    

    useEffect( () =>{

        getApi(baseUrl)
        
    },[])
    

    return(
        <div>


            {
            !dettailPage && (
            <div className='bg-info' style={{marginBottom:"44px"}} >

                    <div>
                        <form onSubmit={ (event) =>{ submitFindText(event) } }>

                                <span >
                                        <input onChange={ (e) =>{ setFindText( e.target.value ) } } className='form-control' style={{ width:"70%", float:"left"}} type="text" name="inputText" id="" />
                                        <button className='btn btn-danger' style={{ width:"30%"}} > find into the page </button>
                                </span>

                        </form>
                    </div>

            </div>
            )
            }

            {
                !dettailPage && (
                <div style={{marginBottom:'11px'}}>
                    <a href="#" className='btn btn-success' style={ nextPage !== null ? {display: "inline-block"} : { display: "none" } } onClick={ () => nextPage && getApi( nextPage ) && setCurrentPage(currentPage + 1)}> next page </a>
                    <span> { currentPage } of 34 </span>
                    <a href="#" className='btn btn-success' style={ prevPage !== null ? {display: "inline-block"} : { display: "none" } } onClick={ () => prevPage && getApi( prevPage ) && setCurrentPage(currentPage - 1) }> prev page </a>
                </div>
                )
            }

                <div className="elements">  
                {
                    showCaratterDetail &&
                    allCharatters.results && allCharatters.map( (e, idx) =>{
                        const {id, name, status, species, image, gender} = e
                        return(
                            <div>
                                { e.name }
                            </div>
                        )
                    })                     
                }

                {
                    !showCaratterDetail &&
                    allCharatters.results && allCharatters.results.map( (e, idx) =>{
                        const {id, name, status, species, image, gender} = e
                        return(

                        (!showAll) ? 
                            
                            (idx <= 11) &&
                                <div  key={id} >
                                    <div className='element' onClick={ ()=> loadCarateristPage(name, id) }>
                                            <div className="titleImg">
                                            { name }
                                            </div>
                                            <img src={image} alt="img missed" title={ "go to the " + name + " page" } />
                                    </div>
                                </div>
                        :
                                <div  key={id} >
                                    <div className='element' onClick={ ()=> loadCarateristPage(name, id) }>

                                            <div className="titleImg">
                                            { name }
                                            </div>
                                            <img src={image} alt="" />
                                    </div>
                                </div>
                        )                    
                    })
                }

                    {
                                showCaratterDetail &&
 
                                <div className='elements bg-info'>

                                    <div key={singleCharatter.id} className='element card card-body'>

                                       <div className='d-flex card card-title' style={{fontFamily:"cursive", fontSize: "22px"}}>{singleCharatter.name}</div>

                                       <img src={singleCharatter.image} alt="" />
                                       <div className='card card-body' style={{marginTop: "11px"}}>
                                            <div><span style={ my_labelStyle }>Status: </span> {singleCharatter.status}</div>
                                            <div><span style={ my_labelStyle }>Species: </span> {singleCharatter.species}</div>
                                            <div><span style={ my_labelStyle }>Gender: </span> {singleCharatter.gender}</div>
                                            <div><span style={ my_labelStyle }>Origin: </span> {singleCharatter.origin.name}                                        </div>
                                        </div> 

                                    </div>
                                    <ul  className='element' style={{ maxHeight: "250px", overflow:"auto"}}>
                                        { singleCharatter.episode.map( (e, idx) =>{
                                                return(

                                                        <li key={idx}>
                                                           <a href={e}>{e.substr(e.indexOf("episode"), e.lenght).replace("/" ," ")}</a>
                                                        </li> 
                                               )
                                           })
                                        }                           
                                    </ul>
                                </div>
                    }

                    </div>

                    {
                        (!showCaratterDetail) && 
                        <button className='btn btn-success' onClick={ () =>{ loadAllContents() } }> { (showAll) ? "show less contens" : "load other contents" } </button>
                    }
                    {
                        (showCaratterDetail) &&
                        <a style={{marginTop:"11px"}} href="/" className='btn btn-success'> back to home </a>                        
                    }
                    
        </div>
    )

}



const AppComponent = () =>{
    return(
        <div>            
            <Title/>
            <AppBody/>
            <Footer/>
        </div>
    )
}


export default AppComponent;

if (document.getElementById('root')) {
    ReactDOM.render(<AppComponent />, document.getElementById('root'));
}
