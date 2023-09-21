import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  let [localCollections, setLocalCollections] = useState([])
  let [localItems, setLocalItems] = useState([])
  let [isLocalItem, setIsLocalItem] = useState(true)

  function handleSubmit (e){
    console.log(user)
    e.preventDefault();
    let collection = e.target.collection.value;
    let obj ={collectionName:collection, email:user.email}
    const updatedCollections = [...localCollections, obj];
    setLocalCollections(updatedCollections);
    localStorage.setItem("collections", JSON.stringify(updatedCollections));
  }

  function showCollections(){
    
    if(JSON.parse(localStorage.getItem("collections"))){
      let arr = JSON.parse(localStorage.getItem("collections"))
      let filteredCollections = arr.filter(coll=>coll.email === user.email)
      setLocalCollections(filteredCollections || [])
    }
    }

     function showItems(category) {
      if (localStorage.getItem("item")){
      let arr = JSON.parse(localStorage.getItem("item"));
      let filteredItems = arr.filter(item => item.selectedCategory === category && item.email === user.email);
      if(filteredItems[0] != null){
        setIsLocalItem(true)
      }
      else {
        setIsLocalItem(false)
      }
      setLocalItems(filteredItems);}
    
  }


    
  useEffect(() => {
    if (isLoading) {
      return; 
    }
  
    showCollections();
  }, [isLoading]);

  function handleDelete(i){
    let items = JSON.P(localStorage.getItem("item")); 
  }


  console.log(localItems)
  return (
    
    <>
    {isAuthenticated && user && (
<></>
    )}
    <Form onSubmit={handleSubmit} style={{marginLeft:"60%", marginTop:"2%"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={{display:"flex"}}>
      {/* <div> */}
        <Form.Label style={{fontWeight:"bold", fontSize:"large",marginRight:"10px"}}>Create a New Collection</Form.Label>
        <Form.Control type="text" placeholder="Collection Name" name="collection" style={{width:"30%",marginRight:"10px"}} />
        {/* </div> */}
        <Button variant="primary" type="submit">
       Create
      </Button>
      </Form.Group>

    </Form>
  <ul style={{display:"flex"}}>
    {localCollections?localCollections.map(collection=>{
      return(
        <div style={{display:"block"}}>
        
        <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShozcPe7Ybr9kNszwibJncG0EVErR3oaFT2H3v0Jz32UN9plVApfuIwoZKWsxPr0FM_bU&usqp=CAU"
         width={200} height={200} onClick={()=>showItems(collection.collectionName)}/>
          <h4 style={{marginLeft:"25px"}}>{collection.collectionName}</h4>
        </div>
      )
    }):<p>No Collections</p>}
  </ul>
  <ul style={{display:"flex"}}>
  {isLocalItem?localItems.map((item,index)=>{
    return(
  <Card style={{ width: '18rem', marginRight:"10px"}} key={index}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Button variant="primary" onClick={()=>handleDelete(index)} >
                  Delete
                </Button>
                
              </Card.Body>
            </Card>
    )
          }): <h5>No Items Found For This Collection</h5>}
  </ul>
      </>
  );
};

export default Profile;