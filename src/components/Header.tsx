import {Dispatch, useMemo} from 'react';
import {CartItem} from '../interfaces';
import {CartActions} from '../reducers/cart-reducer';

interface HeaderProps {
  cart: CartItem[];
  // removeItemFromCart: (id: Game['id']) => void;
  // decreaseQuantity: (id: Game['id']) => void;
  // increaseQuantity: (id: Game['id']) => void;
  // clearCart: () => void;
  dispatch: Dispatch<CartActions>;
  // isEmpty: boolean;
  // cartTotal: number;
}

export default function Header({
  cart,
  // removeItemFromCart,
  // decreaseQuantity,
  // increaseQuantity,
  // clearCart,
  dispatch,
}: // isEmpty,
// cartTotal,
HeaderProps) {
  //! Dont import the useCart hook here create new instanse of the hook

  const isEmpty = useMemo(() => cart.length === 0, [cart]); //*Use memo looks like computed properties	from Vue
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(cartGameItem => (
                          <tr key={cartGameItem.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${cartGameItem.image}.jpg`}
                                alt="imagen game"
                              />
                            </td>
                            <td>{cartGameItem.name}</td>
                            <td className="fw-bold">${cartGameItem.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => {
                                  dispatch({
                                    type: 'decrease-quantity',
                                    payload: {id: cartGameItem.id},
                                  });
                                }}
                              >
                                -
                              </button>
                              {cartGameItem.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  dispatch({
                                    type: 'increase-quantity',
                                    payload: {id: cartGameItem.id},
                                  })
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() =>
                                  dispatch({
                                    type: 'remove-from-cart',
                                    payload: {id: cartGameItem.id},
                                  })
                                }
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar:
                      <span className="fw-bold"> ${cartTotal}</span>
                    </p>
                  </>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={() => dispatch({type: 'clear-cart'})}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
