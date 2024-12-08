import MemberSelect from "@/components/biz/MemberSelect";
import FcDesigner from "@form-create/designer";

const components = [
  // 成员选择
  MemberSelect
];

export function registerComponents() {
  components.forEach(component => {
    FcDesigner.component(component.name, component);
    FcDesigner.formCreate.component(component.name, component);
  });
}
