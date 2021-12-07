import "./Products.css";
import React, {useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useParams, Link } from 'react-router-dom';
import Api from '../../Api';

function Products() {

  let {path, url} = useRouteMatch();

  return(
  <div className="row">
    <div className="col-sm-1"></div>
      <div className="col-sm-10">
        <h1>Página de produtos</h1>
          <div>
            <ul className="list-group list-group-horizontal">
              <li className="list-group-item list-group-item-action"><Link to={`${url}/1`} className="prod_link">Categoria1</Link></li>
              <li className="list-group-item list-group-item-action"><Link to={`${url}/2`} className="prod_link">Categoria2</Link></li>
              <li className="list-group-item list-group-item-action"><Link to={`${url}/3`} className="prod_link">Categoria3</Link></li>
            </ul>
          </div>
        <Switch>
          <Route exact path={path}>
            <AllCategory />
          </Route>
          <Route path={`${path}/:catId`}>
            <Category/>
          </Route>
        </Switch>
      </div>
    <div className="col-sm-1"></div>
  </div>
  );
}

export default Products;

function AllCategory() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    Api.get('/products')
      .then((response)=>{
        setProducts(response.data);
      });
  }, []);

  return(
    <>
      <h1>Todos os produtos</h1>
      <table className="table table-striped">
        <thead>
          <th>Nome</th>
          <th>Preço</th>
          <th>Descrição</th>
        </thead>
        <tbody>
          {products.map((product, index)=>
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

function Category() {
  let {catId} = useParams();
  const[products, setProducts] = useState([]);

  useEffect(()=>{
    Api.get(`/products/category/${catId}`)
      .then((response)=>{
        setProducts(response.data)
      });
  },[catId]);

  return(
    <>
      <h1>Categoria {catId} foi selecionada</h1>
      <table className="table table-striped">
        <thead>
          <th>Nome</th>
          <th>Preço</th>
          <th>Descrição</th>
        </thead>
        <tbody>
          {products.map((product, index)=>
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}