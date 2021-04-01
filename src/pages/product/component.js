import React, {useState, useEffect} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
// internal
import style from './style.module.css';
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
} from 'components';
import {shop_api} from 'common/api';


function useProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    shop_api.get_categories().then((d) => {
      setCategories(d.categories);
    });
  }, []);

  return categories;
}


function useCategoryProducts(category_id) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category_id != undefined) {
      shop_api.get_category_products({category_id: category_id}).then((d) => {
        setProducts(d.products.map(d => d.id));
      });
    }
  }, [category_id]);

  return products;
}


function useProduct(product_id) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (product_id != undefined) {
      shop_api.get_product({product_id: product_id}).then((d) => {
        setProduct(d.product);
      });
    }
  }, [product_id]);

  return product;
}


function useFactoryModel(product_id) {
  const [factoryModel, setFactoryModel] = useState(null);

  useEffect(() => {
    if (product_id != undefined) {
      shop_api.get_factory_model({product_id: product_id}).then((d) => {
        setFactoryModel(d);
      });
    }
  }, [product_id]);

  return factoryModel;
}


/**
 * Home page root component
 * @component
 * @return {React.Component}
 */
export default function ProductPage() {
  const { category_id, product_id } = useParams();
  const categories = useProductCategories();
  const productIds = useCategoryProducts(category_id);
  const product = useProduct(product_id);
  const product_idx = product && productIds ? productIds.indexOf(+product_id) : -1;
  const factoryModel = useFactoryModel(product_id);
  const factoryModelCost = (product != null && factoryModel != null
    ? product.base_price + factoryModel.customization_options.reduce((ac, dc) => ac+dc.extra_cost, 0)
    : 0)

  const history = useHistory();
  if (category_id == undefined && categories.length > 0) {
    history.push(`/product/${categories[0].id}`);
  } else if (product_id == undefined && productIds.length > 0) {
    history.push(`/product/${category_id}/${productIds[0]}`);
  }

  const categoryLinks = categories.map((c, i) =>
    <Link key={i} to={`/product/${c.id}`}>{c.name}</Link>);
  const prevProductUrl = (product_idx === -1 || product_idx == 0
    ? null
    : `/product/${category_id}/${productIds[product_idx - 1]}`);
  const nextProductUrl = (product_idx === .1 || product_idx == productIds.length - 1
    ? null
    : `/product/${category_id}/${productIds[product_idx +1]}`);

  return <PageLayout headerBgColor={'var(--dark)'}
      footerBgColor={'var(--light)'}
      id={style.page}>
    <div id={style.header}>
      <Link to='/'>Online Bike Store</Link>
    </div>
    <div id={style['category-links']}>
      {categoryLinks}
    </div>
    <hr/>

    <div id={style['product-links']}>
      {prevProductUrl == null ? '' :
        <Link id={style.prev} to={prevProductUrl}>🡸 Previous</Link>
      }
      {nextProductUrl == null ? '' :
        <Link id={style.next} to={nextProductUrl}>Next 🡺</Link>
      }
    </div>

    <TwoThirdsLayout>
      <img id={style['product-img']}/>
      <div className={style.spacer}/>
      <Section title='Description'>
        {product?.description}
      </Section>
      <div className={style.spacer}/>
      <Section title='Customization options'>
        <p>
            Why would I enjoy a custom product? Here we explain you how
            each option affects the final product that arrives at your home.
        </p>
        <ItemList>
          {product?.customization_options?.map?.((o, i) =>
            <CustomizationOptionDesc key={o.name} name={o.name}
              desc={o.description}/>
          )}
        </ItemList>
      </Section>
      <div id='customize' className={style.spacer}/>
      <Section title='Make it your own'>
        <p>
        We understand that the base product may not fit your needs,
        it does not need to. We offer you various options to make
        the product your own:
        </p>
        <ItemList useSeparator={true}>
          <Subsection title='Wheel size'>
            Small with fast response or large to better keep the momentum,
            customize your bike with the wheel size that better fits your
            needs (the extra cost includes the wheel price difference and
            the cost of a larger frame and fork to accomodate the wheel).
          </Subsection>
          <Subsection title='Frame color'>
            We use the best painting proces possible, ensuring that
            the finnish is perfect. With an extra aouter clear coat
            we can achieve a 100% of surface coverage which will not
            only look good, but protect the frame from rust.
          </Subsection>
          <Subsection title='Seat type'>
            Choose between our superior seats; go for a traditional
            v-shaped seat or try the newest telescopic seat which allows
            retracting it for better maneuverability.
          </Subsection>
          <Subsection title='Gears'>
            Go for the lightest bike and the easiest maintenance with a single
            gear transmision, a more flexible single plate one, or a traditional
            three-plate combination.
          </Subsection>
        </ItemList>
      </Section>
      <Section id={style['side-bar']} title={category_id + ' supplier'}>
        <h2>{product?.name}</h2>
        <p>
          {product?.description}
        </p>
        <div id={style['factory-model']}>
          <ItemList gapSizeClass='--space-small'>
            <b>Get the factory model</b>
            <p>
                We manualy choose the parts so that you get the best
                bike out of the box. Also, as we already have them
                prepared, shipping times are usually a lot lower.
            </p>
            <b>Base price: {product?.base_price}€</b>
            <ol>
            {factoryModel?.customization_options?.map?.((o, i) =>
              <li key={i}><b>{o.option_name}</b> {o.name}<br/><i>+ {o.extra_cost}€</i></li>
            )}
            </ol>
            <b>Total price: {factoryModelCost}€</b>
            <DoubleButton label1='Add factory model to chart'
              onClick1={() => {
                console.log('Added factory model');
              }}
              label2='Customize your own product'
              onClick2={() => {
                document.getElementById('customize').scrollIntoView();
              }}
              verticalLayout={true}
              textSizeClass='text-large'/>
          </ItemList>
        </div>
      </Section>
    </TwoThirdsLayout>
    <div className={style.spacer}/>
    <span>
      <h3>Camaloon Home Assignment</h3>
      <h4>This was done as part of a job application</h4>
      <p>
      Alejandro Rodríguez Díaz
        <br/>
      Contact me at: <a href='mailto:jancho@usal.es'>jancho@usal.es</a>
      </p>
    </span>
  </PageLayout>;
}
