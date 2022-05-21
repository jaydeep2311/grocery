import React, { Component } from "react";
import axios from "axios";
import "./GroceryList.css";

export default class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryitem: "",
      grocerylist: [],
      groceryqty: "",
      groceryprice: "",
      groceryDesc: "",
      page: 1,
      postsPerpage: 5,
    };
  }
  handleitem(e) {
    this.setState({
      groceryitem: e.target.value,
    });
  }
  handleprice(e) {
    this.setState({
      groceryprice: e.target.value,
    });
  }
  handleqty(e) {
    this.setState({
      groceryqty: e.target.value,
    });
  }
  handleDesc(e) {
    this.setState({
      groceryDesc: e.target.value,
    });
  }
  delete = async (id) => {
    await axios.delete(`http://localhost:3001/grocery/${id}`);
    this.renderlist();
  };
  async handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.groceryDesc &&
      this.state.groceryitem &&
      this.state.groceryqty &&
      this.state.groceryprice
    ) {
      let payload = {
        item: this.state.groceryitem,
        qty: this.state.groceryqty,
        price: this.state.groceryprice,
        desc: this.state.groceryDesc,
      };
      const response = await axios
        .post("http://localhost:3001/grocery", payload)
        .then((res) =>
          this.setState({
            grocerylist: [...this.state.grocerylist, res.data],
          })
        );
    } else {
      alert("Please fill the details properly");
    }
  }
  renderlist = async () => {
    const response = await axios.get("http://localhost:3001/grocery");
    const start =
      this.state.page * this.state.postsPerpage - this.state.postsPerpage;
    const end = this.state.page * this.state.postsPerpage;
    const data = response.data.slice(start, end + 1);
    this.setState({
      grocerylist: [...data],
    });
  };
  handlePage(e) {
    this.setState({
      page: Number(e.target.id),
    });
    this.renderlist();
  }
  setPage(n) {
    this.setState({
      page: this.state.page + n,
    });
    this.renderlist();
  }
  componentDidMount() {
    this.renderlist();
  }
  componentDidUpdate(prevprop, prevstate, snapshot) {
    if (prevstate.page !== this.state.page) {
      if (this.state.page < 3 && this.state.page > 0) {
        this.setPage(1);
      }
    }
  }
  render() {
    return (
      <>
        <h1>Add Grocery</h1>
        <div
          style={{
            textAlign: "center",
            marginLeft: "40%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <input
              type="text"
              placeholder="Add grocery name"
              value={this.state.groceryitem}
              onChange={(e) => this.handleitem(e)}
            />
            <input
              type="number"
              placeholder="Add grocery quantity"
              value={this.state.groceryqty}
              onChange={(e) => this.handleqty(e)}
            />
            <input
              type="number"
              placeholder="Add grocery price"
              value={this.state.groceryprice}
              onChange={(e) => this.handleprice(e)}
            />
            <input
              type="text"
              placeholder="Add grocery Description"
              value={this.state.groceryDesc}
              onChange={(e) => this.handleDesc(e)}
            />
            <button
              type="submit"
              className="btn"
              onClick={(e) => this.handleSubmit(e)}
            >
              Add grocery item
            </button>
          </div>
        </div>
        <hr />
        <div>
          <h3>List of items</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">price</th>
                <th scope="col">Description</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.grocerylist.map((el) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{el.id}</th>
                      <td>{el.item}</td>
                      <td>{el.qty}</td>
                      <td>{el.price}Rs</td>
                      <td>{el.desc}</td>
                      <td className="td" onClick={() => this.delete(el.id)}>
                        <span>Delete</span>
                      </td>
                      <td>
                        <span>Edit</span>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => this.setPage(-1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  id="1"
                  onClick={(e) => this.handlePage(e)}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  id="2"
                  onClick={(e) => this.handlePage(e)}
                >
                  2
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  id="3"
                  onClick={(e) => this.handlePage(e)}
                >
                  3
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={(e) => this.setPage(1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}
