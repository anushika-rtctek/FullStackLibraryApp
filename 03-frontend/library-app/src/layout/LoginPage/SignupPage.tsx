import axios from "axios"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const SignupPage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    const handleSignUp = async () => {
        try {
            if( !email || !password) {
                setError( "Please fill all the fields!" )
                return
            }

            const response = await axios.post("http://localhost:8080/api/signup", {
                email, password
            })

            // history("/home")
        } catch (error) {
            setError( "Something went wrong!")
        }
    }
    return (
        <div className="card mt-5 col-4 container d-flex mb-5 rounded shadow-lg">
            <div className="align-items-center">
            {error && <p className="text-danger">{error}</p>} 
                <form>
                    <div className="mt-3 align-text-center">
                        <h3>Sign Up Page</h3>
                        <hr/>
                    </div>
                    <div className="mt-4 mb-2">
                        <label> <h5>Ful Name</h5></label>
                        <div>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                        size={40} style={{ height: '60px', borderRadius: '5px', fontSize: '18px' }}  />
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label> <h5>Email</h5></label>
                        <div>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        size={40} style={{ height: '60px', borderRadius: '5px', fontSize: '18px' }}  />
                        </div>
                    </div>
                    <div className="mt-4 mb-2">
                        <label> <h5>Phone No.</h5></label>
                        <div>
                        <input type="number" value={phone} onChange={e => setPhone(e.target.value)}
                        size={40} style={{ height: '60px', borderRadius: '5px', fontSize: '18px' }}  />
                        </div>
                    </div>
                    <div className="mt-3 mb-2">
                        <label><h5>Password</h5></label>
                        <div>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} 
                        size={40} style={{ height: '60px', borderRadius: '5px', fontSize: '18px' }}/>
                        </div>
                    </div>
                    <div className="mt-3 mb-2">
                        <label><h5>Confirm Password</h5></label>
                        <div>
                        <input type="password" value={cnfPassword} onChange={e => setCnfPassword(e.target.value)} 
                        size={40} style={{ height: '60px', borderRadius: '5px', fontSize: '18px' }}/>
                        </div>
                    </div>
                    <div className="mt-5 mb-3">
                        <Link className="btn btn-primary main-color text-white" type="submit" to="/home">
                            Sign Up
                        </Link>
                    </div>
                    <div className="text-center"> 
                        <p>Already Register? <Link to="/login">Login</Link></p> 
                    </div> 

                </form>
            </div>
        </div>
    )
}