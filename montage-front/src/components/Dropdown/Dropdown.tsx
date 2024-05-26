import DropdownArrow from '../HeaderRMenu/DropdownArrow'; //you can use your icons
import React, { useEffect, useRef } from 'react';
import cx from 'classnames';

export interface IDropdownOption {
  label: string | number;
  labelValue: string | number;
}

interface IDropdownProps {
  name?: string;
  options: IDropdownOption[];
  required?: boolean;
  tabIndex?: number;
  className?: string;
  type?: string;
  placeHolder?: string;
  labelName?: string;
}

function Dropdown({
  labelName,
  name,
  options,
  placeHolder,
  type,
  required,
  className,
  tabIndex,
}: IDropdownProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<number | string>();
  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const onValueChange = (selectedValue: string | number) => {
    setSelectedItem(selectedValue);
    setIsFocused(false);
  };
  React.useEffect(() => {
    setIsFocused(false);
  }, [selectedItem]);

  const onClear = (e: any) => {
    e.stopPropagation();
    setSelectedItem(placeHolder);
    setIsFocused(false);
  };

  return (
    <div ref={wrapperRef} className="border-[#979797] relative">
      <div className="flex flex-row items-center">
        <span className="text-sm text-[#A4A4A4] mb-2">{labelName}</span>
        {required && (
          <span className="text-[20px] text-[#FF0000] ml-2 top-0 ">*</span>
        )}
      </div>
      <div
        tabIndex={tabIndex}
        className={cx(
          'w-full bg-white h-[41px] rounded-lg drop-shadow-input pl-3 focus:outline-0 focus:drop-shadow-none transition relative flex items-center',
          {
            'rounded-b-[0]': isFocused,
          },
          className
        )}
        onClick={() => setIsFocused(!isFocused)}>
        <span>{selectedItem ?? placeHolder}</span>
        {type === 'arrow-down' && (
          <div className="right-3 transform -translate-y-1/2 z-10 absolute top-5">
            {selectedItem && selectedItem !== placeHolder ? (
              <div onClick={(e) => onClear(e)}>Temizle</div>
            ) : (
              <DropdownArrow />
            )}
          </div>
        )}
      </div>
      {isFocused && (
        <ul className=" items-center gap-4 block absolute w-full">
          {options.map(({ label, labelValue }) => (
            <li
              onClick={() => onValueChange(labelValue)}
              className="rounded-sm shadow-[inset_1px_0px_0px_rgba(0,0,0,0.2) bg-white drop-shadow-input pl-3 focus:outline-0 focus:drop-shadow-none transition relative flex hover:bg-[#F7B500] ">
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

Dropdown.defaultProps = {
  name: '',
  type: '',
  className: '',
  placeHolder: '',
  required: false,
  tabIndex: 0,
  labelName: '',
};