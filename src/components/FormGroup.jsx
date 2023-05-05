import {
  useState,
  Children,
  cloneElement,
  forwardRef,
  useImperativeHandle,
} from "react";

export const FormGroup = forwardRef((props, ref) => {
  const { children = [], formFields } = props;

  const [form, setForm] = useState(formFields);
  const [camposVazios, setCamposVazios] = useState([]);

  // permite que a gente chame essa função a partir de outro componente
  useImperativeHandle(ref, () => {
    return {
      getForm: () => validar(),
    };
  });

  // verificar se há campos obrigatórios vazios, caso não haja retorna o form, senão retorna os campos vazios
  const validar = () => {
    return new Promise((resolve, reject) => {
      const vazios = children.filter(({ props }) => {
        return props.required && !form[props.nome];
      });
      if (vazios && vazios.length) {
        const nomes = vazios.map(({ props: { nome } }) => {
          return nome;
        });
        setCamposVazios(nomes);
        reject(nomes);
      }
      resolve(form);
    });
  };

  const atualizar = (e) => {
    const t = e.target;
    setForm({
      ...form,
      [t.name]: t.type === "checkbox" ? t.checked : t.value.trim(),
    });
    // adiciona a classe de campo vazio se for campo obrigatório
    t.required && !t.value.trim()
      ? t.classList.add("vazio")
      : t.classList.remove("vazio");
  };

  // função que renderiza cada campo do form
  function renderChildren() {
    return Children.map(children, (child) =>
      cloneElement(child, childProps(child))
    );
  }

  // função que retorna os props de cada campo do form
  const childProps = ({ props: { nome } }) => {
    const props = {
      mudarCampo: atualizar,
      className: camposVazios.find((c) => c === nome) ? "vazio" : "",
    };
    return props;
  };

  return <>{renderChildren()}</>;
});
FormGroup.displayName = "FormGroup";
