import storageHandller from "./storage-handllers.js";

const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description")
const ProductDetails = storageHandller.getStorage("product");
const productImage = document.getElementById("product-img");

// Using the current page's URL
const myUrl2 = new URL(window.location.toLocaleString());

const productId = myUrl2.searchParams.get("productId");

const productData = ProductDetails.find((item) => item.id === productId)

if(productData) {
productName.textContent =productData.name;
productPrice.textContent = `₹ ${productData.price ?? defaultPrice}`;
productDescription.textContent = productData.description;
productImage.src = productData.imgUrl;
}
