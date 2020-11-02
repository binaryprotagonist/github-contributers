import Head from 'next/head'
import { Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import React, {useState,useEffect} from 'react';
import axios from 'axios';

export default function List() {

  const[posts, setposts] = useState([]);
  const[ispage,setispage] = useState(20);
  const[user_name,setuser_name]=useState('gkalpak');
  useEffect(() => {   
    getuser();
  
    })
  const getuser=()=>{
    let username=localStorage.getItem('username')
    console.log('user',username)
    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(response=>{
        console.log('response', response);
        setposts(response.data)
    })
    .catch(error=>{
        console.log('errro',error);
    })
}


 
  return (
    <div >
      

      <main>
      
      
      </main>
      <Container className="container-fluid">
      <h1 className="top_head">Repositry List</h1> 
      <Row className="pt-5">
   

<table className="table table-striped">
<thead class="thead-dark">
<tr>
      <td>Repositry Name</td>
      <td>Star </td>
      <td>Fork</td>
      <td>Created Date</td>
      <td>Updated Date</td>
     </tr>
  </thead>
  <tbody>
 
     {posts.map((item,index) => {
         return(
            <tr>
            <td>{item.name}</td>
         <td>{item.stargazers_count}</td>
         <td>{item.forks_count}</td>
         <td>{item.created_at}</td>
         <td>{item.updated_at}</td>
          
            
        </tr>
         )
        
})}
   
  </tbody>
</table>
   
      </Row>
     
    </Container>

     
    </div>
  )
}
