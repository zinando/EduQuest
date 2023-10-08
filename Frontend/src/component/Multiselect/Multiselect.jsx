/// import Dropdown from './dropdown.png' // import your dropdown image from material icons! ;)

export default function MultiSelectDropdown ({ options, selected, toggleOption, title }) {

    return (
        <>
        <div className="c-multi-select-dropdown">
            <div className="c-multi-select-dropdown__selected">
                <div>{selected.length} selected</div>

            </div>
            <ul className="c-multi-select-dropdown__options">
                {options.map(option => {
                    const isSelected = selected.includes(option.id);

                    return (
                        <li className="c-multi-select-dropdown__option" onClick={() => toggleOption({ id: option.id })}>
                            <input type="checkbox" checked={isSelected} className="c-multi-select-dropdown__option-checkbox"></input>
                            <span>{option[title]}</span>
                        </li>
                    )
                })}
            </ul>
            </div>
        </>
    )
}
