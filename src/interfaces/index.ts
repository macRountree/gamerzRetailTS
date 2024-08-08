export interface Game {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}
export interface CartItem extends Game {
  quantity: number;
}

export type GameId = Game['id'];
