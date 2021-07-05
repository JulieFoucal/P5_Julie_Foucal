API = " http://localhost:3000/api/teddies/";
const panier = JSON.parse(localStorage.getItem('panier')) || [];

var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

console.log(id);

let currentTeddy

function getParameter(teddy) {
    currentTeddy = teddy
    let src = document.querySelector('.imgproduitpanier').src = `${teddy.imageUrl}`;
    let name = document.querySelector('.nameproduct');
    let description = document.querySelector('.imgdescription');

    description.innerText = `${teddy.description}`
    name.innerText = `${teddy.name}`

    let price = document.querySelector('.priceproduct');
    price.innerText = `${ (teddy.price/100).toFixed(2)} €`
    console.log(src);
    console.log(teddy);
    console.log(description)

}



fetch(API + id)
    .then(function (response) {
        return response.json();
    })
    .then(getParameter)
    .catch(function (error) {
        console.log(error)
    });



// function ajoutAuPanier() {
//     const colorTag = document.getElementById('color');
//     const addTeddy = {
//         _id: currentTeddy._id,
//         name: currentTeddy.name,
//         price: currentTeddy.price,
//         color: colorTag.value,
//         quantity: 1
//     }
    
//     panier.push(addTeddy);
//     localStorage.setItem('panier', JSON.stringify(panier))
// }

let btnAdd = document.querySelector('.btnajoutpanier');
btnAdd.addEventListener("click", function () {

  let image = document.querySelector('.imgproduitpanier').getAttribute('src');
  let color = document.querySelector('#color').value
  let price = parseInt(document.querySelector('.priceproduct').innerText);
  let produits = JSON.parse(localStorage.getItem('produits')) || [];
  let name = document.querySelector('.nameproduct').innerText;
  let productIndex = produits.findIndex(function (element) {
    return element.id === id && element.color == color;
  })
  if (productIndex === -1) {
    produits.push({
      id: id,
      image: image,
      price: price,
      name: name,
      color: color,
      count: 1
    })
  } else {
    produits[productIndex] = {
      id: id,
      image: image,
      price: price,
      color: color,
      name: name,
      count: produits[productIndex].count + 1
    }
  }
  localStorage.setItem('produits', JSON.stringify(produits))
console.log(produits[productIndex])

  let msgTotal = produits.reduce(function (prev, cur) {
    return prev + cur.count;
  }, 0)
  document.querySelector('.number').innerHTML = msgTotal;
  localStorage.setItem('number', msgTotal)

  alert(name +" (" + color + ") a été ajouté au panier !");

});


document.querySelector('.number').innerHTML = localStorage.getItem('number') || 0;
document.querySelector('.panier').innerHTML = localStorage.getItem('panier') || 0;