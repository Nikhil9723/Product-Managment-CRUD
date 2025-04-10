import storageHandller from "./storage-handllers.js"

class ProductManagment {
    constructor() {
        this.callIntialEventListner()
        this.deleteProduct()
        this.filterProduct()
        this.getAllProduct("product")
    }
    

    callIntialEventListner() {
        const getProductdata = document.getElementById("add-product-form");
        let addproductBtn = document.querySelector(".edit-form-btn")
        let addProductForm = document.getElementById("addProduct-form");
        let closeForm = document.getElementById("cross-btn");
        
        getProductdata.addEventListener("submit", (e) => {
            e.preventDefault();
            let productName = document.getElementById("product-name").value;
            let productPrice = document.getElementById("product-price").value;
            let productimage = document.getElementById("product-image").value;
            let productDescription = document.getElementById("product-description").value

            this.addproduct(productName, productPrice, productimage, productDescription);
            addProductForm.style.display = "none"
            this.clearFormInput()
        })

         this.getAllProduct("product");
       


        // image preview in add product form
        let Preview = document.getElementById("product-image");
        let previewDiv = document.getElementById("img-preview");
        let imgPreview = document.createElement("img");

        Preview.addEventListener("change", (e) => {
            previewDiv.style.display = "block"
           
                imgPreview.src = ''
                imgPreview.src = e.target.value;
                previewDiv.appendChild(imgPreview);
        })



        addproductBtn.addEventListener("click", (e) => {            
                addProductForm.style.display = "flex";
        })

        closeForm.addEventListener("click", (e) => {
            addProductForm.style.display = "none"
            this.clearFormInput()
        })

    }

    clearFormInput() {
        document.getElementById("product-name").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-image").value = '';
        document.getElementById("product-description").value = ""
    }

    addproduct(prodName, prodPrice, prodImage, prodDesc) {
        const defaultImgUrl = "https://icrier.org/wp-content/uploads/2022/12/media-Event-Image-Not-Found.jpg";
  
        const Product = {
            id: crypto.randomUUID(),
            name: prodName,
            price: prodPrice,
            imgUrl: prodImage ||defaultImgUrl,
            description: prodDesc,
        }
        this.storeProductLocal(Product);
        
    }   

    storeProductLocal(Product) {
        let ManageProduct = storageHandller.getStorage("product");
        ManageProduct.push(Product);
        storageHandller.setStorage("product", ManageProduct)
        this.getAllProduct("product");
    }

    getAllProduct(productKey) {
        let ProductDetails = storageHandller.getStorage(productKey);
        this.createProduct(ProductDetails);

        let anchorTag = document.querySelectorAll(".product-a-style");
        anchorTag.forEach((ele) => {
            ele.addEventListener("click", (e) => {
                if (e.target.tagName === "BUTTON") {
                    e.preventDefault()
                }
            })
        })
        
    }

    createProduct(ProductDetails) {
        const productGroup = document.getElementById("Create-Product-details")
        productGroup.innerHTML = ""

        ProductDetails.forEach(ele => {
            productGroup.innerHTML += `<a class = "product-a-style" href="/product.html?productId=${ele.id}">        
                <div class="main-section__product-list--product-1" >
                    <img height="250" width="100%" src=${ele.imgUrl}>
                    <div class="product-details">
                        <span class="name-style">${ele.name}</span>
                        <span class="price-style">₹ ${ele.price}</span>
                        <span class="desc-style">${ele.description}</span>
                        <div class = "edit-delete-style">
                            <button class="edit-btn-style" id = ${ele.id} value = "editProduct">Edit</button>       
                            <button class="delete-btn-style" id = ${ele.id} value = "deleteProduct">Delete</button>
                        </div>
                    </div>
                </div>                 
            </a>`         
        });   
    }

    deleteProduct() {
        const productGroup = document.getElementById("Create-Product-details")
       
        productGroup.addEventListener("click", (e) => {
            let clc = e.target.closest("a")
            
            if(e.target.value === "deleteProduct") {                
                let deleteId = e.target.id;
                clc.remove()
                this.updateLocalStorage(deleteId);

            } else if(e.target.value == "editProduct") {
                this.editProduct(e.target.id)

            }
            else {
                return;
            }
        })
        this.getAllProduct("product")
    }

     

    
    editProduct(editProductId) {
        let submitEditForm = document.querySelector(".mainsection-submit-form")
        let editForm = document.getElementById("edit-product-form");
        let editProductName = document.getElementById("edit-product-name");
        let editProductPrice = document.getElementById("edit-product-price");
        let editProductImage = document.getElementById("edit-product-imgUrl");
        let editProductDescription = document.getElementById("edit-product-desc");

        let ProductDetails = storageHandller.getStorage("product");

        let closeForm = document.getElementById("close-submit-btn");
        submitEditForm.style.display = "flex";

          ProductDetails.map((ele) => {
            if(ele.id === editProductId) {
            editProductName.value = ele.name;
            editProductPrice.value = ele.price;
            editProductImage.value = ele.imgUrl;
            editProductDescription.value = ele.description;
            }
        })

        let editPreviewDiv = document.getElementById("img-preview-edit");
        let editImgPreview = document.createElement("img");
        editPreviewDiv.style.display = "inline"

        editImgPreview.src = ''
        editImgPreview.src = editProductImage.value;
        editPreviewDiv.appendChild(editImgPreview);
         
        editProductImage.addEventListener("change", (e) => {
            editImgPreview.src = ''
            editImgPreview.src = e.target.value;
            editPreviewDiv.appendChild(editImgPreview);
        })

        
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            ProductDetails.map((ele) => {
                if(ele.id === editProductId) {
                    ele.name = editProductName.value;
                    ele.price = editProductPrice.value;
                    ele.imgUrl = editProductImage.value;
                    ele.description = editProductDescription.value;
                }
            })
            storageHandller.setStorage("product", ProductDetails)
        
            this.getAllProduct("product");
            submitEditForm.style.display = "none"
            

        })

        closeForm.addEventListener("click", (e) => {
            submitEditForm.style.display = "none"
        })


    }

    filterProduct() {
        let filterData = document.getElementById("searchbar");
        filterData.addEventListener("input", (e) => {
            let ProductDetails = storageHandller.getStorage("product")
            this.showFilterProduct(filterData.value, ProductDetails);
        })
    }

    showFilterProduct(filterValue, ProductDetails) {
        filterValue = filterValue.trim();
        let filterArray = ProductDetails.filter((ele) => {
            if( (ele.name.toLowerCase()).includes(filterValue.toLowerCase()) || (ele.description.toLowerCase()).includes(filterValue.toLowerCase())) {
                return ele
            }
            else {
                return;
            }
        })
        storageHandller.setStorage("filterProduct", filterArray)
        this.getAllProduct("filterProduct")    
        if(filterValue === "") {
            this.getAllProduct("product")
        }
    }



    updateLocalStorage(deleteProductId) {        
        let ProductDetails = storageHandller.getStorage("product");
        let updatedProductDetails =  ProductDetails.filter((ele) => {
            if(ele.id !== deleteProductId) {
                return ele;
            }
        })

        storageHandller.setStorage("product", updatedProductDetails);     
    }

}

window.addEventListener('DOMContentLoaded', (e) => {
    new ProductManagment();
    })