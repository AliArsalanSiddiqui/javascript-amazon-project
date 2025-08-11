import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';

export function renderPaymentSummary(){
  let itemsPrice = 0;
  let matchingItem;
  let shippingFee = 0;
  let beforeTax = 0;
  let tax = 0;
  let afterTax = 0;
  let html = '';
  let totalQuantity = 0;
  cart.forEach((cartItem)=>{

    products.forEach((product)=>{
      if(cartItem.productId === product.id){
        matchingItem = product;
      }
    })
    
    itemsPrice += matchingItem.priceCents * cartItem.quantity;
    totalQuantity += cartItem.quantity;
    
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;
        
    deliveryOptions.forEach((option)=>{
     if(option.id === deliveryOptionId){
        deliveryOption = option;
         shippingFee += deliveryOption.priceCents;
      }
    })
  })
  beforeTax = itemsPrice + shippingFee;
  tax = beforeTax / 10;
  afterTax = beforeTax + tax;
  console.log(formatCurrency(itemsPrice));
  console.log(formatCurrency(shippingFee));
  console.log(formatCurrency(beforeTax));
  console.log(formatCurrency(afterTax));
  console.log(formatCurrency(tax));


  html =`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingFee)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(beforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(afterTax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = html;
}