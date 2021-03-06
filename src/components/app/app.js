import React from 'react'

import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import PostStatusFilter from '../post-status-filter/post-status-filter'
import PostList from '../post-list/post-list'
import PostAddForm from '../post-add-form/post-add-form.jsx'

// import './app.css'
import styled from 'styled-components'

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [                                                         
                {label: 'Going to learn React', important: false, like: false, id: 'qsad'},      
                {label: 'This is important library', important: true, like: false, id: 'dsfe'},
                {label: 'Needs time to sharpen skills', important: false, like: false, id: 'accd'},
                112,                                                                
                'helloWorld'                                                        
            ],
            term: '',
            filter: 'all'   
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.addItem = this.addItem.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    deleteItem(recievedId) {
        // console.log(recievedId);
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === recievedId)   
            const before = data.slice(0, index);    
            const after = data.slice(index+1);     
            const newArr = [...before, ...after];   
            return {
                data: newArr
            }
        });
    }

    onToggleImportant(recievedId) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === recievedId);

            const old = data[index];
            const newItem = {...old, important: !old.important} 

            const before = data.slice(0, index);    
            const after = data.slice(index+1);     
            const newArr = [...before, newItem, ...after]; 
            
            return {
                data: newArr
            }
        });
    }

    onToggleLike(recievedId) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === recievedId);

            const old = data[index];
            const newItem = {...old, like: !old.like}; 

            const before = data.slice(0, index);    
            const after = data.slice(index+1);     
            const newArr = [...before, newItem, ...after]; 
            
            return {
                data: newArr
            }
        });
    }

    addItem(content) {
        if(content) {
            const newItem = {
                label: content,
                important: false,
                like: false,
                id: this.maxId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            });
        } 
    }


    searchPost(data, term) {
        if(term.length === 0) {
            return data                            
        }
        return data.filter((item) => {             
                return typeof item === 'object';
        }).filter((item) => {                       
            return item.label.indexOf(term) > -1;   
        })
    }

    onSearch(term) {
        this.setState({
            term: term
        }) 
    }

    filterPost(data, filter) {
        switch(filter) {
            case 'like':
                return data.filter((item) => item.like === true)
            default:
                return data
        }
    }

    onFilterSelect(filter) {
        this.setState({
            filter: filter
        })
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPostsAmount = data.filter(item => typeof item === "object").length

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (                                            
            <AppBlock>
                <AppHeader
                    liked = {liked}
                    allPostsAmount = {allPostsAmount}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onSearch={this.onSearch}
                    />
                    <PostStatusFilter
                        filter={filter}     
                        onFilterSelect={this.onFilterSelect}    
                    />
                </div>
                <PostList 
                    posts={visiblePosts} 
                    onDelete={ this.deleteItem } 
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                />    
                <PostAddForm onAdd={ this.addItem } />
            </AppBlock>
        )
    }
}
