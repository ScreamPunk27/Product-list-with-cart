let data = '/data.json';
let dessertsGrid = document.querySelector('.desserts__grid');
let products = [];

let id = 0;

let botones;
let buttonsQuantity = document.querySelectorAll('.buttons');
let numQuantity = 1;
let dessertQuantity = 1;

let cart = [];
let cartProducts = document.querySelector('.cart__products');

let counterCart = document.getElementById('counter');

let orderTotal = document.querySelectorAll('.total');
let total = [];
let total2 = [];

let confirmBtn = document.getElementById('btn-buy');

let orderConfirmed = document.querySelector('.confirm__products');
let newOrderBtn = document.querySelector('.btn-new');

/*MUESTRO LOS DESSERTS TRAIDOS DESDE EL ARCHIVO JSON MEDIANTE LA FUNCION showDesserts*/
const showDesserts = ()=>{

    fetch(data)
    .then(response => {
        return response.json();
    })
    .then(data=>{

        /*CREO PROPIEDAD ID*/
        data.forEach(dessert=>{
            dessert.id=id;
            id++;
        })

        /*CREO PROPIEDAD QUANTITY*/
        data.forEach(dessert=>{
            dessert.quantity=1;
        })

        /*CREO PROPIEDAD TOTAL PRICE*/
        data.forEach(dessert=>{
            dessert.total=dessert.price;
        })

        data.forEach((dessert,index)=>{

            products.push(dessert);

            dessertsGrid.insertAdjacentHTML('beforeend',`
                <article class="dessert">
                    <div class="dessert__top">
                        <div class="dessert__top__img">
                            <img src="${dessert.image.mobile}" alt="dessert" />
                        </div>
                        <div class="dessert__top__buttons">
                            <div class="button">
                                <button class="btn-add">
                                    <img src="assets/images/icon-add-to-cart.svg" alt="img"/>
                                    Add to Cart
                                </button>
                            </div>
                            <div class="buttons">
                                <button class="btn-decrement"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg></button>
                                <p class="quantity">1</p>
                                <button class="btn-increment">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="dessert__info">
                        <p class="category">${dessert.category}</p>
                        <h4 class="name">${dessert.name}</h4>
                        <div>$<p class="price">${dessert.price.toFixed(2)}</p></div>
                    </div>
                </article>
            `);

            
        })
        

        /*AGREGO EVENTOS CLICK A LOS BOTONES*/
        botones = document.querySelectorAll('.button');
        let buttonsIncrement = document.querySelectorAll('.btn-increment');
        let buttonsDecrement = document.querySelectorAll('.btn-decrement');

        botones.forEach((boton,index)=>{
            boton.addEventListener('click',()=>{
                boton.style.zIndex="9";
                let productName = products[index].name;
                let productPrice = products[index].price;

                if(!cart.some(e=>e.name===productName)){
                    cart.push(products[index]);                    
                    total.push(productPrice);

                    /*LLAMO A LA FUNCIÓN addToCart PARA QUE ME AGREGUE LOS ITEMS AL CARRO*/ 
                    addToCart();
                    /*LLAMO A LA FUNCION showTotal*/
                    showTotal();
                    document.querySelectorAll('.dessert__top__img')[index].style.border="2px solid var(--red)";
                    
                }
                
            })
        })

        
        
        buttonsIncrement.forEach((btn,index)=>{
            btn.addEventListener('click',()=>{
                increment(index);
            })
        })

        buttonsDecrement.forEach((btn,index)=>{
            btn.addEventListener('click',()=>{
                decrement(index);
            })
        })
        
    })

   
}

const addToCart = ()=>{

    cartProducts.innerHTML="";
    orderConfirmed.innerHTML="";

    cart.forEach((item,index)=>{
        cartProducts.insertAdjacentHTML('beforeend',`
            <article class="product-cart">
                <div class="info">
                    <h4 class="info-name">${item.name}</h4>
                    <div class="info-prices">
                        <div class="container-quantity">
                            ${item.quantity}
                            <p class="x">x</p>
                        </div>
                        <div class="container-prices">
                            @
                            <span>$<p class="price">${item.price.toFixed(2)}</p></span>
                            <span>$<p class="quantity-price">${(item.total).toFixed(2)}</p></span>
                        </div>
                    </div>
                </div>
                <div class="remove" onclick="removeItem(${index},${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                </div>
            </article>
        `);

        orderConfirmed.insertAdjacentHTML('beforeend',`
            <article class="order">
                <div class="order__info">
                    <div class="order__info__img">
                        <img src="${item.image.thumbnail}" alt="order img"/>
                    </div>

                    <div class="order__info__main">
                        <h4 class="info-name">${item.name}</h4>
                        <div class="info-prices">
                            <div class="container-quantity">
                                ${item.quantity}
                                <p class="x">x</p>
                            </div>
                            <div class="container-prices">
                                @
                                <span>$<p class="price">${item.price.toFixed(2)}</p></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order__total">
                    <span>$<p class="quantity-price">${(item.total).toFixed(2)}</p></span>
                </div>
            </article>
        `);

        
    });

    

    console.log(cart);
    cartVisible();
    showCounter();
}


const cartVisible = ()=>{
    document.querySelector('.cart__order').style.display="block";
    document.querySelector('.empty').style.display="none";
}

const isEmpty = ()=>{
    if(cart.length==0){
        document.querySelector('.cart__order').style.display="none";
        document.querySelector('.empty').style.display="block";
    }
}

const showCounter = ()=>{
    let counter = 0;

    if(cart.length==0){
        counterCart.textContent = counter;
    }else{
        cart.forEach(item=>{
            counter = counter + item.quantity;
        });
        counterCart.textContent = counter;
    }
}

const showTotal = ()=>{
    let totalNum = 0;
    
    if(cart.length==0){
        orderTotal.forEach(i=>{
            i.textContent = 0;
        })
    }else{
        for(let i=0; i<cart.length; i++){
            totalNum = totalNum + cart[i].total;
        }
    
        orderTotal.forEach(i=>{
            i.textContent=totalNum.toFixed(2);
        })
    }    
}

const removeItem = (i,id)=>{
    cart[i].quantity=1;
    cart[i].total=cart[i].price;
    cart.splice(i,1);
    total.splice(i,1);
    botones[id].style.zIndex="100";
    addToCart();
    showTotal();
    showCounter();
    isEmpty();
    document.querySelectorAll('.quantity')[id].innerText = 1;
    document.querySelectorAll('.dessert__top__img')[id].style.border="2px solid transparent";
}

const increment = (i)=>{
    console.log(products[i]);
    cart.forEach(item=>{
        if(products[i].name===item.name){
            item.quantity=item.quantity+=1;
            item.total=item.price*item.quantity;
            addToCart();
            showTotal();
            showCounter();
            document.querySelectorAll('.quantity')[i].innerText = Number(document.querySelectorAll('.quantity')[i].innerText) + 1;
        }

    })
}

const decrement = (i)=>{
    cart.forEach(item=>{
        if(products[i].name===item.name){
            if(item.quantity>1){
                item.quantity=item.quantity-=1;
                item.total=item.total-item.price;
                addToCart();
                showTotal();
                showCounter();
                document.querySelectorAll('.quantity')[i].innerText = Number(document.querySelectorAll('.quantity')[i].innerText) - 1;
            }
        }
    })
}



/*AL HACER CLICK EN CONFIRMAR ORDER, REINICIO TODO*/
confirmBtn.addEventListener('click',()=>{
    document.querySelector('.order__confirm').style.display="flex";
})

newOrderBtn.addEventListener('click',()=>{
    document.querySelector('.order__confirm').style.display="none";
    for(let i=0; i<botones.length; i++){
        botones[i].style.zIndex="100";
    }
    document.querySelectorAll('.quantity').forEach(i=>{
        i.innerText=1;
    })

    document.querySelectorAll('.dessert__top__img').forEach(i=>{
        i.style.border="2px solid transparent";
    })

    cart.splice(0);
    products.forEach(product=>{
        product.quantity=1;
        product.total=product.price;
    })
    addToCart();
    showTotal();
    isEmpty();
})

showDesserts();
showCounter();

