import Login from "./Login";


function Home({logIn, logOut}) {


    return (
        <div style={{textAlign: 'center'}}>
            <h1>Welcome to home page</h1>
            <div>
                <Login login={logIn} logout={logOut}/>
            </div>
        </div>
    );
}

export default Home;