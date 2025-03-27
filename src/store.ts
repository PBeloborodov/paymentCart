import {makeAutoObservable, observable} from 'mobx';
import {OrderOption, Product} from './screens/list-card/types';
import {Alert} from 'react-native';

class Store {
  products: Product[] = Array.from({length: 1000}, (_, i) => ({
    id: i,
    name: `Товар ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 50,
  }));
  cart: Product[] = [];
  get hasInCart() {
    return (productId: number) => this.cart.some(p => p.id === productId);
  }
  options: OrderOption[] = [
    {id: 'leave_at_door', name: 'Оставить у двери', selected: false},
    {id: 'call_on_delivery', name: 'Позвонить при доставке', selected: false},
  ];

  constructor() {
    makeAutoObservable(this, {
      cart: observable,
    });
  }

  addProduct(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.cart.push(product);
      this.sendAnalytics();
    }
  }

  removeProduct(productId: number) {
    const index = this.cart.findIndex(product => product.id === productId);
    this.cart.splice(index, 1);
    this.sendAnalytics();
  }

  toggleOption(optionId: string) {
    const option = this.options.find(o => o.id === optionId);
    if (option) {
      option.selected = !option.selected;
      this.sendAnalytics();
    }
  }

  async sendAnalytics() {
    try {
      await this.mockApiCall();
      console.log('Аналитика успешно отправлена');
    } catch (error) {
      console.error('Ошибка отправки аналитики', error);
    }
  }

  async submitOrder() {
    if (this.totalPrice < 1000) {
      Alert.alert('Ошибка', 'Минимальная сумма заказа - 1000р.');
      return;
    }
    try {
      await this.mockApiCall();
      Alert.alert('Успех', 'Заказ успешно оформлен!');
    } catch (error) {
      Alert.alert('Ошибка оформления заказа', error.message);
    }
  }

  get totalPrice() {
    let total = 0;
    this.cart.forEach((quantity, productId) => {
      const product = this.products.find(p => p.id === productId);
      if (product) total += product.price;
    });
    return total;
  }

  async mockApiCall() {
    return new Promise((resolve, reject) => {
      console.log('Данные для аналитики', {
        cart: this.cart,
        options: this.options,
      });
      setTimeout(() => {
        Math.random() > 0.8
          ? reject(new Error('Сервис недоступен'))
          : resolve('OK');
      }, 500);
    });
  }
}

export const store = new Store();
