import Head from 'next/head'
import { Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link'
export default function Home() {

  const[posts, setposts] = useState([]);
  const [ scrolled, setScrolled ] = useState()
  const[ispage,setispage] = useState(20);
  useEffect(() => {   
    getuser();
    getuser_details()
    // 
    const handleScroll = _ => { 
      if (window.pageYOffset > 1) {
        setScrolled(true)
        loadmore()
      
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return _ => {
      window.removeEventListener('scroll', handleScroll)
    }
    // 
    })
  const getuser=()=>{
    axios.get(`https://api.github.com/repos/angular/angular/contributors?page=1&per_page=${ispage}`)
    .then(response=>{
        
        setposts(response.data)
    })
    .catch(error=>{
        console.log('errro',error);
    })
}
const getuser_details=()=>{
  axios.get(`https://github.com/petebacondarwin`)
  .then(response=>{
      console.log("getuser_details",response)
      setposts(response.data)
  })
  .catch(error=>{
      console.log('errro',error);
  })
}

const loadmore=()=>{
   setispage(ispage+20)
   getuser();
}
 
const view_detail=(item)=>{
   console.log('response id',item);
   localStorage.setItem('username',item)
}
  return (
    <div >
      <main>
      </main>
      <Container className="container-fluid">
      <h1 className="top_head">Top Contributer</h1> 
      <Row className="pt-5">
  

       {posts.map((item,index) => {
         return(
          <Col  md={3} className="" key={index}>
          <div className="box_loop">
        <div className="flex_loop">
          <img src={item.avatar_url} className="img_git" />
          <img src="/icon.png" title="jcdsgcjhd" className="icon_list"/>
        </div>
      
         <h6>{item.login}</h6>
         <p>{item.contributions} commits</p>
         <Link href="/List">
         <button onClick={()=>view_detail(item.login)} className="btn_view">VIEW REPOSITORIES
         
 </button>
 </Link>
          </div>
       </Col>
         )
        
})}
      
        
       
      </Row>
      {/* <button className="btn_load_more" onClick={loadmore}>Load more</button> */}
    </Container>

     
    </div>
  )
}
