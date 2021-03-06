import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// internal
import style from './product.module.css';
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
  Paginator,
} from 'components';
import {admin_api} from 'common/api';
import ChoiceLinesModal from './choiceLineModal';


function useProductChoices(categoryId, productId) {
  const [choices, setChoices] = useState({});

  function fetchChoices(){
    if (categoryId != undefined && productId != undefined) {
      admin_api.get_product_choices({category_id: categoryId, product_id: productId})
      .then((response) => {
        if (response.status_code == 200) {
          const choicesByType = {};
          response.choices.forEach(choice => {
            if (choicesByType?.[choice.type] == undefined) {
              choicesByType[choice.type] = [];
            }
            choicesByType[choice.type].push(choice);
          });
          setChoices(choicesByType);
        }
      });
    }
  }

  useEffect(() => {
    fetchChoices();
  }, [categoryId, productId]);

  return [choices, setChoices, fetchChoices];
}


export default function ProductCustomizationChoices({
  categoryId,
  productId,
}){
  const [choices, setChoices, fetchChoices] = useProductChoices(categoryId, productId);
  let [focusedOption, setFocusedOption] = useState(null);

  const customizationTypes = Object.keys(choices).map(choiceType => (
    <Subsection key={choiceType} title={choiceType}>
      <Button filled={true} onClick={() => setFocusedOption(choiceType)}>Change choices</Button>
      <ItemList stripped={true}>
        {choices[choiceType].map(choice => (
          <div key={choice.id} className={style.choice}>
            <span>
              <b>{choice.name}</b>
              <i> (model ref.: {choice.model_ref})</i>
              <br/>
              <i>{choice.manufacturer}</i>
            </span>
            <b>
              {choice.extra_cost}???
            </b>
          </div>
        ))}
      </ItemList>
    </Subsection>
  ));

  return (
  <ItemList useSeparator={true}>
    <ChoiceLinesModal
        categoryId={categoryId}
        productId={productId}
        optionId={choices?.[focusedOption]?.[0]?.type_id}
        optionName={focusedOption}
        exitCallback={() => setFocusedOption(null)}
        fetchCallback={() => fetchChoices()}
        currentLines={choices?.[focusedOption]}/>
    {customizationTypes}
  </ItemList>);
}