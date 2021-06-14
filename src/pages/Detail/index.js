import { View } from 'components';
import { React } from 'libraries';
import axios from 'axios';
import { Card, ListGroup, Button } from 'react-bootstrap'
import { Component } from "react";
import { Route } from "react-router-dom";

class Detail extends Component {
    state = {
        movie: {},
    }
    async componentWillMount() {
        let split = this.props.location.pathname.split("/")
        const id = split[2]
        await this.MovieData({id})
    }

    MovieData = async (props) => {
        const imdbId = props.id;
        await axios.get(`http://www.omdbapi.com/?apikey=bc630030&i=` + imdbId)
        .then(async res => {
            if (res.data.Response != 'False'){
                const movie = res.data;
                await this.setState({ movie });
            } else {
                await this.setState({ movie: {} });
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <View className="container">
                    <div className="row mt-5">
                        <div className="col-12 mb-5">
                            <Route render={({ history}) => (
                                <Button className="ml-3" variant="outline-primary" onClick={() => { history.push('/') }}>Go Home</Button>
                            )} />
                        </div>
                        {this.state.movie && Object.keys(this.state.movie).length > 0 ? (
                            <div className="col-12 d-flex">
                                <div className="col-12 col-md-5">
                                    <Card style={{ width: '100%' }} className="shadow">
                                        <Card.Img variant="top" src={this.state.movie.Poster} />
                                    </Card>
                                </div>
                                <div className="col-12 col-md-7">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><span className="font-weight-bold">Title:</span> {this.state.movie.Title}</ListGroup.Item>
                                        <ListGroup.Item><span className="font-weight-bold">Year:</span> {this.state.movie.Year}</ListGroup.Item>
                                        <ListGroup.Item><span className="font-weight-bold">Runtime:</span> {this.state.movie.Runtime}</ListGroup.Item>
                                        <ListGroup.Item><span className="font-weight-bold">Director:</span> {this.state.movie.Director}</ListGroup.Item>
                                        <ListGroup.Item><span className="font-weight-bold">Actors:</span> {this.state.movie.Actors}</ListGroup.Item>
                                        <ListGroup.Item><span className="font-weight-bold">Awards:</span> {this.state.movie.Awards}</ListGroup.Item>
                                        <ListGroup.Item>
                                            <span className="font-weight-bold">Ratings:</span>
                                            <ul className="ml-4" style={{listStyle: 'circle'}}>
                                                {this.state.movie.Ratings.length > 0
                                                    ? this.state.movie.Ratings.map(item => {
                                                    return (<li>{item.Source} <span className="font-weight-bold">{item.Value}</span></li>)
                                                })
                                                    : <li>No Ratings Found</li>}
                                            </ul>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        ) : <div className="text-center m-5 w-100"><span>Movie Not Found</span></div>}
                    </div>
                </View>
            </React.Fragment>
        )
    }
}

export default Detail
