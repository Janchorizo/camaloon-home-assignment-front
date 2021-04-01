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

  return [options, setOptions, fetchOptions];
}

export default function CategoryOptions({
  categoryId,
}){
  const [options, setOptions, fetchOptions] = useCategoryOptions(categoryId);
  
  function createOption() {
    admin_api.create_category_option({category_id: categoryId})
      .then(response => {
        if (response.status_code == 200) {
          setOptions(response.options);
        }
      })
  }

  function updateOption(id, attr, value) {
    admin_api.update_category_option(
        {category_id: categories[categoryIdx].id},
        {option_id: id},
        {[attr]: value}).then(response => {
      if (response.status_code == 200) {
        const updatedCategories = [...categories];
        updatedCategories[categoryIdx] = response.category;
        setCategories(updatedCategories);
      }
    });
  }

  function deleteOption(optionId) {
    admin_api.delete_category_option({category_id: categoryId, option_id: optionId})
      .then(response => {
        console.log(response)
        if (response.status_code == 200) {
          setOptions(response.options);
        }
      })
  }

  return(
    <Section title='Customization options'>
      <ItemList useSeparator={true}>
        {options.map((option, i) => (
          <div key={i}>
            <span className={style.customizationOptionName}>
              <ModelInput
                value={option.name}
                commitCallback={newValue => updateOption('name', newValue)}
                commitCallback={newName => {admin_api.update_option({}, {name: newName})}}/>
              <button
                  onClick={() => deleteOption(option.id)}
                  className={style.optionDeleteButton}>
                Delete this option
              </button>
            </span>
            <br/>
            <i>Description:</i>
            <span className={style.customizationOptionDesc}>
              <ModelInput
                value={option.description}
                textArea={true}
                commitCallback={newName => {admin_api.update_option({}, {name: newName})}}/>
            </span>
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
        ))}
      </ItemList>
    </Section>
  );
}
/*
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
</Section>*/