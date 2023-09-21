import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function Category() {
    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeModalIndex, setActiveModalIndex] = useState(null);


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


    useEffect(() => {
        showItems();
        showCategories();
    }, []);


    return (
        <div className="container my-5 mb-4">
            <h2 className="mb-4">Categories</h2>
            <Form.Select aria-label="Default select example" name="categories" onChange={handleCategories}>
                <option value="All">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </Form.Select>

            <div className="card p-4 my-5" style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {areas.map((quiz, index) => (
                    <div className="col mb-3" style={{ marginRight: '1.5rem' }} key={index}>
                        <Card style={{
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '35rem'
                        }}>
                            <Card.Img variant="top" src={quiz.image} style={{ width: '18rem', height: '26rem' }} />
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
