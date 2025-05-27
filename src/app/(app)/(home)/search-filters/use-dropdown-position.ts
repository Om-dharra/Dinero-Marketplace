import {RefObject} from 'react';



export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLButtonElement>
)=> {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const dropdownWidth=240; // Adjust this value based on your dropdown width
    const rect = ref.current.getBoundingClientRect();
    const top = rect.bottom + window.scrollY; // Position below the element
    let left = rect.left + window.scrollX; // Align with the left edge of the element
    if(left+dropdownWidth > window.innerWidth){
      left=rect.right - dropdownWidth + window.scrollX; // Adjust to fit within the viewport
    }
    if(left < 0){
      left = window.innerWidth-dropdownWidth-16; // Ensure left position is not negative
    }
    if(left<10){
      left=16;
    }
    
    return { top, left };
  }
  return getDropdownPosition;
}


