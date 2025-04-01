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
        console.log(closeForm);
        
        console.log(getProductdata);
        getProductdata.addEventListener("submit", (e) => {
            e.preventDefault();
            let productName = document.getElementById("product-name").value;
            let productPrice = document.getElementById("product-price").value;
            let productimage = document.getElementById("product-image").value;
            let productDescription = document.getElementById("product-description").value
            console.log(productName, productPrice, productimage, productDescription);
            console.log("Helloooo");

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
            console.log("previewwww");
            previewDiv.style.display = "block"
           
                console.log(e.target.value);
                imgPreview.src = ''
                imgPreview.src = e.target.value;
                console.log(imgPreview.src);
                previewDiv.appendChild(imgPreview);
        })



        addproductBtn.addEventListener("click", (e) => {
            console.log("add product");
            
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
  
        const Product = {
            id: crypto.randomUUID(),
            name: prodName,
            price: prodPrice,
            imgUrl: prodImage || "https://icrier.org/wp-content/uploads/2022/12/media-Event-Image-Not-Found.jpg",
            description: prodDesc,
        }
        this.storeProductLocal(Product);
        
    }   

    storeProductLocal(Product) {
        let ManageProduct = JSON.parse( localStorage.getItem("product") )|| [];
        ManageProduct.push(Product);
        localStorage.setItem("product", JSON.stringify(ManageProduct));
        this.getAllProduct("product");
    }

    getAllProduct(productKey) {
        let ProductDetails = JSON.parse( localStorage.getItem(productKey) )|| []
        console.log(ProductDetails, "hII");
        this.createProduct(ProductDetails);

        let anchorTag = document.querySelectorAll(".product-a-style");
        anchorTag.forEach((ele) => {
            ele.addEventListener("click", (e) => {
                if (e.target.tagName === "BUTTON") {
                    e.preventDefault()
                }
                console.log(e.target.tagName);
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
            console.log(e.target.value);
            
            if(e.target.value === "deleteProduct") {
                // console.log(e.target.id);
                
                let deleteId = e.target.id;
                clc.remove()
                console.log("Removed");

                this.updateLocalStorage(deleteId);

            } else if(e.target.value == "editProduct") {
                // console.log("hiii from else if");
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
        let ProductDetails = JSON.parse( localStorage.getItem("product") )|| [];

        let closeForm = document.getElementById("close-submit-btn");
        submitEditForm.style.display = "flex";

          ProductDetails.map((ele) => {
            if(ele.id === editProductId) {
            console.log(ele.id);
            editProductName.value = ele.name;
            editProductPrice.value = ele.price;
            editProductImage.value = ele.imgUrl;
            editProductDescription.value = ele.description;
            }
        })

        let editPreviewDiv = document.getElementById("img-preview-edit");
        let editImgPreview = document.createElement("img");
        editPreviewDiv.style.display = "inline"

        console.log(editProductImage);
        editImgPreview.src = ''
        editImgPreview.src = editProductImage.value;
        console.log(editImgPreview.src);
        editPreviewDiv.appendChild(editImgPreview);
         
        editProductImage.addEventListener("change", (e) => {
            console.log("previewwww");           
            console.log(e.target.value);
            editImgPreview.src = ''
            editImgPreview.src = e.target.value;
            console.log(editImgPreview.src);
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
            localStorage.setItem("product", JSON.stringify(ProductDetails));
            
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
            let ProductDetails = JSON.parse( localStorage.getItem("product") )|| []
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
        console.log(filterArray);

        localStorage.setItem("filterProduct", JSON.stringify(filterArray));
        this.getAllProduct("filterProduct")    
        if(filterValue === "") {
            this.getAllProduct("product")
        }
    }



    updateLocalStorage(deleteProductId) {
        console.log(deleteProductId);
        
        let ProductDetails = JSON.parse( localStorage.getItem("product") )|| []
        console.log(deleteProductId);

        let updatedProductDetails =  ProductDetails.filter((ele) => {
            if(ele.id !== deleteProductId) {
                return ele;
            }
        })

        localStorage.setItem("product", JSON.stringify(updatedProductDetails));        
    }

}

window.addEventListener('DOMContentLoaded', (e) => {
    new ProductManagment();
    })