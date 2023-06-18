
document.querySelector('.button-close').onclick = closeNav;
document.querySelector('.show-nav').onclick = showNav;
function closeNav(){
    document.querySelector('.site-nav').style.left='-320'
}

function showNav(){
    document.querySelector('.site-nav').style.left='0'
}


function getCategoryList(){
    fetch('/get-category-list',
    {method:'POST'})
    .then(function(res){
        return res.text()
    })
    .then(function(body){
    showCat(JSON.parse(body))
})}
function showCat(data){
    let out = '<ul class="category-list"><li><a href="/">Главная</a></li>';
    for(let i = 0;i<data.length;i++){
        out += `<li><a href="/cat?id=${data[i]['id']}">${data[i]['category']}</a></li>`;
    }
    out += '</ul>';
    document.querySelector('#category-list').innerHTML=out
}

getCategoryList()
