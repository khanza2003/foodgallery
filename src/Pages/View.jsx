import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams(); 
  const [recipie, setRecipie] = useState({}); 

  useEffect(() => {
    if (sessionStorage.getItem('allRecipies')) {
      const allRecipies = JSON.parse(sessionStorage.getItem('allRecipies'));
      const selectedRecipie = allRecipies.find((item) => item.id == id); 
      setRecipie(selectedRecipie || {}); 
    }
  }, [id]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      {recipie ? (
        <Card style={{ width: '30rem' }}>
          <Card.Img
            variant="top"
            src={recipie.image  } 
            alt={recipie.name }
          />
          <Card.Body>
            <Card.Title>{recipie.name || 'Recipe Name'}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {recipie.description || 'No description available'}
            </Card.Text>
            <Card.Text>
              <strong>Ingredients:</strong> {recipie.ingredients?.join(', ') || 'No ingredients available.'}
            </Card.Text>
            <Card.Text>
              <strong>Instructions:</strong> {recipie.instructions || 'No instructions provided.'}
            </Card.Text>
            <Button variant="primary" href="/" style={{ marginTop: '10px' ,marginLeft:'150px',background:'red'}}>
              Back to Home
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div>Recipe not found.</div>
      )}
    </div>
  );
};

export default View;