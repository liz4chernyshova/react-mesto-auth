import { useLocation, Link, Route, Switch } from 'react-router-dom';

export default function Header(props) {

    const userLocation = useLocation();

    return ( 
        <header className="header"> 
            <div className="header__logo"></div> 

            {userLocation.pathname === "/" && ( 
                <div className="header__logged"> 
                    <p className="header__email">{props.email}</p> 
                    <a className="header__link" onClick={props.onSignout}>Выйти</a> 
                </div> 
            )} 
            {userLocation.pathname === "/sign-up" && ( 
                <Link to="/sign-in" className="header__link">Войти</Link> 
            )} 
            {userLocation.pathname === "/sign-in" && ( 
                <Link to="/sign-up" className="header__link">Регистрация</Link> 
            )} 
        </header> 
    );
}
