import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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


const mockCategories = [
  'Bikes',
  'Components',
  'Clothes',
];

const adminTabs = [
  'Product characteristics',
  'Product entries',
]


/**
 * Home page root component
 * @component
 * @return {React.Component}
 */
export default function ProductPage() {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [adminTab, setAdminTab] = useState(0);

  return <PageLayout headerBgColor={'var(--dark)'}
      footerBgColor={'var(--light)'}
      id={style.page}>
    <div id={style.header}>
      <Link to='/'>Online Bike Store</Link>
      <b>Admin Site</b>
    </div>
    <div id={style['category-links']}>
      <TabSelector selected={categoryIdx}
        labels={mockCategories}
        onChange={e => setCategoryIdx(e.target.value)}/>
      <Button filled={true}>Add product type</Button>
    </div>
    <div className={style.spacer}/>
    <TwoThirdsLayout>
      <div>
        <h1>{mockCategories[categoryIdx]}</h1>
        <TabSelector selected={adminTab}
          labels={adminTabs}
          onChange={e => setAdminTab(e.target.value)}/>
        <TabContainer selectedIdx={adminTab}>
          <div id={style['specs']}>
            <Section title='Description'>
              <textarea></textarea>
            </Section>
            <Section title='Customization options'>
              <ItemList useSeparator={true}>
                <div>
                  <CustomizationOptionDesc name='Wheel size'
                    desc={`
                        Small with fast response or large to better keep the momentum,
                        customize your bike with the wheel size that better fits your
                        needs (the extra cost includes the wheel price difference and
                        the cost of a larger frame and fork to accomodate the wheel).
                      `}/>
                  <p>
                    There are 12 choices for this customization option.
                  </p>
                  <DoubleButton label1='Add an option choice'
                    onClick1={() => {
                      console.log('Added factory model');
                    }}
                    label2='List the existing choices'
                    onClick2={() => {
                      console.log('Customizing model');
                    }}/>
                </div>
                <div>
                  <CustomizationOptionDesc name='Wheel size'
                    desc={`
                        Small with fast response or large to better keep the momentum,
                        customize your bike with the wheel size that better fits your
                        needs (the extra cost includes the wheel price difference and
                        the cost of a larger frame and fork to accomodate the wheel).
                      `}/>
                  <p>
                    There are 12 choices for this customization option.
                  </p>
                  <DoubleButton label1='Add an option choice'
                    onClick1={() => {
                      console.log('Added factory model');
                    }}
                    label2='List the existing choices'
                    onClick2={() => {
                      console.log('Customizing model');
                    }}/>
                </div>
                <div>
                  <CustomizationOptionDesc name='Wheel size'
                    desc={`
                        Small with fast response or large to better keep the momentum,
                        customize your bike with the wheel size that better fits your
                        needs (the extra cost includes the wheel price difference and
                        the cost of a larger frame and fork to accomodate the wheel).
                      `}/>
                  <p>
                    There are 12 choices for this customization option.
                  </p>
                  <DoubleButton label1='Add an option choice'
                    onClick1={() => {
                      console.log('Added factory model');
                    }}
                    label2='List the existing choices'
                    onClick2={() => {
                      console.log('Customizing model');
                    }}/>
                </div>
              </ItemList>
            </Section>
          </div>
          <div id={style['products']}>
            <div>
              <label htmlFor='name'>Product name</label>
              <input id='name'></input>
              <br/>
              <label htmlFor='price'>Base price</label>
              <input id='price'></input>
              <br/>
              <label htmlFor='photo'>Photo url</label>
              <input id='price'></input>
              <br/>
              <label htmlFor='product-desc'>Description</label>
              <textarea id='product-desc'></textarea>
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
        </TabContainer>
      </div>
    </TwoThirdsLayout>
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
