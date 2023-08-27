import { useEffect, useState } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import user from './Images/Removal-658.png';

const Profile = () => {
    const [path, setPath] = useState('ex')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const authAxios = axios.create({
        baseURL: "http://localhost:3001/getUser",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("token"))) {
            navigate("/login")
        }
        authAxios.get('http://localhost:3001/getUser')
            .then(users => {
                setUsers(users.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(()=>{
        if (!path) {
            navigate('/home')
        }
    }, [path])

    return (
        <>
            <div className="btn-c">
                <button className="btn"
                    onClick={() => {
                        setPath(null)
                    }}
                >Back to Home</button>
            </div>
            <div className="user">
                {/* {users.map(users =>{
            return (
                <>
                <h1>{users.email}</h1>
                <h1>{users.f_name} {users.l_name}</h1>
                </>
                );
        })} */}
                <div className="profile-header">
                    <div className="img-container">
                        <img src={user} alt="" />
                    </div>
                    <h1>{`${users.f_name}  ${users.l_name}`}</h1>
                </div>
                <div className="profile-card">
                    <div className="credentials">
                        <h2>First Name: </h2>
                        <h2>{users.f_name}</h2>
                    </div>
                    <div className="credentials">
                        <h2>Last Name: </h2>
                        <h2>{users.l_name}</h2>
                    </div>
                    <div className="credentials">
                        <h2>E-mail: </h2>
                        <h2>{users.email}</h2>
                    </div>
                    <div className="credentials last">
                        <h2>Phone: </h2>
                        <h2>{users.phone}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile