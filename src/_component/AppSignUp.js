

const AppSignUp = ({login}) =>{
    return <>
    <h1>signup page</h1>
    <p>Already have account? <a href="#" onClick={()=> login(true)}>Login</a></p>
    </>
}
export default AppSignUp