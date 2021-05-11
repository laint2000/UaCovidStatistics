import React, { useState } from 'react';

type TProp = {
    id?: string,
    label: string,
    handleCheckboxChange: (value: boolean) => void,
    className?: string,
};


export default function Checkbox(props: TProp) {
    const [checked, setChecked] = useState(false);

    const toggleCheckboxChange = () => {
        var newValue = !checked;
        setChecked(newValue);
        props.handleCheckboxChange(newValue);
    }

    return (
        <div className={props.className || "checkbox"}>
            <label>
                <input
                    type="checkbox"
                    value={props.label}
                    checked={checked}
                    onChange={toggleCheckboxChange}
                />

                {props.label}
            </label>
        </div>
    );
};