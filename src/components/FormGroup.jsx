import {
  useState,
  Children,
  cloneElement,
  forwardRef,
  useImperativeHandle,
} from "react";

const FormGroup = forwardRef((props, ref) => {
  const { children, formFields } = props;

  const [form, setForm] = useState(formFields);

  useImperativeHandle(ref, () => {
    return {
      getForm: () => form,
    };
  });

  const atualizar = (e) => {
    const t = e.target;
    setForm({
      ...form,
      [t.name]: t.type === "checkbox" ? t.checked : t.value.trim(),
    });
  };

  const childProps = {
    mudarCampo: atualizar,
  };

  return (
    <div>
      <div>
        {children &&
          Children.map(children, (child) => cloneElement(child, childProps))}
      </div>
    </div>
  );
});

FormGroup.displayName = "FormGroup";

export default FormGroup;
