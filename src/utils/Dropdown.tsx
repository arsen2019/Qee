import {Select} from "antd";
const {Option} = Select;

export const Dropdown = ({
                             label,
                             value,
                             options,
                             onChange,
                             useShortLabel = false,
                         }: {
    label: string;
    value: string;
    options: { value: any; label: string; shortLabel?: string; disabled?: boolean }[];
    onChange: (value: any) => void;
    useShortLabel?: boolean;
}) => (
    <div className="flex flex-col items-center w-full text-center z-10">
        <div className="text-[#033271] font-semibold text-sm mb-1">{label}</div>
        <Select
            size='large'
            value={value}
            onChange={onChange}
            className="w-full text-center"
            variant="borderless"
        >
            {options.map((opt) => (
                <Option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={opt.disabled ? 'text-gray-400' : ''}
                >
                    {useShortLabel && opt.shortLabel ? opt.shortLabel : opt.label}
                </Option>
            ))}
        </Select>
    </div>
);