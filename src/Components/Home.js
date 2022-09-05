import styled from "styled-components";
import ImgSlider from "./ImageSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommend";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/userSlice";

const Home = (props) =>{

    const userName = useSelector(selectUserName)
    let originals = [];
    let recommends = []; 
    let newDisneys = []; 
    let trending = []; 
    
    const dispatch = useDispatch()
    useEffect(() => {

        (async ()=>{
            const q = collection(db, "movies")
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            switch(doc.data().type){

                case 'original': originals = [...originals, {id: doc.id, ...doc.data()} ]
               break
                
                case "recommend" : recommends = [...recommends, { id: doc.id, ...doc.data()}]
                break
                
                case 'new': newDisneys = [...newDisneys, {id: doc.id, ...doc.data()} ]
                break

    
                case 'trending': trending = [...trending, {id: doc.id, ...doc.data()} ]
                break
                
            }
        })

    console.log(originals)
        dispatch(
            setMovies({
                recommend: recommends,
                newDisney: newDisneys,
                original: originals,
                trending: trending,
            })
        )
        })()
    }, [userName])
        

    return (
        <Container>
            <ImgSlider/>
            <Viewers />
            <Recommends/>
            <NewDisney/>
            <Originals />
            <Trending />
        </Container>
    )
}

const Container = styled.main`
position: relative;
min-height: calc(100vh - 250px);
overflow: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw + 5px);

&:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    overflow: hidden;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1; 
}
`

export default Home;