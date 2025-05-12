/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function SplitButton({
  options,
  onMenuClick,
  onSubmit,
  disabled,
  loading,
  reset,
  startIcon: StartIcon,
  text,
}) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (onMenuClick) onMenuClick(index);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [reset]);

  return (
    <>
      <ButtonGroup
        disabled={disabled}
        variant="contained"
        color="primary"
        ref={anchorRef}
      >
        <Button
          onClick={() => onSubmit(selectedIndex)}
          startIcon={
            loading ? (
              <CircularProgress color="secondary" size={20} />
            ) : StartIcon ? (
              <StartIcon />
            ) : null
          }
        >
          {text || ''}
          &nbsp;
          {options[selectedIndex].label}
        </Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.value}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
