import React, { Component } from "react";


const Users = ({ users, userId, destroy, createNewUser })=> {
    return (
        <ul>
            <li className={ !userId ? "selected" : ""}>
                <a href='#'>Users</a>
                <button onClick={()=> createNewUser()}>Add User</button>
            </li>
            {
                users.map( user => {
                    return (
                        <li className={user.id === userId*1 ? "selected" : ""} key={ user.id }>
                            <a href={`#${user.id}`}>{ user.name }</a>
                            <button onClick={()=> destroy(user)}>x</button>
                        </li>
                    );                        
                })
            }
        </ul>
    )
}

export default Users;