import React, { Component } from "react";


const Users = ({ users, userId })=> {
    return (
        <ul>
            <li className={ !userId ? "selected" : ""}>
                <a href='#'>Users</a>
            </li>
            {
                users.map( user => {
                    return (
                        <li className={user.id === userId*1 ? "selected" : ""} key={ user.id }>
                            <a href={`#${user.id}`}>{ user.name }</a>
                            <button>x</button>
                        </li>
                    );                        
                })
            }
        </ul>
    )
}

export default Users;