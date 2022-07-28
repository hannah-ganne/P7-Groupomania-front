import user from '../assets/user.png'
import '../utils/style/profile.css'
import Button from '../components/Button'
import Avatar from '@mui/material/Avatar'
// import Avatar from '../components/Avatar'

import { Link } from 'react-router-dom'
import useFetch from '../utils/hooks/useFetch'
import { useState } from 'react'
import { isUpFor } from '../docs/list'

export default function Profile() {

    const { data, loading, error } = useFetch('GET', 'http://localhost:3000/api/auth/viewProfile')
    
    if (error) {
        console.log(error)
    }

    function checkVowel() {
        const vowels = ['A', 'E', 'I', 'O', 'U']
        return vowels.includes(data.oneWord.slice(0, 1)) ? 'an' : 'a'
    } 

    const suggestion = (
        <p>Please complete your profile</p>
    )
    
    return (
        <>
            { loading && <div>loading...</div>}
            { data && <section className="profile">
            <h2 className="profile-title">Profile</h2>
            <div className="profile-info">
                <div className="profile-avatar-readonly">
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            mr: 5
                            }}
                        src={data.imageUrl}
                    />
                </div>    
                <div>
                    <p><span className="bold">Name: </span>{`${data.firstName} ${data.lastName}`}</p>
                    <p><span className="bold">Department: </span>{data.department}</p>
                </div>
            </div>
            <div className="profile-detail">
                <span className="bold uppercase">At work I'm expert in...</span>
                    {!data.expertIn ? suggestion : <p>{data.expertIn}</p>}
                <span className="bold uppercase">Personally I'm interested in...</span>
                    {!data.interestedIn ? suggestion : <p>{data.interestedIn}</p>}
                <span className="bold uppercase">Describe yourself in one word</span>
                    {!data.oneWord ? suggestion : <p>I am {(checkVowel())} <span className='bold uppercase'>{data.oneWord}</span> person</p>}
                <span className="bold uppercase">I am up for...</span>
                    <p>
                        {data.isUpFor
                            .filter(item => item.checked)
                            .map((item, index) => {
                            if (index === data.isUpFor.length - 1) {
                                return item.label
                            } else { return item.label + ', ' }
                            })
                        }
                    </p>    
            </div>
            <Link to="/profile/edit">
                <Button className="btn red" name="Modify profile" />
            </Link>
        </section>}  
        </>
    )
}