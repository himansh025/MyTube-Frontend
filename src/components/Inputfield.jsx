import React from 'react';

function Inputfield({
  label, 
  register, 
  required, 
  onChange, 
  type, 
  placeholder = "", 
  name, 
  width, 
  className = "", 
  check, // If check is needed, don't pass it directly to the input element
  ...props
}) {
  return (
    <div className='w-full text-white flex flex-wrap'>
      {label && (
        <div>
          <label className='p-2 flex items-center justify-center font-bold sm:text-xl'>
            {label}
          </label>
        </div>
      )}
      <div className={`flex justify-center ${label ? "w-[90%]" : "w-full"}`}>
        <input
          {...props} // Spread other props if necessary
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          name={name}
          className={`w-[90%] sm:w-[90%] p-2 bg-white text-black font-semibold rounded-lg ${className}`}
          {...register(name, { required })}
        />
        {/* If you want to conditionally handle 'check', use it here, but not as a direct HTML attribute */}
      </div>
    </div>
  );
}

export default Inputfield;
