import React from 'react';
import {useHistory} from 'react-router-dom';
// internal
import style from './style.module.css';
import {
  Button,
  Section,
  Subsection,
  PageLayout,
  TwoThirdsLayout,
  ItemList,
  CustomizationOptionDesc,
} from 'components';


/**
 * Home page root component
 * @component
 * @return {React.Component}
 */
export default function HomePage() {
  const history = useHistory();

  return <PageLayout headerBgColor={'var(--dark)'}
    footerBgColor={'var(--light)'}
    id={style.page}>
    <div></div>
    <h1>Online Bike Store</h1>
    <h2>Your local store now in the web</h2>
    <img id={style.hero}/>
    <div id={style['hero-link']}>
      <Button textSizeClass='text-large'
        filled={true}
        onClick={() => {
          history.push('/product');
        }}>
        See the latest bikes
      </Button>
    </div>
    <div className={style.spacer}/>
    <TwoThirdsLayout>
      <div>
        <ItemList>
          <CustomizationOptionDesc name='The same as if you came here'
            desc={`
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. 
              `}/>
          <CustomizationOptionDesc name='Catalogue updated on a daily basis'
            desc={`
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
              `}/>
        </ItemList>
      </div>
      <div id={style.aside}>
        <img/>
        <Section>
          <br/>
          <p>
            We are happy to announce an additional discount to celebrate the
            new page.
          </p>
          <br/>
          <Button onClick={() => {
            history.push('/product');
          }}>
            Have a look at the discounted bikes
          </Button>
        </Section>
      </div>
    </TwoThirdsLayout>
    <div className={style.spacer}/>
    <Section title='Freshly arrived at the wharehouse'>
      <p>
        The newest bikes of the season. The best trail, downhill and road bikes.
      </p>
      <div id={style['product-carrousel']}>
        <div>
          <img/>
          <Subsection title='Bike 1'>
            <p>
              We are happy to announce an additional discount to celebrate the
              new page.
            </p>
            <br/>
            <Button onClick={() => {
              history.push('/product');
            }}>
              Have a look at the discounted bikes
            </Button>
          </Subsection>
        </div>
        <div>
          <img/>
          <Subsection title='Bike 1'>
            <p>
              We are happy to announce an additional discount to celebrate the
              new page.
            </p>
            <br/>
            <Button onClick={() => {
              history.push('/product');
            }}>
              Have a look at the discounted bikes
            </Button>
          </Subsection>
        </div>
        <div>
          <img/>
          <Subsection title='Bike 1'>
            <p>
              We are happy to announce an additional discount to celebrate the
              new page.
            </p>
            <br/>
            <Button onClick={() => {
              history.push('/product');
            }}>
              Have a look at the discounted bikes
            </Button>
          </Subsection>
        </div>
        <div>
          <img/>
          <Subsection title='Bike 1'>
            <p>
              We are happy to announce an additional discount to celebrate the
              new page.
            </p>
            <br/>
            <Button onClick={() => {
              history.push('/product');
            }}>
              Have a look at the discounted bikes
            </Button>
          </Subsection>
        </div>
        <div>
          <img/>
          <Subsection title='Bike 1'>
            <p>
              We are happy to announce an additional discount to celebrate the
              new page.
            </p>
            <br/>
            <Button onClick={() => {
              history.push('/product');
            }}>
              Have a look at the discounted bikes
            </Button>
          </Subsection>
        </div>
      </div>
    </Section>
    <div className={style.spacer}/>
    <TwoThirdsLayout>
      <Section title='COVID-19 and the shop'>
        As you know COVID-19 is making the shipping process a bit more lengthy
        for locations autside of... ...lorem ipsum dummy text of the printing and 
        typesetting
        industry. Lorem Ipsum has been the industry standard dummy text
        ever since the 1500s, when an unknown printer took a galley of
        type and scrambled it to make a type specimen book.
      </Section>
    </TwoThirdsLayout>
    <div className={style.spacer}/>
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
