let cart = {}
document.querySelectorAll('.add-to-cart').forEach(elem=>
    elem.onclick = addToCart);
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        getGoodsInfo()
    }

function addToCart(){
    let goodsId = this.dataset.goods_id;
    if(cart[goodsId]){
        cart[goodsId]++
    }else{
        cart[goodsId]=1
    }
    console.log(cart)
    getGoodsInfo()
}

function getGoodsInfo(){
    upDateLocalStorage()
    fetch('/get-goods-info',{
        method:'POST',
        body:JSON.stringify({key:Object.keys(cart)}),
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    .then(function(response){
       return response.text()
    })
    .then(function(body){
        console.log(body)
        showCart(JSON.parse(body))
    })
};
function showCart(data){
    let out='<table class="table-cart"><tbody>';
    console.log(out)
    let total = 0;
    for(key in cart){
     out+=`<tr><td><a href="/goods?id=${key}">${data[key]['name']}</a></tr>`
     out+=`<tr><td><i class="far fa-minus-square cart-minus" data-goods_id="${key}"></i></td>`;
     out+=`<td>${cart[key]}</td>`;
     out+=`<td><i class="far fa-plus-square cart-plus" data-goods_id="${key}"></i></td>`;
     out+=`<td>${data[key]['cost']*cart[key]} тг</td>`
    out+='</tr>';
    total+= cart[key] *data[key]['cost'];
}
out+=`<tr><td>Всего:</td><td>${total} тг</td></tr>`
out+='</tbody></table>'
document.querySelector('.card-nav').innerHTML=out;
document.querySelectorAll('.cart-minus').forEach(function(elem){
    elem.onclick = cartMinus
});
document.querySelectorAll('.cart-plus').forEach(function (elem){
    elem.onclick = cartPlus});
}


function cartPlus(){
   let goodsId = this.dataset.goods_id;
    cart[goodsId]++;
    getGoodsInfo()
};
function cartMinus(){
    let goodsId = this.dataset.goods_id;
   if(cart[goodsId]-1>0){
    cart[goodsId]--
   }
   else{
    delete(cart[goodsId])
   }
     getGoodsInfo()
 }

 function upDateLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
 }


