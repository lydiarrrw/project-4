import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Menu() {
  const [menu, updateMenu] = useState([])
  const [acts, updateActs] = useState([])
  const [productType, updateProductType] = useState('Food')
  const [products, updateProducts] = useState([])
  const [actID, updateActID] = useState('')
  const token = localStorage.getItem('token')
  const [basket, updateBasket] = useState([])
  const [modal, showModal] = useState(false)


  async function getMenu() {
    try {
      const { data } = await axios.get('/api/products')
      updateMenu(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getMenu()
  }, [])

  function filterByProduct() {
    return menu.filter(product => {
      return (product.product_type === productType)
    })
  }

  function addToProducts(productID) {
    const tempProductArr = [...products, productID]
    return updateProducts(tempProductArr)
  }

  async function getLineUp() {
    try {
      const { data } = await axios.get('/api/acts')
      updateActs(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getLineUp()
  }, [])

  //function to get the act id for the api request 
  function getActId(key) {
    const selectedAct = key.value
    updateActID(selectedAct)
  }
  console.log(`products array contains: ${products}`)


  async function submitUserOrder(token, actID, products) {
    try {
      await axios.post(`/api/order/${actID}`, { products: products }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log()
    } catch (err) {
      console.log(err)
    }
  }

  function displayBasket() {
    const tempBasket = []
    products.forEach(product => {
      const itemToShow = menu.find(item => {
        return product === item.id
      })
      // console.log(itemToShow)
      tempBasket.push(itemToShow)
      updateBasket(tempBasket)
    })
    showModal(!modal)
  }
  console.log(basket)

  return <main>
    <div className="tabs is-toggle is-fullwidth mb-2">
      <ul onClick={(event) => updateProductType(event.target.innerText)}>
        <li className="" >
          <a>
            <span className="is-mobile-size-4 has-text-weight-bold">Food</span>
          </a>
        </li>
        <li>
          <a>
            <span className="is-mobile-size-4 has-text-weight-bold">Drinks</span>
          </a>
        </li>
      </ul>
    </div>
    <img id="hero-home" src="https://www.austinchronicle.com/binary/4f1d/27023542_327502024412463_2334521810091458092_o.jpg" />
    <div className="card" >
      <div className="card-content is-flex is-justify-content-space-between column pt-0 pb-0">
        <div className="column is-mobile-size-5 has-text-weight-bold">Product</div>
        <div className="column is-mobile-size-5 has-text-weight-bold">Price</div>
        <div className="column is-mobile-size-5 has-text-weight-bold">Add to basket</div>
      </div>
    </div>
    <div>
      {filterByProduct().map(product => {
        return <div className="card" key={product.id}>
          <div className="card-content is-flex is-justify-content-space-between column " key={product.id}>
            <img className="image is-64x64 is-fullwidth is-vcentered is-centered" src={product.image} />
            <div className="column">
              <h5 className="is-mobile-size-4 is-vcentered is-centered has-text-weight-bold">{product.product_name}</h5>
            </div>
            <div className="column">
              <h5 className="is-mobile-size-4 is-vcentered is-centered">£{product.price.toFixed(2)}</h5>
            </div>
            <div className="column">
              <button onClick={(event) => addToProducts(product.id)} className="button is-primary is-vcentered is-centered">Add</button>
            </div>
          </div>
        </div>
      })}
    </div>
    <section className="columns card is-flex is-justify-content-space-between">
      <label className="column is-one-third is-mobile-size-4">Collection point</label>
      <select className="column is-one-third is-mobile-size-4" onChange={(event) => getActId(event.target)} >
        {acts.map(act => {
          return <option key={act.id} value={act.id}>{act.artist_name}: {act.set_time}</option>
        })}
      </select>
    </section>
    <section className="card">
    <button className="button is-rounded is-danger" onClick={() => displayBasket()}>Create Order</button>
    </section>

    {/* View basket modal */}
    <div className={`modal ${modal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Basket</p>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)}></button>
        </header>
        <section className="modal-card-body">
          <div className="columns is-mobile is-vcentered is-centered">
            <div className="column is-one-third">Items</div>
            <div className="column is-one-third">Qty</div>
            <div className="column is-one-third">Price</div>
          </div>
          {basket.map(product => {
            return <div key={product.product_name}>
              <div className="columns is-mobile is-vcentered is-centered">
                <img className="image is-one-quarter is-64x64" src={product.image} />
                <div className="column is-one-quarter has-text-centered">{product.product_name}</div>
                <div className="column is-one-quarter has-text-centered">1</div>
                <div className="column is-one-quarter has-text-centered">{`£${product.price}`}</div>
              </div>
            </div>
          })}
          <div className="columns is-mobile is-vcentered is-centered">
            <div className="column is-one-third has-text-centered has-text-weight-bold">Total</div>
            <div className="column is-one-third has-text-centered"></div>
            <div className="column is-one-quarter has-text-centered has-text-weight-bold">{`£${basket.reduce((total, product) => total + product.price, 0).toFixed(2)}`}</div>
          </div>
        </section>
        <footer className="modal-card-foot">
          {<Link
            to={'/profile'}>
            <button onClick={() => submitUserOrder(token, actID, products)} className="button is-rounded is-primary">Submit order</button>
          </Link>}
        </footer>
      </div>
    </div>
  </main>
}