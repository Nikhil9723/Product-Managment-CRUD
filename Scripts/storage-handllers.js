const storageHandller = {
    getStorage(key) {
        let ManageProduct = JSON.parse( localStorage.getItem(key) )|| [];
        return ManageProduct;
    },

    setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export default storageHandller;