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
import OptionChoicesModal from './optionChoicesModal';


function useCategoryOptions(categoryId) {
  const [options, setOptions] = useState([]);

  function fetchOptions(){
    if (categoryId != undefined) {
      admin_api.get_category_options({category_id: categoryId}).then((response) => {
        if (response.status_code == 200) {
          setOptions(response.options);
        }
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
  const [focusedOption, setFocusedOption] = useState(null);

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
        {category_id: categoryId, option_id: id},
        {[attr]: value}).then(response => {
      if (response.status_code == 200) {
        fetchOptions()
      }
    });
  }

  function deleteOption(optionId) {
    admin_api.delete_category_option({category_id: categoryId, option_id: optionId})
      .then(response => {
        if (response.status_code == 200) {
          setOptions(response.options);
        }
      })
  }

  return(
    <Section title='Customization options'>
      <div></div>
      <OptionChoicesModal
        categoryId={categoryId}
        optionId={focusedOption?.id}
        exitCallback={() => setFocusedOption(null)}
        optionName={focusedOption?.name}/>
      <Button onClick={() => createOption()} textSizeClass='text-small'>
        Create customization option
      </Button>
      <ItemList useSeparator={true}>
        {options.map((option, i) => (
          <div key={i}>
            <span className={style.customizationOptionName}>
              <ModelInput
                value={option.name}
                commitCallback={newValue => updateOption(option.id, 'name', newValue)}/>
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
                commitCallback={newValue => updateOption(option.id, 'description', newValue)}/>
            </span>
            <p>
              
            </p>
            <Button onClick={() => setFocusedOption(option)}>
              See available choices for this customization option
            </Button>
          </div>
        ))}
      </ItemList>
    </Section>
  );
}
