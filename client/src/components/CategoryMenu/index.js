import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
// import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useSelector, useDispatch } from 'react-redux'


function CategoryMenu() {
  //uses global state 'state' and updates state with 'dispatch' 
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  //current categories destructured from the global state
  const { categories } = state;
  //query database for categories
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  console.log(categories);
  useEffect(() => {
    console.log('Use effect trigger.')
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  //changes global state on click event
  const handleClick = _id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: _id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
