import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// internal
import style from './product.module.css';
import {
  Button,
  DoubleButton,
  Section,
  Subsection,
  PageLayout,
  TwoThirdsLayout,
  ItemList,
  TabSelector,
  TabContainer,
  CustomizationOptionDesc,
  ModelInput,
  Paginator,
} from 'components';
import {admin_api} from 'common/api';


function useProducts(categoryId) {
  const [products, setProducts] = useState([]);

  function fetchProducts(){
    if (categoryId != undefined) {
      admin_api.get_category_products({category_id: categoryId}).then((response) => {
        if (response.status_code == 200) {
          setProducts(response.products);
        }
      });
    }
  }

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  return [products, setProducts, fetchProducts];
}


export default function CategoryProducts({
  categoryId
}){
  const [products, setProducts, fetchProducts] = useProducts(categoryId);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [togglingProduct, setTogglingProduct] = useState(false);
  const [productIdx, setProductIdx] = useState(0);
  useEffect(() => {
    const idx = Math.min(productIdx, products.length);
    setProductIdx(idx)
  }, [products.join(',')]);
  
  const product = products?.[productIdx]
  
  function createProduct() {
    admin_api.create_product({category_id: categoryId}).then(response => {
      if (response.status_code == 200 && response.products.length > products.length) {
        setProducts(response.products);
      }
    });
  }

  function updateProduct(attr, value) {
    if (categoryId != undefined && product.id != undefined) {
      admin_api.update_product(
          {category_id: categoryId, product_id: product.id},
          {[attr]: value}).then(response => {
        if (response.status_code == 200) {
          const updatedProducts = [...products];
          updatedProducts[productIdx] = response.product;
          setProducts(updatedProducts);
        }
      });
    }
  }

  function deleteProduct() {
    if (deletingProduct === false) {
      setDeletingProduct(true);
      setTimeout(() => setDeletingProduct(false), 1000);
    } else {
      admin_api.delete_product({category_id: categoryId, product_id: product.id}).then(response => {
        if (response.status_code == 200 && response.products.length < products.length) {
          setProducts(response.products);
          setDeletingProduct(false)
          if (productIdx == response.products.length) {
            setProductIdx(response.products.length -1);
          }
        }
      });
    }
  }

  function toggleProductVisibility() {
    if (togglingProduct === false) {
      setTogglingProduct(true);
      setTimeout(() => setTogglingProduct(false), 1000);
    } else {
      updateProduct('hidden', !product.hidden)
    }
  }

  return <div>
    <Button
        filled={true}
        textSizeClass='text-small'
        onClick={createProduct}>
      Create product    
    </Button>
    <br/>
    <br/>
    <Paginator
      pageCount={products.length}
      onChange={page => setProductIdx(page)}/>
    <h2>{product?.name}</h2>
    <div
        id={style['toggle-product']}
        className={togglingProduct === false ? '' : style.togglingProduct}>
      <Button
          textSizeClass='text-small'
          onClick={toggleProductVisibility}>
        Toggle the visibility
      </Button>
      <p>
        <b>The product is currently {product?.hidden === false ? 'VISIBLE' : 'HIDDEN'}</b>
        <br/>
        <i>
          Making the category visible will show it in the shop. This action is
          reversible but people will be able to navigate through the product
          category until they refresh the page. 
        </i>
      </p>
    </div>
    <div
        id={style['delete-product']}
        className={deletingProduct === false ? '' : style.deletingProduct}>
      <Button
          textSizeClass='text-small'
          onClick={deleteProduct}>
        Delete this product
      </Button>
    </div>
    <div id={style['product-header']}>
      <b>Name:</b><br/>
      <ModelInput
        commitCallback={newValue => updateProduct('name', newValue)}
        value={product?.name}/>
      <br/>
      <b>Base price:</b><br/>
      <ModelInput
        commitCallback={newValue => updateProduct('base_price', newValue)}
        type='number'
        value={product?.base_price}/>
      <br/>
      <b>Description:</b><br/>
      <ModelInput
        commitCallback={newValue => updateProduct('description', newValue)}
        textArea={true}
        value={product?.description}/>
    </div>
    <Section id={style['product-choices']} title='Customization options'>
      <ItemList useSeparator={true}>
        <Subsection title='Wheel size'>
        <Button filled={true}>Add choice</Button>
          <ItemList stripped={true}>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
          </ItemList>
        </Subsection>
        <Subsection title='Wheel size'>
          <Button filled={true}>Add choice</Button>
          <ItemList stripped={true}>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
          </ItemList>
        </Subsection>
        <Subsection title='Wheel size'>
          <Button filled={true}>Add choice</Button>
          <ItemList stripped={true}>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
            <div className={style.choice}>
              <span>
                <b>Fox Fork...</b>
                <i> (model ref.: xxx)</i>
                <br/>
                <i>Fox</i>
              </span>
              <b>
                0.0€
              </b>
            </div>
          </ItemList>
        </Subsection>
      </ItemList>
      </Section>
  </div>
}