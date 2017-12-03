import React from 'react';
import ReactPaginate from 'react-paginate';

export default class BasicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants : [],
      currentPage: 0,
      pageCount: 0
    };
  }

  getRestaurantsCount() {
    let url = "http://localhost:8080/api/restaurants/count";

    fetch(url)
    .then(responseJSON => {
      responseJSON.json()
      .then(res => {
        console.log(res.data)
        this.setState({
          pageCount: Math.round(res.data / 10 ) - 1
        })
      })
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  getRestaurants(pagenum) {
    let url = "http://localhost:8080/api/restaurants?page="+pagenum;

    fetch(url)
    .then(responseJSON => {
      responseJSON.json()
      .then(res => {
        // Maintenant res est un vrai objet JavaScript
        console.log(res.data)
        this.setState({
          restaurants : res.data
        })
      })
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  handlePageClick = (data) => {
    console.log();
    this.getRestaurants(data.selected);
  }

  componentWillMount() {
    this.getRestaurants(this.state.currentPage)
    this.getRestaurantsCount();
  }

  render() {

    let list = this.state.restaurants.map((restaurant, index) => {
      return (
        <tr key={index}>
        <td>{restaurant.name}</td>
        <td>{ restaurant.cuisine }</td>
        <td>
        <div className="btn-toolbar">
        <button className="btn btn-warning">edit</button>
        <button className="btn btn-danger">delete</button>
        </div>
        </td>
        </tr>
      );
    });

    return(
      <div>
        <button className="btn btn-primary float-right">Add restaurant</button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
        <ReactPaginate previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={<a href="">...</a>}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={2}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      activeClassName={"active"}
                      pageClassName = {"page"}/>
      </div>
    );
  }
}
