import {
  createElement,
  type Component,
  type ComponentAttr,
} from "#core/framework";
import { form_default } from "./style";

const Form = (
  props: {
    attr?: ComponentAttr;
  },
  ...inputs: Component[]
) => {
  let { attr } = props;
  const default_attr = { class: form_default, enctype: "multipart/formdata" };
  attr = { ...default_attr, ...attr, onSubmit: (e) => { e.preventDefault(); } };

  return createElement("form", attr, ...inputs);
};

export default Form;
