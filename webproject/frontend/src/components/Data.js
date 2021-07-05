import React, { Component } from "react"
import { Table } from "reactstrap";
import axiosInstance from "./axiosApi";

const API_URL = "/api/blogs/";


class Dashboard extends Component {

  state = {
    data: [],
  }

  componentDidMount() {
    try {
        const res = axiosInstance.get(API_URL);
        // console.log(res)
      res.then((response) =>{
        //   console.log(response.data)
          this.setState({
            data: response.data
          });
      }, err => {
          console.log(err)
      }
      )
      
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    return (
      <>
        <Table className="text-dark">
          <thead>
            <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            </tr>
          </thead>
        <tbody>
        {
            this.state.data.map(post => (
             
              <tr key={post.id}>
               <td>{post.id}</td>
                <td  className="captext">{post.title}</td>
                <td> {post.body}</td>
              </tr>
              
            )
          )}
        </tbody>
        </Table>
      </>
    )
  }
}
export default Dashboard;
