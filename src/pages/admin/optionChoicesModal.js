import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// internal
import style from './modal.module.css';
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


function useOptionChoices(categoryId, optionId) {
  const [choices, setChoices] = useState([]);

  function fetchChoices(){
    if (categoryId != undefined) {
      admin_api.get_category_option_choices({category_id: categoryId, option_id: optionId})
      .then((response) => {
        if (response.status_code == 200) {
          setChoices(response.choices);
        }
      });
    }
  }

  useEffect(() => {
    fetchChoices();
  }, [categoryId, optionId]);

  return [choices, setChoices, fetchChoices];
}


export default function CategoryOptions({
  categoryId,
  optionId,
  optionName='',
  exitCallback=null,
}){
  const [choices, setChoices, fetchChoices] = useOptionChoices(categoryId, optionId);
  
  function createChoice() {
    admin_api.create_option_choice({category_id: categoryId, option_id: optionId})
      .then(response => {
        if (response.status_code == 200) {
          setChoices(response.choices);
        }
      })
  }

  function updateChoice(choiceId, attr, value) {
    admin_api.update_option_choice({
      category_id: categoryId,
      option_id: optionId,
      choice_id: choiceId
    },{[attr]: value}).then(response => {
      if (response.status_code == 200) {
        fetchChoices();
      }
    })
  }

  function deleteChoice(choiceId) {
    admin_api.delete_option_choice({
        category_id: categoryId,
        option_id: optionId,
        choice_id: choiceId
      }).then(response => {
        if (response.status_code == 200) {
          setChoices(response.choices);
        }
      })
  }

  const choiceEntries = choices.map(choice => (
    <div key={choice.id} className={style.choice}>
      <div>
        <b>Name:</b>
        <ModelInput
          commitCallback={newValue => updateChoice(choice.id, 'name', newValue)}
          value={choice?.name}/>
        <b>Model reference:</b>
        <ModelInput
          commitCallback={newValue => updateChoice(choice.id, 'model_ref', newValue)}
          value={choice?.model_ref}/>
        <b>Description:</b>
        <ModelInput
          commitCallback={newValue => updateChoice(choice.id, 'description', newValue)}
          value={choice?.description}/>
        <b>Extra cost:</b>
        <ModelInput
          type='number'
          commitCallback={newValue => updateChoice(choice.id, 'extra_cost', newValue)}
          value={choice?.extra_cost}/>
        <b>Stock:</b>
        <ModelInput
          type='number'
          commitCallback={newValue => updateChoice(choice.id, 'stock', newValue)}
          value={choice?.stock}/>
      </div>
      <Button onClick={() => deleteChoice(choice.id)}>
        Remove choice
      </Button>
    </div>
  ));

  const display = {
    display: (categoryId == null || optionId == null) ? 'none' : 'initial'
  }

  return(
    <div className={style.modal} style={display}>
      <PageLayout
          headerBgColor='transparent'
          bodyBgColor='transparent'
          footerBgColor='transparent'>
        <div></div>
        <TwoThirdsLayout>
          <div className={style.modalContent}>
            <a className={style.closeLink} href='#' onClick={() => exitCallback?.()}>
            🡸 Return
            </a>
            <h2>Customization choices for: {optionName}</h2>
            <Button filled={true} onClick={createChoice}>
              Add customization choice
            </Button>
            <ItemList useSeparator={true} gapSizeClass='--space-medium'>
              {choiceEntries}
            </ItemList>
          </div>
        </TwoThirdsLayout>
      </PageLayout>
    </div>
  );
}