import {Route, Redirect} from "react-router-dom";

function SecuredRoute(props) {
    return (
        <Route path={props.path} render={data => props.login ? (
                <props.component {...data}/>) :
            (
                <Redirect to={{pathname: '/'}}/>)}/>
    )
}

export default SecuredRoute