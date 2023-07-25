var itemId=0;
function addToCart(item)
{
    itemId+=1;
    var selItem=document.createElement('div');
    selItem.classList.add('cartImg');
    selItem.setAttribute('id',itemId);
    var title= document.createElement('div');
    title.innerText = item.children [1].children[1].innerText;
    var cartItems=document.getElementById('title');
    selItem.append(title);
    cartItems.append(selItem);

}