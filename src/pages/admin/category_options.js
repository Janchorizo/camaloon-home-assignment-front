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

export default function CategoryOptions({
  categoryId,
}){
  const [options, fetchOptions] = useCategoryOptions(categoryId);
  console.log(categoryId, options);

  return(
    <Section title='Customization options'>
      <ItemList useSeparator={true}>
        {options.map((option, i) => (
          <div key={i}>
            <span className={style.customizationOptionName}>
              <ModelInput
                value={option.name}
                commitCallback={newName => {admin_api.update_option({}, {name: newName})}}/>
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