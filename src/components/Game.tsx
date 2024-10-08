import {Dispatch} from 'react';
import type {Game} from '../interfaces';
import type {CartActions} from '../reducers/cart-reducer';

interface GameProp {
  game: Game;
  dispatch: Dispatch<CartActions>;
}
export default function Game({game, dispatch}: GameProp) {
  // console.log(game, 'Game state');

  const {name, price, image, description} = game;
  //* si le  pasamos argumentos a la funcion handleAddtoCart, debemos de pasarle el argumento en el onClick como callback

  return (
    <div className="col-md-6 col-lg-4 my-4  row align-items-center ">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt={`${name} image`}
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price} </p>
        <button
          type="button"
          className="btn btn-dark w-100 "
          onClick={() => dispatch({type: 'add-to-cart', payload: {item: game}})}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
