import React from "react";
import Product from "./Product.json";
import "./Home.css";
import stateContext from "./Context";
import { useContext } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//import React from 'react'

function Home() {
  const { state, dispatch } = useContext(stateContext);

  //Add to cart function
  const Addcart = (items) => {
    let q=items.qty++;
    console.log(items);
    let cartbox = [];

    if (state.cartItems.length) {
      cartbox = [...state.cartItems, items];
    } else {
      cartbox = [items];
    }
    dispatch({
      type: "add",
      payload: {q,
        cartItems: cartbox.filter((val, id) => {
          return cartbox.indexOf(val) == id;
        }),
      },
    });
  };

  //Favorite function
  const Addfavorite = (items) => {
    let favbox = [];
    if (state.favorite.length) {
      favbox = [...state.favorite, items];
    } else {
      favbox = [items];
    }
    dispatch({
      type: "favorite",
      payload: {
        favorite: favbox.filter((val, id) => {
          return favbox.indexOf(val) == id;
        }),

      }
    });
  };

  return (
    <div className="container">
      {Product.map((items, i) => {
        return (
          <div key={i} className="cars">
            <h1>{items.name}</h1>
            <p className="id">{items.id}</p>
            <p className="price">{items.price}</p>
            {/* <p className="qty">{items.qty}</p> */}
            <img src={items.img} alt="" className="image"></img>
            <br></br>
            <span className="addcart" onClick={() => Addcart(items)}>
              <AddShoppingCartIcon/>
            </span>
            <span className="fav" onClick={() => Addfavorite(items)}>
             <FavoriteBorderIcon/>
            </span>
          </div>
        );
      })}
      {}
    </div>
  );
}

export default Home;
