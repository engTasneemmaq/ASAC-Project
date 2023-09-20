import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth0 } from "@auth0/auth0-react";


function Api() {
  let arr = JSON.parse(localStorage.getItem("collections"))
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [quizzes, setQuizzes] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [activeModal2Index, setActiveModal2Index] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  async function logQuizzes() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    setQuizzes(data);
  }

  useEffect(() => {
    logQuizzes();
  }, []); 

  async function handleSubmit(e){
    e.preventDefault();
    let search = e.target.search.value;
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    let filteredData = data.filter(item=>item.title.includes(search))
    setQuizzes(filteredData);
  }

  function saveToLocalStorage (i,category) {
    quizzes[i].selectedCategory = category
    quizzes[i].email = user.email
    console.log(quizzes[i])
    if(localStorage.getItem("item")){
    let arr1 = JSON.parse(localStorage.getItem("item"))
    arr1.push(quizzes[i])
    localStorage.setItem("item",JSON.stringify(arr1))
    console.log("local storage items: ", arr1)
    }
    else {
      let arr1= []
      arr1.push(quizzes[i])
      localStorage.setItem("item",JSON.stringify(arr1))
      console.log("local storage items: ", arr1)
    }
    



  }

  function handleChange(e) {
    console.log(e.target);
    let category = e.target.value;
    setSelectedCategory(category);
  }

  function AddItem(index) {
    if(arr.length === 1){saveToLocalStorage(index, arr[0].collectionName);
    }

    else{
    saveToLocalStorage(index, selectedCategory);}
  }
  return (
    <>
      <Form inline onSubmit={handleSubmit} style={{marginTop:"5%",marginLeft:"25%", marginBottom:"5%"}}>
        <Row>
          <Col xs="auto">
          <div className="input-group">
        <Form.Control
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          name="search"
          style={{ width: "600px", marginRight:"20px" }}  // Adjust the width as needed
        />
        <div className="input-group-append">
          <Button type="submit" variant="outline-success">
             Search 
          </Button>
        </div>
      </div>
          </Col>
        </Row>
      </Form>
      <ul style={{  display: "flex",flexWrap:"wrap",gap: "20px",justifyContent: "space-between"}}>
        {quizzes.map((quiz, index) => (
            <div >
            <Card style={{ width: '18rem' }} key={index}>
              <Card.Img variant="top" src={quiz.image} style={{ width: '18rem' }}/>
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Button variant="primary" onClick={() => setActiveModalIndex(index)}>
                  Show Description
                </Button>
                {isAuthenticated && <Button variant="primary" onClick={() => setActiveModal2Index(index)}>Add to List</Button>}
              </Card.Body>
            </Card>

            <Modal
              show={activeModalIndex === index}
              onHide={() => setActiveModalIndex(null)}
              size="lg"
              aria-labelledby={`contained-modal-title-vcenter-${index}`}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id={`contained-modal-title-vcenter-${index}`}>
                  {quiz.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
                <p>{quiz.description}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setActiveModalIndex(null)}>Close</Button>
              </Modal.Footer>
            </Modal>

            <Modal
        show={activeModal2Index === index}
        onHide={() => setActiveModal2Index(null)}
        size="lg"
        aria-labelledby={`contained-modal-title-vcenter-${index}`}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id={`contained-modal-title-vcenter-${index}`}>
            Categories
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            aria-label="Default select example"
            name="area"
            onChange={(event) => handleChange(event)}
          >
            {arr ? (
              arr.map((category, i) => (
                <option key={i} value={category.collectionName}>
                  {category.collectionName}
                </option>
              ))
            ) : (
              <p>No categories</p>
            )}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setActiveModal2Index(null)}>Close</Button>
          {isAuthenticated && <Button onClick={() => AddItem(index)}>Add</Button>}
        </Modal.Footer>
      </Modal>
    </div>
            )
        )}
      </ul>


    </>
  );
}

export default Api;