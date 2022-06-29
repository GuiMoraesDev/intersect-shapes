import React from "react";
import { useForm } from "react-hook-form";

import * as Styles from "./styles";
import { newZoneFormResolver, NewZoneFormSchemaProps } from "./validations";

interface NewZoneFormProps {
  name?: string;
  saveActiveZone: (values: NewZoneFormSchemaProps) => void;
  cancelActiveZone: () => void;
}

const NewZoneForm = ({
  name,
  saveActiveZone,
  cancelActiveZone,
}: NewZoneFormProps): JSX.Element => {
  const formMethods = useForm<NewZoneFormSchemaProps>({
    resolver: newZoneFormResolver,
    defaultValues: {
      name,
    },
  });

  return (
    <Styles.FormContainer onSubmit={formMethods.handleSubmit(saveActiveZone)}>
      <h3>Set your zone name</h3>

      <Styles.Label>
        New zone name
        <Styles.Input {...formMethods.register("name")} />
        {formMethods.formState.errors.name && (
          <Styles.ErrorMessage>
            {formMethods.formState.errors.name.message}
          </Styles.ErrorMessage>
        )}
      </Styles.Label>

      <Styles.ButtonsWrapper>
        <Styles.Button type="button" onClick={cancelActiveZone}>
          Cancel
        </Styles.Button>
        <Styles.Button type="submit">Save</Styles.Button>
      </Styles.ButtonsWrapper>
    </Styles.FormContainer>
  );
};

export default NewZoneForm;
