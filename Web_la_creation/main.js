let carts = document.querySelectorAll(".add-cart");


let products = [{
    name: "",
    tag: "",
    price: 0,
    incart: 0
},
]

let productNumbers=0;
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        let exist = 0;
        let nameE = event.target.parentElement.children[0].textContent;

        for (let j = 0; j < products.length; j++) {
            if (products[j]?.name === nameE) {
                exist = 1;
            }
            else {
                exist = 0;
            }
        }

        if (exist != 1) {
            products[i] = {
                name: event.target.parentElement.children[0].textContent,
                tag: event.target.parentElement.children[0].textContent.toLowerCase().replace(/\s/g, ""),
                price: event.target.parentElement.children[3].textContent.replace('₹', ''),
                incart: 0
            }
        }

        cartNumbers(products[i]);
        totalCost(products[i]);
        
    })
}
function onLoadCartNo() {
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost=localStorage.getItem("totalCost");
    if(cartCost)
    {
        if ( document.URL.includes("cart.html") ) {
            document.querySelector('.total h2').textContent = "₹"+parseInt(cartCost);
        }
        document.querySelector('.cost span').textContent = "₹"+parseInt(cartCost);
    }
    if (productNumbers) {
        document.querySelector('.item-no span').textContent = productNumbers;
    }
    if (document.querySelector('.item-no span').textContent >= 1) {
        document.getElementById("cart").style.visibility = "visible";
    }
    else {
        document.getElementById("cart").style.visibility = "hidden";
    }
}
function cartNumbers(product) {

    productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.item-no span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.item-no span').textContent = 1;
    }
    setItems(product);
    if (document.querySelector('.item-no span').textContent >= 1) {
        document.getElementById("cart").style.visibility = "visible";
    }
    else {
        document.getElementById("cart").style.visibility = "hidden";
    }
 
    
    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {

        if(cartItems [product.tag] == undefined) {
            cartItems = {
            ...cartItems,
            [product.tag]: product
            }
        }
        
        cartItems[product.tag].incart += 1;
    }
    else {
        product.incart = 1;
        cartItems =
        {
            [product.tag]: product
        }
    }


    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product)
{
    product.price=parseInt(product.price);
    let cartCost=localStorage.getItem("totalCost");
    if(cartCost!=null)
    {
        cartCost=parseInt(cartCost)+product.price;
        localStorage.setItem("totalCost", parseInt(cartCost));
    }
    else
    {
        cartCost=product.price;
        localStorage.setItem("totalCost", parseInt(cartCost));
    }
    document.querySelector('.cost span').textContent = "₹"+parseInt(cartCost);
    console.log(cartCost);
    console.log(typeof product.price);
    document.querySelector('.total h2').textContent = "₹"+parseInt(cartCost);

}

function displayCart()
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    if(cartItems && productContainer)
    {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
            <div class="row product-row">
            <i class="fa-solid fa-circle-xmark col-1"></i>
            <div class="product col-3">
                
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price col-3">₹${item.price}</div>
            <div class="quantity col-2">
            
            ${item.incart}
            
            </div>
            <div class="price col-3">₹${item.incart*item.price}</div>
            </div>
            `
        });
        
    }
}
displayCart();
onLoadCartNo();
