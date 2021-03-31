import React, {useState, useEffect} from 'react';
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
  ModelInput,
} from 'components';
import {admin_api} from 'common/api';
import CategoryOptions from './category_options.js';


function useProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    admin_api.get_categories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return categories;
}


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
  const categories = useProductCategories();
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
        labels={categories.map(d => d.name)}
        onChange={e => setCategoryIdx(e.target.value)}/>
      <Button filled={true}>Add product type</Button>
    </div>
    <div className={style.spacer}/>
    <TwoThirdsLayout>
      <div>
        <h1>
          <ModelInput value={categories[categoryIdx]?.name}/>
        </h1>
        <TabSelector selected={adminTab}
          labels={adminTabs}
          onChange={e => setAdminTab(e.target.value)}/>
        <TabContainer selectedIdx={adminTab}>
          <div id={style['specs']}>
            <Section title='Description'>
              <ModelInput value={categories[categoryIdx]?.description}/>
            </Section>
            <CategoryOptions categoryId={categories[categoryIdx]?.id}/>
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
