import axios from 'axios';
import React, { Component } from 'react'

export default class Banner extends Component {

  constructor() {
    super();
    this.state = {
        topMovie: ''
    }
  }

  async componentDidMount() {
    const resp = await axios("https://api.themoviedb.org/3/movie/popular?api_key=a95b691e274d51ffaaaa7fc8843b09fe&language=en-US&page=1");
    this.setState({
        topMovie: resp.data.results[0]
    });
  }

  render() {
    return (
      <>
        {
            this.state.topMovie == '' ?
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <div className="spinner-border text-primary" role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
            <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${this.state.topMovie.backdrop_path}`} className="card-img-top banner-img" alt={this.state.topMovie.title}/>
                <h1 className="card-title banner-title">{this.state.topMovie.original_title}</h1>
                <p className="card-text banner-text">{this.state.topMovie.overview}</p>
            </div>
        }
      </>
    )
  }
}
