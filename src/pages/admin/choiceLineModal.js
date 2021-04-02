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


export default function ProductChoiceLines({
  categoryId,
  optionId,
  productId,
  optionName='',
  currentLines=null,
  exitCallback=null,
  fetchCallback=null,
}){
  if (categoryId == null || optionId == null || productId == null){return ''}

  const [choices, setChoices, fetchChoices] = useOptionChoices(categoryId, optionId);
  const presentIds = currentLines?.map(d => d.choice_id);
  const linesByChoiceId = (currentLines == undefined || currentLines == null
    ? {}
    : Object.fromEntries(currentLines?.map(d => [d.choice_id, d])));
  
  function createChoice(choiceId) {
    admin_api.create_choice_line({
      category_id: categoryId,
      product_id: productId,
    },{customization_choice_id: choiceId}).then(response => {
      if (response.status_code == 200) {
        fetchCallback?.();
      }
    })
  }

  function deleteChoice(lineId) {
    admin_api.delete_choice_line({
        category_id: categoryId,
        product_id: productId,
        choice_id: lineId
      }).then(response => {
        if (response.status_code == 200) {
          fetchCallback?.();
        }
      })
  }

  const choiceEntries = choices.map(choice => (
    <div key={choice.id} className={style.choice}>
      <div>
        <b>Name: </b><i>{choice.name}</i>
        <b>Model ref.: </b><i>{choice.model_ref}</i>
        <b>Description: </b><i>{choice.description}</i>
        <b>Extra cost: </b><i>{choice.extra_cost}</i>
      </div>
      {presentIds.includes(choice.id) ? (
        <span>
          <p>
            This choice is already<br/>
            available for the product.
          </p>
          <Button onClick={() => deleteChoice(linesByChoiceId[choice.id].id)}>
            Remove choice
          </Button>
        </span>
      ): (
        <span>
          <p>
            This choice is not<br/>
            available for the product.
          </p>
          <Button onClick={() => createChoice(choice.id)}>
            Add choice
          </Button>
        </span>
      )
      }
    </div>
  ));

  return(
    <div className={style.modal}>
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
            <ItemList useSeparator={true} gapSizeClass='--space-medium'>
              {choiceEntries}
            </ItemList>
          </div>
        </TwoThirdsLayout>
      </PageLayout>
    </div>
  );
}