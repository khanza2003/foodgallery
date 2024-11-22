import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipies, filterRecipiesByCuisine } from '../redux/slices/Slice';

const Home = () => {
  const dispatch = useDispatch();
  const { allRecipies, loading, errorMsg, filteredRecipies } = useSelector(
    (state) => state.RecipieReducer
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipiesPerPage = 6;

  const recipesToDisplay = filteredRecipies?.length > 0 ? filteredRecipies : allRecipies;

  const totalPages = Math.ceil(recipesToDisplay?.length / recipiesPerPage);
  const currentPageProductLastIndex = currentPage * recipiesPerPage;
  const currentPageProductFirstIndex = currentPageProductLastIndex - recipiesPerPage;
  const visibleAllProducts = recipesToDisplay?.slice(
    currentPageProductFirstIndex,
    currentPageProductLastIndex
  );

  const navigatetoNext = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigatetoPrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(filterRecipiesByCuisine(query)); 
  };

  useEffect(() => {
    dispatch(fetchRecipies()); 
  }, [dispatch]);

  return (
    <div>
      <input
        style={{
          marginLeft: '100px',
          padding: '10px',
          width: '80%',
          marginTop: '50px',
        }}
        type="text"
        placeholder="Search by cuisine"
        value={searchQuery}
        onChange={handleSearchChange} 
      />

      <div style={{ marginLeft: '100px', marginTop: '30px' }}>
        {loading && <div>Loading...</div>}
        {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}

        <Row>
          {recipesToDisplay?.length > 0 ? (
            visibleAllProducts.map((recipe) => (
              <Col md={4} key={recipe.id}>
                <Card style={{ width: '18rem', marginBottom: '20px' }}>
                  <Card.Img
                    variant="top"
                    src={recipe.image}
                    alt={recipe.name}
                  />
                  <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <Link to={`/${recipe.id}/view`}>
                      <Button variant="primary" style={{background:'red',marginLeft:'50px'}}>View Recipe</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            !loading && <div>No recipes found</div>
          )}
        </Row>
      </div>

      <div className="text-2xl text-center font-bold mt-20">
        <span onClick={navigatetoPrevious} className="cursor-pointer" style={{marginRight:'10px'}}>
          Prev
        </span>
        <span>
          {currentPage} of {totalPages}
        </span>
        <span onClick={navigatetoNext} className="cursor-pointer" style={{marginLeft:'10px'}}>
           Next
        </span>
      </div>
    </div>
  );
};

export default Home;