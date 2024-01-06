import React, { Component } from 'react'

export default class Favourites extends Component {

  constructor () {
    super();
    this.state = {
      genres: [],
      currGenre: 'All Genres',
      movies: [],
      currText: '',
      limit: 5,
      currPage: 1
    }
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let temp = [];
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temp.unshift('All Genres');
    this.setState({
      genres: [...temp],
      movies: [...data]
    })
  }

  handleGenreChange = (genre) => {
    this.setState({
      currGenre: genre
    });
  }

  sortPopularityDesc = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objB.popularity - objA.popularity;
    });
    this.setState({
      movies: [...temp]
    });
  }

  sortPopularityAsc = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objA.popularity - objB.popularity;
    });
    this.setState({
      movies: [...temp]
    });
  }

  sortRatingDesc = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
    this.setState({
      movies: [...temp]
    });
  }

  sortRatingAsc = () => {
    let temp = this.state.movies;
    temp.sort(function(objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
    this.setState({
      movies: [...temp]
    });
  }

  handlePageChange = (page) => {
    this.setState({
      currPage: page
    });
  }

  handleDelete = (movieId) => {
    let newArr = [];
    newArr = this.state.movies.filter((movieObj) => movieObj.id !== movieId);
    this.setState({
      movies: [...newArr]
    })
    localStorage.setItem('movies-app', JSON.stringify(newArr));
  }

  handleLimitChange = (event) => {
    if (parseInt(event.target.value) <= 0) {
      this.setState({limit: 1});
    } else {
      this.setState({limit: parseInt(event.target.value)})
    }
  }

  render() {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let filteredArr = [];

    if (this.state.currGenre == 'All Genres') {
      filteredArr = this.state.movies;
    } else {
      filteredArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] === this.state.currGenre);
    }

    if (this.state.currText !== '') {
      filteredArr = this.state.movies.filter((movieObj) => {
        const title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      })
    }

    let pages = Math.ceil(filteredArr.length/this.state.limit);
    let pagesArr = [];
    for (let i=1; i<= pages; i++) {
      pagesArr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit;
    filteredArr = filteredArr.slice(si, ei);
    return (
      <div>
        <>
          <div className='main'>
            <div className='row' style={{width: '100%'}}>
              <div className='col-lg-3 col-sm-12'>
              <ul class="list-group favourite-genres">
                {
                  this.state.genres.map((genre) => (
                    this.state.currGenre === genre ?
                    <li class="list-group-item" style={{background: '#3f51b5', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>{genre}</li> :
                    <li class="list-group-item" style={{background: 'white', color: '#3f51b5', cursor: 'pointer'}} onClick={() => {this.handleGenreChange(genre)}}>{genre}</li>
                  ))
                }
              </ul>
              </div>
              <div className='col-lg-9 col-sm-12 favourite-table'>
                <div className='row'>
                  <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(event) => this.setState({ currText: event.target.value })}/>
                  <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(event) => this.handleLimitChange(event)}/>
                </div>
                <div className='row'>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredArr.map((movieObj) => (
                          <tr>
                            <td>
                              <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width: '10rem'}}/>
                              <span style={{marginLeft: '2rem'}}>{movieObj.original_title}</span>
                            </td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {
                      pagesArr.map((page) => (
                        <li class="page-item" style={{cursor: 'pointer'}} onClick={() => this.handlePageChange(page)}><a class="page-link">{page}</a></li>
                      ))
                    }
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    )
  }
}
