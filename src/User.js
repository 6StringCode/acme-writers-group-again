import axios from "axios";
import React, { Component } from "react";

class User extends Component{
    constructor(){
        super();
        this.state = {
            user: {},
            stories: [],
            userId: ''
        }
    }

    async componentDidMount(){
        let response = await axios.get(`/api/users/${this.props.userId}`);
        this.setState({ user: response.data });
        response = await axios.get(`/api/users/${this.props.userId}/stories`);
        this.setState({ stories: response.data });
    }
    async componentDidUpdate(prevProps){
        if(prevProps.userId !== this.props.userId){
            let response = await axios.get(`/api/users/${this.props.userId}`);
            this.setState({ user: response.data });
            response = await axios.get(`/api/users/${this.props.userId}/stories`);
            this.setState({ stories: response.data });
        }
    }

    render(){
        const  { user, stories } = this.state;
        return (
            <div>
                Details for { user.name }
                <p>
                    { user.bio }
                </p>
                <ul>
                    {
                        stories.map(story => {
                            return (
                                <li key={ story.id }>
                                    { story.title }
                                    <button>Delete Story</button>
                                    <p>
                                        { story.body }
                                    </p>
                                </li>
                            );
                        })
                    }

                </ul>
            </div>
        )
    }
}

export default User;