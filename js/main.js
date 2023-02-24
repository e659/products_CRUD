var productName = document.getElementById("product-name"),
  productCategory = document.getElementById("product-category"),
  productPrice = document.getElementById("product-price"),
  productDescription = document.getElementById("product-description"),
  addBtn = document.getElementById("add-btn"),
  tableBody = document.getElementById("table-body"),
  inputs = document.getElementsByClassName("form-control"),
  searchText = document.getElementById("search-text"),
  emptyAlert = document.getElementById("empty-input-alert"),
  displayTableHref = document.getElementById("display-table-href"),
  PNameAlert = document.getElementById("PNameAlert"),
  PPriceAlert = document.getElementById("PPriceAlert"),
  PCategoryAlert = document.getElementById("PCategoryAlert"),
  PDescriptionAlert = document.getElementById("PDescriptionAlert"),
  productsArr,
  currentIndex;

//Update Table After Refresh -- from storage:
if (localStorage.getItem("ProductsList") == null) {
  productsArr = [];
} else {
  productsArr = JSON.parse(localStorage.getItem("ProductsList"));
  display();
}

// Add new Product
addBtn.onclick = function () {
  if (
    productName.value == "" ||
    productCategory.value == "" ||
    productPrice.value == "" ||
    productDescription.value == ""
  ) {
    emptyAlert.innerHTML = "Please Fill In Required Info and Try Again!";
    displayTableHref.removeAttribute("href");
  } else if (addBtn.innerHTML == "Add Product") {
    addProduct();
    displayTableHref.setAttribute("href", "#display-table-href");
    emptyAlert.innerHTML = "";
  } else {
    updateProduct(currentIndex);
    displayTableHref.setAttribute("href", "#display-table-href");
    emptyAlert.innerHTML = "";
  }
  localStorage.setItem("ProductsList", JSON.stringify(productsArr));
  display();
  restForm();
};
// Add Products To Array
function addProduct() {
  if (
    validateProductName() == true &&
    validateProductCategory() == true &&
    validateProductPrice() == true &&
    validateProductDescription() == true
  ) {
    var product = {
      name: productName.value,
      category: productCategory.value,
      price: productPrice.value,
      description: productDescription.value,
    };
    productsArr.push(product);
    // console.log(productsArr);
    localStorage.setItem("ProductsList", JSON.stringify(productsArr));
  }
}
// display Products In Table
function display() {
  var cartona = "";
  for (var i = 0; i < productsArr.length; i++) {
    cartona += `
    <tr>
    <td>${i}</td>
                    <td>${productsArr[i].name}</td>
                    <td>${productsArr[i].category}</td>
                    <td>${productsArr[i].price}</td>
                    <td>${productsArr[i].description}</td>
                    <td>
                    <a href="#" class="text-decoration-none">
                        <i onclick="getProductInfo(${i})" class="fas fa-edit text-green"></i>
                    </a>
                </td>
                <td>
                    <i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i>
                </td>
    </tr>
    `;
  }
  tableBody.innerHTML = cartona;
}
// resetForm
function restForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  PNameAlert.classList.remove("d-block");
  PNameAlert.classList.add("d-none");

  productCategory.classList.remove("is-valid");
  productCategory.classList.remove("is-invalid");
  PCategoryAlert.classList.remove("d-block");
  PCategoryAlert.classList.add("d-none");

  productPrice.classList.remove("is-valid");
  productPrice.classList.remove("is-invalid");
  PPriceAlert.classList.remove("d-block");
  PPriceAlert.classList.add("d-none");

  productDescription.classList.remove("is-invalid");
  productDescription.classList.remove("is-valid");
  PDescriptionAlert.classList.remove("d-block");
  PDescriptionAlert.classList.add("d-none");
}
// delete Product
function deleteProduct(index) {
  productsArr.splice(index, 1);
  display();
  localStorage.setItem("ProductsList", JSON.stringify(productsArr));
}
// search
searchText.onkeyup = function () {
  var text = searchText.value;
  var cartona = "";
  for (var i = 0; i < productsArr.length; i++) {
    if (productsArr[i].name.toLowerCase().includes(text.toLowerCase())) {
      cartona += `
      <tr>
      <td>${i}</td>
                      <td>${productsArr[i].name}</td>
                      <td>${productsArr[i].category}</td>
                      <td>${productsArr[i].price}</td>
                      <td>${productsArr[i].description}</td>
                      <td>
                      <a href="#" class="text-decoration-none">
                          <i onclick="updateProduct(${i})" class="fas fa-edit text-green"></i>
                      </a>
                  </td>
                  <td>
                      <i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i>
                  </td>
      </tr>
      `;
    }
  }
  tableBody.innerHTML = cartona;
};
// getProductInfo
function getProductInfo(index) {
  addBtn.innerHTML = "Update";
  productName.value = productsArr[index].name;
  productPrice.value = productsArr[index].price;
  productCategory.value = productsArr[index].category;
  productDescription.value = productsArr[index].description;
  currentIndex = index;
  // console.log(currentIndex);
}
// update
function updateProduct(currentIndex) {
  addBtn.innerHTML = "Add Product";
  if (
    validateProductName() == true &&
    validateProductCategory() == true &&
    validateProductPrice() == true &&
    validateProductDescription() == true
  ) {
    productsArr[currentIndex].name = productName.value;
    productsArr[currentIndex].category = productCategory.value;
    productsArr[currentIndex].price = productPrice.value;
    productsArr[currentIndex].description = productDescription.value;
  }
}

// ************** Validation ************

// 1 -- Validate Product Name Function:
// validateName
// 1 -- Validate Product Name Function:
function validateProductName() {
  var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;

  if (regex.test(productName.value) == true) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");

    PNameAlert.classList.add("d-none");
    PNameAlert.classList.remove("d-block");

    addBtn.disabled = false;

    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");

    PNameAlert.classList.add("d-block");
    PNameAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
}

//Check Duplicated Product Name
function checkDuplicatedNames() {
  for (var i = 0; i < productTable.length; i++) {
    if (productName.value == productTable[i].name) {
      productName.classList.add("is-invalid");
      productName.classList.remove("is-valid");

      PNameAlert.classList.add("d-block");
      PNameAlert.classList.remove("d-none");

      PNameAlert.innerHTML = "Product Name Already Exists";

      addBtn.disabled = true;
    }
  }
}

productName.addEventListener("keyup", validateProductName);
productName.addEventListener("blur", checkDuplicatedNames);

// 2 -- Validate Product Category Function:
function validateProductCategory() {
  var regex = /^[a-z A-Z 0-9]{5,}$/;

  if (regex.test(productCategory.value) == true) {
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");

    PCategoryAlert.classList.add("d-none");
    PCategoryAlert.classList.remove("d-block");

    addBtn.disabled = false;

    return true;
  } else {
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");

    PCategoryAlert.classList.add("d-block");
    PCategoryAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
}

productCategory.addEventListener("keyup", validateProductCategory);

// 3 -- Validate Product Price Function:
function validateProductPrice() {
  var regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;

  if (regex.test(productPrice.value) == true) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");

    PPriceAlert.classList.add("d-none");
    PPriceAlert.classList.remove("d-block");

    addBtn.disabled = false;

    return true;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");

    PPriceAlert.classList.add("d-block");
    PPriceAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
}

productPrice.addEventListener("keyup", validateProductPrice);

// 4 -- Validate Product Description:
function validateProductDescription() {
  var regex = /^[a-z A-Z 0-9]{3,}$/;

  if (regex.test(productDescription.value) == true) {
    productDescription.classList.add("is-valid");
    productDescription.classList.remove("is-invalid");

    PDescriptionAlert.classList.add("d-none");
    PDescriptionAlert.classList.remove("d-block");

    addBtn.disabled = false;

    return true;
  } else {
    productDescription.classList.add("is-invalid");
    productDescription.classList.remove("is-valid");

    PDescriptionAlert.classList.add("d-block");
    PDescriptionAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
}

productDescription.addEventListener("keyup", validateProductDescription);
