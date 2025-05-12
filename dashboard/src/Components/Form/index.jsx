import React from 'react';

const Form = React.forwardRef(
  (
    {
      children,
      className,
      style,
      action,
      method,
      autoComplete = 'nope',
      onSubmit,
      id,
    },
    ref
  ) => {
    function handleSubmit(event) {
      event.preventDefault();
      if (onSubmit) onSubmit();
    }

    return (
      <form
        className={`form ${className || ''}`}
        method={method}
        id={id}
        action={action}
        style={style}
        onSubmit={handleSubmit}
        ref={ref}
        autoComplete={autoComplete}
        noValidate
      >
        {children}
      </form>
    );
  }
);

export default Form;
