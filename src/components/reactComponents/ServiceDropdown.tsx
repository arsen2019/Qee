import { Dropdown } from "antd";

const items = [
    { key: "1", label: <a href="/services/internal_audit/">Internal Audit</a> },
    { key: "2", label: <a href="/services/it_audit/">IT Audit</a> },
    { key: "3", label: <a href="/services/eqa_audit/">EQA</a> },
    { key: "4", label: <a href="/services/it_support/">IT Support</a> },
    { key: "4", label: <a href="/services/financial_management/">Financial Management</a> },
];

export default function ServiceDropdown() {
    return (
        <Dropdown placement={"bottom"} menu={{ items }} trigger={["hover"]} getPopupContainer={(triggerNode) => triggerNode.parentElement!}>
            <a className="cursor-pointer flex items-center gap-1 text-[#000] hover:text-[#003B71] transition">
                Services
            </a>
        </Dropdown>
    );
}
