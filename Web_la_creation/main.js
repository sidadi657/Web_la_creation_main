let carts = document.querySelectorAll(".add-cart");


let products = [{
    name: "",
    tag: "",
    price: 0,
    incart: 0
},
]


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
                price: event.target.parentElement.children[1].textContent,
                incart: 0
            }
        }

        cartNumbers(products[i]);
    })
}
function onLoadCartNo() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.item-no span').textContent = productNumbers;
    }
}
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.item-no span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.item-no span').textContent = 1;
    }
    setItems(product);
    if (productNumbers > 0) {
        document.getElementById("cart").style.visibility = "visible";
    }
    else {
        document.getElementById("cart").style.visibility = "hidden";
    }
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);
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

onLoadCartNo();