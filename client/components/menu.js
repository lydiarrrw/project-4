import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Menu() {
  const [menu, updateMenu] = useState([])
  const [productType, updateProductType] = useState('Food')
  const [collectionPoint, updateCollectionPoint] = useState('Diamond')
  const [basket, updateBasket] = useState({})

  const products = []


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

  //function triggered by onclick add button to addToProducts(product_id, stage, user_id)
  console.log(collectionPoint)

  return <main>
    <div className="tabs is-toggle is-fullwidth">
      <ul onClick={(event) => updateProductType(event.target.innerText)}>
        <li className="" >
          <a>
            <span className="title is-4">Food</span>
          </a>
        </li>
        <li>
          <a>
            <span className="title is-4">Drinks</span>
          </a>
        </li>
      </ul>
    </div>
    <img className="is-fullwidth" src="https://www.austinchronicle.com/binary/4f1d/27023542_327502024412463_2334521810091458092_o.jpg" />
    <div>
      {filterByProduct().map(product => {
        return <div className="card" key={product.id}>
          <div className="card-content is-flex is-justify-content-space-between column" key={product.id}>
            <img className="image is-64x64" src={product.image} />
            <div className="column">
              <h5 className="is-size-3">{product.product_name}</h5>
            </div>
            <div className="column">
              <h5 className="is-size-3">£{product.price}</h5>
            </div>
            <div className="column">
              <button className="button is-primary">Add</button>
            </div>
          </div>
        </div>
      })}
      <section className="is-flex is-justify-content-space-between">
        <label className="is-size-3">Collection point</label>
        <select onChange={(event) => updateCollectionPoint(event.target.value)} className="is-size-3">
          <option>Diamond</option>
          <option>Lion Ring</option>
          <option>Fairground</option>
        </select>
        <button className="button is-rounded is-danger">Submit Order</button>
      </section>
    </div>
  </main>
}

