import { Dispatch, SetStateAction, ChangeEventHandler } from "react";

interface SearchBarProps {
    setCustomerModalOpen: Dispatch<SetStateAction<boolean>>;
    handleChange: ChangeEventHandler<HTMLInputElement>;
  }
  
  export const SearchBar = ({ setCustomerModalOpen, handleChange }: SearchBarProps) => {
  
    return (<>
      <div className="search-form   flex items-center space-x-4  mx-auto w-full
    transform duration-500 transition-all">
        <div className="flex bg-gray-100 rounded-lg my-2 mx-2 pl-4 p-2 w-full space-x-2  items-center">
          <div onClick={() => setCustomerModalOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </div>
  
          <input
            className="w-full py-2 px-2 bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
            type="text" placeholder="Search for customer..."
            defaultValue=""
            onChange={handleChange} />
  
        </div>
  
      </div>
    </>)
  }