import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import s from "./style.module.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { useState } from "react";
import { Logo } from "components/logo";
import { ValidatorService } from "services/form-validators";
import { FieldError } from "components/FieldError/FieldError";
import { Done } from "@material-ui/icons";

const VALIDATORS = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: (value) => {
    return ValidatorService.min(value, 3);
  },
};

export function NoteForm({
  isEditable = true,
  title,
  onClikEdit,
  onClickTrash,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState({ title: "", content: "" });
  const [formErrors, setFormErrors] = useState({
    title: "",
    content: "",
  });

  function hasError() {
    return Object.values(formErrors).some((error) => error !== undefined);
  }

  function validate(fieldName, fieldValue, done) {
    setFormErrors(
      {
        ...formErrors,
        [fieldName]: VALIDATORS[fieldName](fieldValue),
      },
      done
    );
  }

  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  }

  const actionIcons = (
    <>
      <div className="col-1">
        {onClikEdit && <PencilFill onClick={onClikEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickTrash && (
          <TrashFill onClick={onClickTrash} className={s.icon} />
        )}
      </div>
    </>
  );

  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Content</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="5"
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitButton = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisabled={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );
  return (
    <form className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>{titleInput}</div>
      <div className="mb-3">{contentInput}</div>
      {onSubmit && submitButton}
    </form>
  );
}