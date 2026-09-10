let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("search-title");
let searchCategory = document.getElementById("search-category");

let deleteall = document.getElementById("delete-all");


let mood = 'create';

let temp;


// get total
function getTotal() {
  if (price.value != "") {
    let priceTotal = +price.value + +taxes.value + +ads.value;
    let result = (1 - +discount.value / 100) * priceTotal;

    total.innerHTML = `$${Math.round(result)}`;
    total.style.background = "#040";
  } else {
    total.innerHTML = "$0";
    total.style.background = "purple";
  }
}

// create product
let products;
if (localStorage.products != null) {
  products = JSON.parse(localStorage.products);
} else {
  products = [];
}
function checkInputs() {
  if (
    title.value == "" ||
    price.value == "" ||
    count.value == "" ||
    category.value == ""
  )
    return false;
  else return true;
}

// add product
submit.onclick = function () {
  let newproduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (checkInputs()) {
    if(mood === 'create'){
      if(newproduct.count > 1){
      for(let i = 0; i < newproduct.count;i++)  {
        products.push(newproduct)
      }
    }
    else{
      products.push(newproduct)
    }
        alert("Product added successfully");

    }
    else{
      products[temp] = newproduct
              alert("Product updated successfully");
              mood = 'create'
              submit.innerHTML = 'create';
              count.style.display ="block"
              deleteall.style.display = "block"; 

    }
    localStorage.setItem("products", JSON.stringify(products));
    clearInputs();
    readProducts();
  } else alert("Please fill all the required fields");
};

// clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "$0";
  count.value = "";
  category.value = "";
}

// read products
function readProducts() {
  let table = "";
  getTotal();

  for (let i = products.length - 1; i >= 0; i--) {
    table += `
       <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes || 0}</td>
            <td>${products[i].ads || 0}</td>
            <td>${products[i].discount || 0}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td class="button-cell"><button onclick="updateProduct(${i})" id="update">Update ⚙️</button></td>
            <td class="button-cell"><button  onclick="deleteProduct(${i})" id="delete">Delete ❌</button></td>
          </tr>
          `;
  }
  document.getElementById("tbody").innerHTML = table;
  deleteAllHelper();
}
readProducts();

// update product
function updateProduct(i) {
  let itemdel = products[i];
  title.value = itemdel.title;
  price.value = itemdel.price;
  taxes.value = itemdel.taxes || 0;
  ads.value = itemdel.ads || 0;
  discount.value = itemdel.discount || 0;
  total.innerHTML = itemdel.total;
  count.value = itemdel.count;
  category.value = itemdel.category;
  count.style.display='none';
  deleteall.style.display='none'; 
  count.style.display='none';
  submit.innerHTML ='UPDATE'
  mood = 'update'
   temp = i;
   scroll({
    top :0,
    behavior:"smooth"
   })
   getTotal()
   deleteAllHelper();
   

}

// delete product
function deleteProduct(i) {
  products.splice(i, 1);
  localStorage.products = JSON.stringify(products);
  readProducts();
}

function deleteAllHelper() {
  if (products.length !== 0) {
    deleteall.innerHTML =`DELETE ALL (${products.length}) 🗑️`
    deleteall.classList.remove("hidden");
  } else deleteall.classList.add("hidden");
}
deleteAllHelper();

deleteall.onclick = function () {
  let confirmDelete = confirm("ARE U SURE ?");

  if (confirmDelete) {
    products = [];
    localStorage.removeItem("products");
    readProducts();
  }
};
let Id;
function changeSearchMood(id) {
   console.log(id);
  search.focus();
  Id = id.split("-")[1];
  search.placeholder = `Search By ${Id}`;
  search.value = "";
  readProducts();
}

// search product
function searchData(id) {
  
  let t = '';
  for (let i = 0; i < products.length; i++) {
      if(products[i][Id].toLowerCase().includes(search.value.toLowerCase())){
        t += `
       <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes || 0}</td>
            <td>${products[i].ads || 0}</td>
            <td>${products[i].discount || 0}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update ⚙️</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete ❌</button></td>
          </tr>
          `;
      }
    }
    document.getElementById("tbody").innerHTML = t;
    
  }
  
