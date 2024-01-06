import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {
  
  constructor() {
    super();
    this.state = {
        hover: '',
        parr: [1],
        currPage: 1,
        movies: [],
        favourites: []
    }
  }

  fetchData = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a95b691e274d51ffaaaa7fc8843b09fe&language=en-US&page=${this.state.currPage}`);
    const data = res.data;
    this.setState({
        movies:[...data.results]
    });
  }

  componentDidMount = async () => {
    await this.fetchData();
    this.handleFavouritesState();
  }

  handleRight = async () => {
    const tempArr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
        tempArr.push(i);
    }
    this.setState({
        parr: [...tempArr],
        currPage: this.state.currPage+1
    }, this.fetchData);
  }

  handleLeft = () => {
    if (this.state.currPage !== 1) {
        this.setState({
            currPage: this.state.currPage - 1
        }, this.fetchData);
    }
  }

  handleClick =  (value) => {
    if (this.state.currPage !== value) {
        this.setState({
            currPage: value
        }, this.fetchData)
    }
  }

  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
    if (this.state.favourites.includes(movie.id)) {
        oldData = oldData.filter((m) => m.id !== movie.id);
    } else {
        oldData.push(movie);
    }
    localStorage.setItem('movies-app', JSON.stringify(oldData));
    this.handleFavouritesState();
  }

  handleFavouritesState = () => {
    const oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
    const temp = oldData.map((movie) => movie.id);
    this.setState({
        favourites: [...temp]
    });
  }
  
  render() {
    return (
      <>
        {
            this.state.movies.length == 0 ?
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <div className="spinner-border text-primary"  role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
            <div>
                <h3 className='text-center'><strong>Trending</strong></h3>
                <div className='movies-list'>
                    {
                        this.state.movies.map((movieObj) => (
                            <div className="card movies-card" onMouseEnter={() => this.setState({hover: movieObj.id})}  onMouseLeave={() => this.setState({hover: ''})}>
                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title}/>
                                <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                {
                                    this.state.hover === movieObj.id &&
                                    <div className='button-wrapper' style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                        <a className="btn btn-primary movies-button" onClick={() => this.handleFavourites(movieObj)}>{ this.state.favourites.includes(movieObj.id) ? "Remove From Favourites" : "Add to Favourites"}</a>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination" style={{ cursor: 'pointer' }}>
                            <li class="page-item" onClick={this.handleLeft}><a class="page-link">Previous</a></li>
                            {
                                this.state.parr.map((value) => (
                                    <li class="page-item" onClick={() => {this.handleClick(value)}}><a class="page-link">{value}</a></li>
                                ))
                            }
                            <li class="page-item" onClick={this.handleRight}><a class="page-link">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        } 
      </>
    )
  }
}
