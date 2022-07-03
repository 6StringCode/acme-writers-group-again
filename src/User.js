import axios from "axios";
import React, { Component } from "react";
import { faker } from '@faker-js/faker';

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            stories: [],
            userId: this.props.userId,
        }
        this.createNewStory = this.createNewStory.bind(this);
        this.destroyStory = this.destroyStory.bind(this);
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

    async createNewStory(){        
        const story = await axios.post(`/api/users/${this.state.userId}/stories/`, {
            title: faker.random.words(5),
            body: faker.lorem.paragraphs(5),
            favorite: faker.datatype.boolean(),
            userId: this.state.userId
        });
        const _story = story.data;
        const stories = [_story, ...this.state.stories];
        this.setState({ stories: stories });
    }

    async destroyStory(story){
        const stori = await axios.delete(`/api/stories/${story}`);
        console.log(story);
        console.log(typeof stori.data);
        const stories = this.state.stories.filter(_story => _story.id !== story * 1);
        this.setState({ stories });
    }

    render(){ 
        const  { user, stories } = this.state;
        const { createNewStory, destroyStory } = this;
        return (
            <div>
                Details for { user.name }
                <p>
                    { user.bio }
                </p>
                <button onClick={()=> createNewStory()}>Add Story</button>
                <ul>
                    {
                        stories.map(story => {
                            return (
                                <li key={ story.id }>
                                    { story.title }
                                    <button onClick={()=> destroyStory(story.id)}>Delete Story</button>
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