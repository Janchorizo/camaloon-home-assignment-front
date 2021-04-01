import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// internal
import style from './category_options.module.css';
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


function useCategoryOptions(categoryId) {
  const [options, setOptions] = useState([]);

  function fetchOptions(id){
    if (categoryId != undefined) {
      admin_api.get_category_options({category_id: id}).then((options) => {
        setOptions(options);
      });
    }
  }

  useEffect(() => {
    fetchOptions(categoryId);
  }, [categoryId]);

  return [options, fetchOptions];
}

export default function CategoryProducts(){

return <div>
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
}