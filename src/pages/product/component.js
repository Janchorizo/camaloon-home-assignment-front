import React, {useState} from 'react';
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


/**
 * Home page root component
 * @component
 * @return {React.Component}
 */
export default function ProductPage() {
  const { category, product_id } = useParams();
  const history = useHistory();
  if (category == undefined) {
    history.push('/product/bikes/2134');
  } else if (product_id == undefined) {
    history.push(`/${category}/bikes/2134`);
  }

  return <PageLayout headerBgColor={'var(--dark)'}
      footerBgColor={'var(--light)'}
      id={style.page}>
    <div id={style.header}>
      <Link to='/'>Online Bike Store</Link>
    </div>
    <div id={style['category-links']}>
      <Link to='/product/bikes/2134'>Bikes</Link>
      <Link to='/product/components/215'>Bike Components</Link>
      <Link to='/product/cloths/2d34'>Clothing</Link>
    </div>
    <hr/>
    <TwoThirdsLayout>
      <img id={style['product-img']}/>
      <div className={style.spacer}/>
      <Section title='Description'>
        This is the product description that the owner would
        write to attract people to the said thing. This same
        description could apply to some other model of the same
        product, or a custom one. It is component agnostic and
        long enough to not make the page feel a bit empty.
      </Section>
      <div className={style.spacer}/>
      <Section title='Customization options'>
        <p>
            roduct description that the owner would write to attract
            people to the said thing. This same description could apply to some other
            model of the same product, or a custom one.
        </p>
        <ItemList>
          <CustomizationOptionDesc name='Wheel size'
            desc={`
                Small with fast response or large to better keep the momentum,
                customize your bike with the wheel size that better fits your
                needs (the extra cost includes the wheel price difference and
                the cost of a larger frame and fork to accomodate the wheel).
              `}/>
          <CustomizationOptionDesc name='Frame color'
            desc={`
                We use the best painting proces possible, ensuring that
                the finnish is perfect. With an extra aouter clear coat
                we can achieve a 100% of surface coverage which will not
                only look good, but protect the frame from rust.
              `}/>
          <CustomizationOptionDesc name='Seat type'
            desc={`
                Choose between our superior seats; go for a traditional
                v-shaped seat or try the newest telescopic seat which allows
                retracting it for better maneuverability.
              `}/>
          <CustomizationOptionDesc name='Gears'
            desc={`
                Go for the lightest bike and the easiest maintenance with a single
                gear transmision, a more flexible single plate one, or a traditional
                three-plate combination.
              `}/>
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
      <Section id={style['side-bar']} title={category + ' supplier'}>
        <h2>Product 1 (id: {product_id})</h2>
        <p>
          This is the product description that the owner would write to attract
          people to the said thing. This same description could apply to some other
          model of the same product, or a custom one. It is component agnostic and
          long enough to not make the page feel a bit empty.
        </p>
        <id id={style['factory-model']}>
          <ItemList gapSizeClass='--space-small'>
            <b>Get the factory model</b>
            <p>
                We manualy choose the parts so that you get the best
                bike out of the box. Also, as we already have them
                prepared, shipping times are usually a lot lower.
            </p>
            <ol>
              <li><b>Frame size:</b> 29 inches</li>
              <li><b>Wheel size:</b> 29 inches</li>
              <li><b>Frame color:</b> Metalic red</li>
              <li><b>Fork:</b> Fox Enduro fb</li>
              <li><b>Break system:</b> Shimano daedra</li>
            </ol>
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
        </id>
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
