import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-bootstrap/Modal';

function Category() {
    const [areas, setAreas] = useState([]);
    let arr = JSON.parse(localStorage.getItem("collections"))
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [categories, setCategories] = useState([]);
    const [activeModalIndex, setActiveModalIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    async function showItems() {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setAreas(data);
    }

    async function showCategories() {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (!arr.includes(data[i].category)) {
                arr.push(data[i].category);
            }
        }
        setCategories(arr);
    }

    async function handleCategories(e) {
        e.preventDefault();
        let filteredCategory = e.target.value;
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        if (filteredCategory === "All") {
            setAreas(data);
        } else {
            let filteredCategories = data.filter(item => item.category === filteredCategory);
            setAreas(filteredCategories);
        }
    }
    // function saveToLocalStorage (i,category) {
    //     quizzes[i].selectedCategory = category
    //     quizzes[i].email = user.email
    //     console.log(quizzes[i])
    //     if(localStorage.getItem("item")){
    //     let arr1 = JSON.parse(localStorage.getItem("item"))
    //     arr1.push(quizzes[i])
    //     localStorage.setItem("item",JSON.stringify(arr1))
    //     console.log("local storage items: ", arr1)
    //     }
    //     else {
    //       let arr1= []
    //       arr1.push(quizzes[i])
    //       localStorage.setItem("item",JSON.stringify(arr1))
    //       console.log("local storage items: ", arr1)
    //     }
        
    //   }
    
    useEffect(() => {
        showItems();
        showCategories();
    }, []);

    function handleChange(e) {
        console.log(e.target);
        let category = e.target.value;
        setSelectedCategory(category);
      }
    
    //   function AddItem(index) {
    //     if(arr.length === 1){saveToLocalStorage(index, arr[0].collectionName);
    //     }
    
    //     else{
    //     saveToLocalStorage(index, selectedCategory);}
    //   }
    return (
        <div className="container my-5">
            <h2 className="mb-4">Categories</h2>
            <Form.Select aria-label="Default select example" name="categories" onChange={handleCategories}>
                <option value="All">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </Form.Select>

            <div className="row row-cols-1 row-cols-md-3 g-5">
                {areas.map((quiz, index) => (
                    <div className="col" key={index}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={quiz.image}  style={{ width: '18rem' }}/>
                            <Card.Body>
              <Card.Title>{quiz.title}</Card.Title>
              <Button variant="primary" onClick={() => setActiveModalIndex(index)}>Show Description</Button>
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


                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
