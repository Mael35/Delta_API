import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Products from './components/products/Products';
import NewProduct from './components/newProduct/NewProduct';

import './App.css';
import './components/products/products.css';
import "./components/newProduct/newProduct.css";
import Header from './components/Header';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  // const [allCategories, setAllCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    description: "",
    cost: 0,
    categories: []
  });

  const [toDelete, setToDelete] = useState({deleting: false});
  const [posting, setPosting] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);

  
  
  // fetch products and categories data from API
  useEffect(() => {
    fetch('http://localhost:8080/api/private/product')
    .then(res => res.json())
    .then(data => {
      setAllProducts(data);
    })
    .catch(e => console.log(e.toString()));
    
    // fetch('http://localhost:8080/api/private/category')
    // .then(res => res.json())
    // .then(data => {
      //   // const d = JSON.parse(JSON.stringify(data).replace(/</g, '\\u003c'));
      //   setAllCategories(data);
      // })
      // .catch(e => console.log(e.toString()));
  }, [posting, toDelete]);
    
    
  // check if url uses a secured protocol
  const sampleUrl = "https://via.placeholder.com/200/e9fff4";

  function validateUrl(url) {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol);
  }


  // initialize invalidInput state to false to handle error messages
  function initInvalidInput() {
    setInputInvalid(false);
  }

  // validate inputs, handle errors messages and update newProduct state
  function handleChange(event) {
    const {type, name, value} = event.target;

    type === "number" ?
      value.match(/^[0-9]+$/) ?
        setNewProduct(prevState => {
          initInvalidInput(); // we use a separate function here bcz it's bad practice to set a state from inside another state

          return {...prevState,
            id: allProducts.length + 1,
            [name]: Number(value)
          }
        }) 
        :
        setInputInvalid("Cost must be a positive number")
      :
      value.match(/^.*[<>/\\].*$/) ?
        setInputInvalid("Only letters, numbers and spaces") 
        :
        value.length > 255 ?
          setInputInvalid("Max characters is 255")
          :
          setNewProduct(prevState => {
            initInvalidInput();

            return {...prevState,
              id: allProducts.length + 1,
              [name]: value
            }
          });
  }


  // triggers submit and send POST request
  function submitProduct() {
    setPosting(true);
  }

  useEffect(() =>{
    if (posting) {
      
      fetch('http://localhost:8080/api/private/product', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosting(false);
      })
      .catch(e => console.log(e.toString()));
    }
  }, [posting]);


  // triggers deletion and send DELETE request
  function deleteProduct(event, id) {
    event.stopPropagation();

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        setToDelete({deleting: true, productId: id});

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      };
    });
    
  }

  useEffect(() => {
    if (toDelete.deleting) {
      fetch(`http://localhost:8080/api/private/product/${toDelete.productId}`, {
        method: "DELETE"
      })
      // .then(res => {if(res) {res.json()}}) this endpoint doesn't return a body inside the response
      .then(() => {
        setToDelete({deleting: false, productId: -1});
      })
      .catch(e => console.log(e.toString()));
    }
  }, [toDelete])

  // console.log(newProduct);
  // console.log("infinite loop here");
  // console.log(allCategories);
  // console.log(toDelete);
  
  return (
    <div className="App">
      
      <Header />

      <main>
        <Products 
          data={allProducts}
          deleteProduct={deleteProduct}
          validateUrl={validateUrl}
          url={sampleUrl}
        />

        <NewProduct 
          newProduct={newProduct}
          handleChange={handleChange}
          submitProduct={submitProduct}
          inputInvalid={inputInvalid} 
        />
      </main>
    </div>
  );
}

export default App;
