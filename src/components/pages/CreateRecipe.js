import React, { useState } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';

const options = [
  { key: 'un', text: 'un', value: 'un' },
  { key: 'g', text: 'g', value: 'g' },
  { key: 'Kg', text: 'Kg', value: 'Kg' },
  { key: 'ml', text: 'ml', value: 'ml' },
  { key: 'L', text: 'L', value: 'L' },
  { key: 'tbsp', text: 'tbsp', value: 'tbsp' },
  { key: 'tsp', text: 'tsp', value: 'tsp' },
  { key: 'cup', text: 'cup', value: 'cup' },
  { key: 'oz', text: 'oz', value: 'oz' },
  { key: 'gallon', text: 'gallon', value: 'gallon' },
];

const CreateRecipe = () => {
  const [ingredientInputs, setIngredientInputs] = useState(0);
  const [stepInputs, setStepInputs] = useState(0);

  const addIngredientInput = () => {
    setIngredientInputs(ingredientInputs + 1);
  };

  const renderIngredientInput = () => {
    let inputs = [];
    for (let i = 0; i < ingredientInputs; i++) {
      inputs.push(
        <div key={i} style={{ padding: '3px' }}>
          <Input
            label={<Dropdown defaultValue="un" options={options} />}
            labelPosition="right"
            placeholder="qt"
            style={{ width: '7ch' }}
          />
          <input style={{width: '55px'}}/>
          <Input placeholder="ingredient" style={{paddingLeft: 10}}/>
        </div>
      );
    }

    return <div>{inputs}</div> || null;
  };

  return (
    <>
      <h1>New recipe</h1>
      <Formik>
        {(formikProps) => (
          <Form>
            <Input label="title" />
          </Form>
        )}
      </Formik>
      {renderIngredientInput()}
      <Button onClick={addIngredientInput} className="ui button">
        Add Ingredient
      </Button>
    </>
  );
};

export default CreateRecipe;
