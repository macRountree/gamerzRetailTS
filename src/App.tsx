import Game from './components/Game';
import Header from './components/Header';
import useCart from './hooks/useCart';
function App() {
  const {
    data,
    cart,
    addtoCart,
    removeItemFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeItemFromCart={removeItemFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map(game => (
            <Game game={game} key={game.id} addtoCart={addtoCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GamerzRetails Sa de Cv - 2024
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
