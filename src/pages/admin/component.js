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
import CategoryProducts from './category_products.js';


function useProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    admin_api.get_categories().then((response) => {
      if (response.status_code == 200 && response.categories.length > categories.length) {
        setCategories(response.categories);
      }
    });
  }, []);

  return [categories, setCategories];
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
  const [categories, setCategories] = useProductCategories();
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [adminTab, setAdminTab] = useState(0);

  function createCategory() {
    admin_api.create_category().then(response => {
      if (response.status_code == 200 && response.categories.length > categories.length) {
        setCategories(response.categories);
      }
    });
  }

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
      <Button filled={true} onClick={createCategory}>
        Add product type
      </Button>
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
            <CategoryProducts categoryId={categories[categoryIdx]?.id}/>
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
