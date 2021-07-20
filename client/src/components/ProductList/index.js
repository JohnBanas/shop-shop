import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from "../../utils/helpers";
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useSelector, useDispatch } from 'react-redux'

function ProductList() {
  //global state and update fx's
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  
  //set current category to destructured state
  const { currentCategory } = state;
  
  //query the database for products
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  
  //use effect to on load try to get the query data
  //or if data loads, then update global state with new products
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      // but let's also take each product and save it to IndexedDB using the helper function 
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
    // since we're offline, get all of the data from the `products` store
    idbPromise('products', 'get').then((products) => {
      // use retrieved data to set global state for offline browsing
      dispatch({
        type: UPDATE_PRODUCTS,
        products: products
      });
    });
  }
  }, [data, loading, dispatch]);


  //if there isn't a current category selected return whatever products 
  //are currently in the global state if there is, filter out the category _id
  // and make that the current category

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }
  
  

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
