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
  const [adminTab, setAdminTab] = useState(1);
  const [deletingCategory, setDeletingCategory] = useState(false)
  const [togglingVisibility, setTogglingVisibility] = useState(false)

  function createCategory() {
    admin_api.create_category().then(response => {
      if (response.status_code == 200 && response.categories.length > categories.length) {
        setCategories(response.categories);
      }
    });
  }

  function deleteCategory() {
    if (deletingCategory === false) {
      setDeletingCategory(true);
      setTimeout(() => setDeletingCategory(false), 1000);
    } else {
      admin_api.delete_category({category_id: categories[categoryIdx].id}).then(response => {
        if (response.status_code == 200 && response.categories.length < categories.length) {
          setCategories(response.categories);
          setDeletingCategory(false)
          if (categoryIdx == response.categories.length) {
            setCategoryIdx(response.categories.length -1);
          }
        }
      });
    }
  }

  function toogleCategoryVisibility() {
    if (togglingVisibility === false) {
      setTogglingVisibility(true);
      setTimeout(() => setTogglingVisibility(false), 1000);
    } else {
      admin_api.update_category(
          {category_id: categories[categoryIdx].id},
          {hidden: !categories[categoryIdx].hidden}).then(response => {
        if (response.status_code == 200) {
          const updatedCategories = [...categories];
          updatedCategories[categoryIdx] = response.category;
          setCategories(updatedCategories);
          setTogglingVisibility(false)
        }
      });
    }
  }

  function updateCategory(attr, value) {
    admin_api.update_category(
        {category_id: categories[categoryIdx].id},
        {[attr]: value}).then(response => {
      if (response.status_code == 200) {
        const updatedCategories = [...categories];
        updatedCategories[categoryIdx] = response.category;
        setCategories(updatedCategories);
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
          <ModelInput
            commitCallback={newValue => updateCategory('name', newValue)}
            value={categories[categoryIdx]?.name}/>
        </h1>
        <TabSelector selected={adminTab}
          labels={adminTabs}
          onChange={e => setAdminTab(e.target.value)}/>
        <TabContainer selectedIdx={adminTab}>
          <div id={style['specs']}>
            <Section title='Description'>
              <ModelInput
                textArea={true}
                commitCallback={newValue => updateCategory('description', newValue)}
                value={categories[categoryIdx]?.description}/>
            </Section>
            <CategoryOptions categoryId={categories[categoryIdx]?.id}/>
          </div>
          <div id={style['products']}>
            <CategoryProducts categoryId={categories[categoryIdx]?.id}/>
          </div>
        </TabContainer>
      </div>
      <div>
      <div
            id={style['toggle-category-visibility']}
            className={togglingVisibility === false ? '' : style.togglingCategoryVisibility}>
          <b>
            The product is currently {categories[categoryIdx]?.hidden === false ? 'VISIBLE' : 'HIDDEN'}
          </b>
          <Button onClick={toogleCategoryVisibility}>
            Toggle the visibility
          </Button>
          <p>
            <i>
              Making the product visible will show it in the shop. This action is
              reversible but people will be able to navigate through the product
              category until they refresh the page. 
            </i>
          </p>
        </div>
        <hr className={style.asideHr}/>
        <div
            id={style['delete-category']}
            className={deletingCategory === false ? '' : style.deletingCategory}>
          <Button onClick={deleteCategory}>
            Delete this product type
          </Button>
          <p>
            <i>
              Deleting this product category will also delete any customization option
              and products associated with it.
            </i>
          </p>
        </div>
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
