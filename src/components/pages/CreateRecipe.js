import React, { createRef, useState, useEffect } from 'react';
import { Button, Input, Select } from 'semantic-ui-react';
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

  const inputRefs = [];

  useEffect(() => {
    if (inputRefs[inputRefs.length - 1]) {
      inputRefs[inputRefs.length - 1].current.focus();
      console.log(inputRefs);
    }
  }, [inputRefs]); // eslint-disable-line react-hooks/exhaustive-deps

  const numerals = (number) => {
    if (number === 1) return 'st';
    if (number === 2) return 'nd';
    if (number === 3) return 'rd';
    else return 'th';
  };

  const addIngredientInput = () => {
    setIngredientInputs(ingredientInputs + 1);
  };

  const renderIngredientInput = () => {
    let inputs = [];
    for (let i = 0; i < ingredientInputs; i++) {
      inputRefs.push(createRef());
      inputs.push(
        <div key={i} style={{ padding: '2px 3px 2px 15px' }}>
          <Input
            type="text"
            placeholder="qt"
            style={{ width: '7ch' }}
            ref={inputRefs[inputRefs.length - 1]}
          />
          <Select
            compact
            options={options}
            defaultValue="un"
            style={{ backgroundColor: '#e0e1e2' }}
          />
          <Input placeholder="ingredient" style={{ paddingLeft: 6 }} />
        </div>
      );
    }
    return <div>{inputs}</div> || null;
  };

  const addStepsInput = () => {
    setStepInputs(stepInputs + 1);
  };

  const renderStepInput = () => {
    let inputs = [];
    for (let i = 0; i < stepInputs; i++) {
      inputRefs.push(createRef());
      inputs.push(
        <div key={i} style={{ padding: '2px 3px 2px 15px' }}>
          <Input
            placeholder={`${inputs.length + 1 + numerals(i + 1)} Step`}
            ref={inputRefs[inputRefs.length - 1]}
          />
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
            <Input label="title" style={{ paddingBottom: '6px' }} />

            {renderIngredientInput()}
            <Button
              type="button"
              onClick={addIngredientInput}
              className="ui button"
              style={{ margin: '6px 0 6px 0' }}
            >
              Add Ingredient
            </Button>

            {renderStepInput()}
            <Button
              type="button"
              onClick={addStepsInput}
              className="ui button"
              style={{ margin: '6px 0 6px 0' }}
            >
              Add Step
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateRecipe;
