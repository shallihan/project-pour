import React, { useContext } from "react";
import  { useHistory } from 'react-router-dom';
import Input from "./Input";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";
import { VALIDATOR_REQUIRE } from "../util/Validators";
import { AuthenticationContext } from "../util/authentication-context";
import { useForm } from "../util/form-hook";
import { useHttpClient } from "../util/http-hook";

import "./Form.css";

const Form = (props) => {
  const authCtx = useContext(AuthenticationContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      coffee: {
        value: "",
        isValid: false,
      },
      region: {
        value: "",
        isValid: false,
      },
      roaster: {
        value: "",
        isValid: false,
      },
      process: {
        value: "",
        isValid: false,
      },
      roastDate: {
        value: "",
        isValid: false,
      },
      roastLevel: {
        value: "",
        isValid: false,
      },
      method: {
        value: "",
        isValid: false,
      },
      ratio: {
        value: "",
        isValid: false,
      },
      grindSize: {
        value: "",
        isValid: false,
      },
      temperature: {
        value: "",
        isValid: false,
      },
      notes: {
        value: "",
        isValid: false,
      },
      ranking: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const logSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/logs",
        "POST",
        JSON.stringify({
          coffee: formState.inputs.coffee.value,
          region: formState.inputs.region.value,
          roaster: formState.inputs.roaster.value,
          process: formState.inputs.process.value,
          roastDate: formState.inputs.roastDate.value,
          roastLevel: formState.inputs.roastLevel.value,
          method: formState.inputs.method.value,
          ratio: formState.inputs.ratio.value,
          grindSize: formState.inputs.grindSize.value,
          temperature: formState.inputs.temperature.value,
          notes: formState.inputs.notes.value,
          ranking: formState.inputs.ranking.value,
          uid: authCtx.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`/${authCtx.userId}/logbook`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    <form className="full-log__form" onSubmit={logSubmitHandler}>
      <div className="full-log__inputs-section section__coffee">
        <div className="full-log__inputs-details">
          {isLoading && <LoadingSpinner asOverlay /> }
          <Input
            element="input"
            id="coffee"
            type="text"
            placeholder="Varietal"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="region"
            type="text"
            placeholder="Region"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="roaster"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="Roaster"
            onInput={inputHandler}
          />
        </div>
        <div className="full-log__inputs-details">
          <Input
            element="input"
            id="process"
            type="text"
            placeholder="Process"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="roastDate"
            type="text"
            placeholder="Roasted"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="roastLevel"
            type="text"
            placeholder="Roast Level"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
      </div>
      <div className="full-log__inputs-section input-section__smaller-screens">
        <div className="full-log__inputs-details">
          <Input
            element="input"
            id="method"
            type="text"
            placeholder="Method"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="ratio"
            type="text"
            placeholder="Ratio"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="grindSize"
            type="text"
            placeholder="Grind Size"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="temperature"
            type="text"
            placeholder="Water Temperature &#176;C"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
        <div className="full-log__inputs-details">
          <label htmlFor="notes">Recipe Notes</label>
          <Input
            element="textarea"
            id="notes"
            validators={[]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="ranking"
            type="text"
            placeholder="Personal Ranking"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
      </div>
      <div className="full-log__form-buttons">
        <Button to={`/logbook/${authCtx.userId}`} className="full-log__cancel-button">
          CANCEL
        </Button>
        <Button type="submit" disabled={!formState.isValid}>
          SUBMIT
        </Button>
      </div>
    </form>
    </React.Fragment>
  );
};

export default Form;
