import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { 
    selectUserName,
    selectUserPhoto,
    setSignOutState,
    setUserLoginDetails
} from "../features/userSlice";

const Header = (props) =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = useSelector(selectUserName)
    const userphoto = useSelector(selectUserPhoto)

    useEffect(() => {
        auth.onAuthStateChanged(async(user) =>{
            if(user){
                setUser(user)
                navigate("/home")
            }
        })
    }, [userName])

    const handleAuth = () =>{
        if(!userName){
            signInWithPopup(auth, provider)
            .then((result) =>{
                setUser(result.user)
            })
            .catch((error) =>{
                console.log(error.message)
            })
        } else if(userName){
            auth.signOut().then(()=>{
                dispatch(setSignOutState())
                navigate('/')
            }).catch((err) => alert(err.message))
        }
    }

    const setUser = (user) =>{
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            })
        )
    }



    return <Nav>
        <Logo>
            <img src="/images/logo.svg" alt="Disney" />
        </Logo>

        { !userName ? (
            <Login onClick={handleAuth}>Login</Login> 
            ) : ( 
            <>
                <NavMenu>
                    <a href="/home">
                        <img src="/images/home-icon.svg" alt="Home" />
                        <span>HOME</span>
                    </a>
                    <a>
                        <img src="/images/search-icon.svg" alt="Search" />
                        <span>SEARCH</span>
                    </a>
                    <a>
                        <img src="/images/watchlist-icon.svg" alt="Watchlist" />
                        <span>WATCHLIST</span>
                    </a>
                    <a>
                        <img src="/images/original-icon.svg" alt="Og" />
                        <span>ORIGINAL</span>
                    </a>
                    <a>
                        <img src="/images/movie-icon.svg" alt="Movies" />
                        <span>MOVIES</span>
                    </a>
                    <a>
                        <img src="/images/series-icon.svg" alt="Series" />
                        <span>SERIES</span>
                    </a>
                    
                </NavMenu>
                <SignOut>
                <UserImg src={userphoto} alt={userName} />
                <DropDown>
                    <span onClick={handleAuth}>Signout</span>
                </DropDown>
                </SignOut>
            </> 
            )}
    </Nav>
}

const Nav = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color: #0c111b;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;
`
const Logo = styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 78px;
font-size: 8;
display: inline-block;
img {
    display: block;
    width: 100%;
}
`
const NavMenu = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
margin: 0px;
padding: 0px;
position: relative;
margin-right: auto;
margin-left: 25px;

a{
display: flex;
align-items: center;
padding: 0 12px;

    img{
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }

    span {
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        padding: 2px 0px;
        white-space:nowrap;
        position: relative;

        &:before{
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            left: 0px;
            opacity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            visibility: hidden;
            width: auto;
        }
    } 

    &:hover{
        span:before{
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
        }
    }

}

@media (max-width: 768px){
display: none;
}

`

const Login = styled.a`
background-color: rgba(0, 0, 0, 0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease 0;
cursor: pointer;
&:hover{
    background-color: #f9f9f9;
    color: #000;
}
`

const UserImg = styled.img`
height: 100%;
`

const DropDown = styled.div`
position: relative;
top: 48px;
right: 0px;
background: rgb(19, 19, 19);
border: 1px solid rgba(151, 151, 151, 0.34);
border-radius: 4px;
box-shadow: rgb(0 0 B / 506) 0px 0px 18px 0px;
padding: 10px;
font-size: 14px;
letter-spacing: 3px;
width: 100px;
opacity: 0;
`

const SignOut = styled.div`
margin-right: 2%;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;


${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%
}

&:hover {
    ${DropDown} {
        opacity: 1;
        transition-duration: 1s;
        transition: ease-in-out;
    }
}

`
export default Header;