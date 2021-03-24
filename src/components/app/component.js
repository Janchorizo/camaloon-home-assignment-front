import React, {useState} from 'react';
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
} from 'components';


/**
 * App root component
 * @component
 * @return {React.Component}
 */
export default function App() {
  const [selectedTab, setTab] = useState(0);
  const tabLabels = [
    'Product Type Characteristics',
    'Product Entries',
  ];

  return <PageLayout headerBgColor={'var(--dark)'}>
    <div>
      <h1 style={{color: 'var(--light)'}}>Camaloon home assignment</h1>
      <h2 style={{color: 'var(--light)'}}>Alejandro Rodríguez Díaz</h2>
    </div>
    <TwoThirdsLayout>
      <TwoThirdsLayout><span>hola</span></TwoThirdsLayout>
      <Section title='Description'>
        <span/>
        <Button>hola</Button>
        <Button textSizeClass='text-large' filled={true}>hola</Button>
        <Button textSizeClass='text-large'>hola</Button>
        <p>
              This is the product description that the owner would write to attract
              people to the said thing. This same description could apply to some other
              model of the same product, or a custom one. It is component agnostic and
              long enough to not make the page feel a bit empty.
        </p>
        <DoubleButton label1='Add factory model to chart'
          onClick1={() => {
            console.log('Added factory model');
          }}
          label2='Customize your own product'
          onClick2={() => {
            console.log('Customizing model');
          }}
          verticalLayout={true}
          textSizeClass='text-large'/>
      </Section>
      <Section title='Description'>
        <TabSelector selected={selectedTab}
          labels={tabLabels}
          onChange={(e) => setTab(e.target.value)}/>
        <TabContainer selectedIdx={selectedTab}>
          <Subsection title='Product type characteristics'>
            <p>
                roduct description that the owner would write to attract
                people to the said thing. This same description could apply to some other
                model of the same product, or a custom one.
            </p>
            <ItemList>
              <CustomizationOptionDesc name='Wheel size'
                desc={`
                    Small with fast response or large to better keep the momentum,
                    customize your bike with the wheel size that better fits your
                    needs (the extra cost includes the wheel price difference and
                    the cost of a larger frame and fork to accomodate the wheel).
                  `}/>
              <CustomizationOptionDesc name='Frame color'
                desc={`
                    We use the best painting proces possible, ensuring that
                    the finnish is perfect. With an extra aouter clear coat
                    we can achieve a 100% of surface coverage which will not
                    only look good, but protect the frame from rust.
                  `}/>
              <CustomizationOptionDesc name='Seat type'
                desc={`
                    Choose between our superior seats; go for a traditional
                    v-shaped seat or try the newest telescopic seat which allows
                    retracting it for better maneuverability.
                  `}/>
              <CustomizationOptionDesc name='Gears'
                desc={`
                    Go for the lightest bike and the easiest maintenance with a single
                    gear transmision, a more flexible single plate one, or a traditional
                    three-plate combination.
                  `}/>
            </ItemList>
          </Subsection>
          <Subsection title='Product entries'>
            <p>
                roduct description that the owner would write to attract
                people to the said thing. This same description could apply to some other
                model of the same product, or a custom one.
            </p>
            <DoubleButton label1='Add factory model to chart'
              onClick1={() => {
                console.log('Added factory model');
              }}
              label2='Customize your own product'
              onClick2={() => {
                console.log('Customizing model');
              }}/>
          </Subsection>
        </TabContainer>
      </Section>
      <Section>
        <p>
              This is the product description that the owner would write to attract
              people to the said thing. This same description could apply to some other
              model of the same product, or a custom one. It is component agnostic and
              long enough to not make the page feel a bit empty.
        </p>
        <DoubleButton label1='Add a value'
          onClick1={() => {
            console.log('Added factory model');
          }}
          label2='List the existing choices'
          onClick1={() => {
            console.log('Customizing model');
          }}/>
      </Section>
      <Subsection title='Description'>


      </Subsection>
      <Section title='The product'>
        <ItemList useSeparator={true} stripped={true} gapSizeClass='--space-medium'>
          <p>
              This is the product description that the owner would write to attract
              people to the said thing. This same description could apply to some other
              model of the same product, or a custom one. It is component agnostic and
              long enough to not make the page feel a bit empty.
          </p>
          <ol>
            <li>One characteristic</li>
            <li>Another characteristic</li>
            <li>Such characteristic</li>
          </ol>
          <DoubleButton label1='Add factory model to chart'
            onClick1={() => {
              console.log('Added factory model');
            }}
            label2='Customize your own product'
            onClick2={() => {
              console.log('Customizing model');
            }}
            verticalLayout={true}
            textSizeClass='text-large'/>
        </ItemList>
      </Section>
    </TwoThirdsLayout>
    <span>
        Contact me at: <a href='mailto:jancho@usal.es'>jancho@usal.es</a>
    </span>
  </PageLayout>;
}
