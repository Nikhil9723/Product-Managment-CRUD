let productName = document.getElementById("product-name");
console.log(productName);

let productPrice = document.getElementById("product-price");
let productDescription = document.getElementById("product-description")


let ProductDetails = JSON.parse( localStorage.getItem("product") )|| []
let productImage = document.getElementById("product-img")
// console.log(ProductDetails);

// Using a custom URL string
// const myUrl1 = new URL(`http://127.0.0.1:5500/product.html?productId=`);


// Using the current page's URL
const myUrl2 = new URL(window.location.toLocaleString());

const productId = myUrl2.searchParams.get("productId");
console.log(productId);

console.log(productImage.src);


ProductDetails.map((item) => {
    console.log(item);
    
    if(item.id === productId) {
        productName.textContent = item.name;
        productPrice.textContent = `₹ ${item.price}`;
        productDescription.textContent = item.description;
        productImage.src = item.imgUrl;
    }
})