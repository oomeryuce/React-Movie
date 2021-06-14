import { View } from 'components';
import { React } from 'libraries';
import axios from 'axios';
import { Card, FormControl, InputGroup, Pagination } from 'react-bootstrap'
import { Component } from "react";
import { Route } from "react-router-dom";

class Home extends Component {
    state = {
        movies: [],
        totalResults: 0,
        search: 'test',
        currentPage: 1
    }
    async componentWillMount() {
        await this.MovieData({search: this.state.search})
    }

    handleChange = event => {
        if (event.target.value.length > 0) {
            this.state.movies = []
            let search = event.target.value
            this.MovieData({ search })
        }
    }

    Header = () => {
        return (
            <header>
                <View classNames="row d-flex justify-content-center"> <InputGroup className="my-3 w-75" size="lg">
                    <FormControl
                        placeholder="Search for any movie"
                        aria-describedby="basic-addon2"
                        onChange={this.handleChange}
                    /> </InputGroup> </View>
            </header>
        )
    }

    handleClick(number) {
        this.setState({ currentPage: number })
        this.MovieData({ search: this.state.search, page: number })
    }

    Paginate = () => {
        let active = this.state.currentPage;
        let items = [];
        let count = Math.ceil(this.state.totalResults/10);
        if (active > 3) {
            items.push(
                <Pagination.Ellipsis />
            )
        }
        for (let number = 1; number <= count; number++) {
            if ( number === active || number + 1 === active || number + 2 === active || number -1 === active ||number -2 === active ){
                items.push(
                    <Pagination.Item onClick={() => this.handleClick(number)} key={number} active={number === active}>
                        {number}
                    </Pagination.Item>,
                );
            }
        }
        if (active - 3 < count) {
            items.push(
                <Pagination.Ellipsis />
            )
        }

        return (
            <Pagination size="lg">
                <Pagination.Prev onClick={() => this.handleClick(active-1)} />
                {items}
                <Pagination.Next onClick={() => this.handleClick(active+1)} />
            </Pagination>
        );
    }

    MovieData = async (props) => {
        const movieSearch = props.search;
        let key;
        if (movieSearch){
            key = `&s=` + movieSearch
        } else {
            key = `&s=test`
        }
        let page = `&page=1`;
        if (props.page){
            page =`&page=` + props.page;
        }
        await axios.get(`http://www.omdbapi.com/?apikey=bc630030&type=movie` + key + page)
        .then(async res => {
            if (res.data.Response != 'False'){
                const movies = res.data.Search;
                const totalMovies = res.data.totalResults;
                await this.setState({ movies,totalResults: totalMovies});
            } else {
                await this.setState({ movies: [],totalResults: 0});
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <View className="container">
                    {this.Header()}
                    <div className="row">
                        {this.state.movies.length > 0 ? this.state.movies.map(item =>
                            <Movies key={item.imdbID} id={item.imdbID} image={item.Poster} title={item.Title} year={item.Year}/>
                        ) : <div className="text-center m-5 w-100"><span>No Results Found</span></div>}
                    </div>
                    <div className="row d-flex justify-content-center mt-2 mb-5">
                        {this.Paginate()}
                    </div>
                </View>
            </React.Fragment>
        )
    }
}

class Movies extends Component{
    render() {
        return (
            <Route render={({ history}) => (
                <div className="col-12 col-md-4 my-3 d-flex flex-column justify-content-end">
                    <Card onClick={() => { history.push('/detail/' + this.props.id) }} style={{ width: '18rem' }} className="shadow">
                        <Card.Img variant="top" src={this.props.image} />
                        <Card.ImgOverlay className="d-flex flex-column p-0 text-white justify-content-end">
                            <div style={{height: 'max-content',backgroundColor: 'rgba(0,0,0,0.60)'}} className="text-center p-2">
                                <h4>{this.props.title}</h4>
                                <h6>{this.props.year}</h6>
                            </div>
                        </Card.ImgOverlay>
                    </Card>
                </div>
            )} />
        )
    }
}

export default Home
