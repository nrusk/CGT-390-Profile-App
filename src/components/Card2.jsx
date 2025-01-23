import img from '../assets/image2.png'
import React from 'react';
import "../App.css";
import '../styles/global.css';
import '../styles/card.css';

const Card2 = () => {

    const name = 'Eva Smith';
    const title = 'UX Designer';
    const email = 'b@b.com';

    return (
        <div className="profile-card" style={{backgroundColor: "#f7f7f7", width: "300px", paddingTop: "25px", borderRadius: "10px"}}>
            <div className="profile-card__image">
                <img src={img} alt="profile" />
            </div>
            <div className="profile-card__content">
                <p style={{fontWeight: "bold", fontSize: "40px", paddingBottom: "10px"}}>{name}</p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
    );
}

export default Card2;