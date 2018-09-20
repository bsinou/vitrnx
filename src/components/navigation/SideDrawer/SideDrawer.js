import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css'
import BackDrop from '../../ui/Backdrop/Backdrop'
import AuxWrapper from '../../../hoc/AuxWrapper/AuxWrapper'

const sideDrawer = (props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <AuxWrapper>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <NavigationItems 
                        isAuth={props.isAuth} 
                        userRoles={props.userRoles}
                        navItems={props.navItems}
                    />
                </nav>
            </div>
        </AuxWrapper>
    );
};

export default sideDrawer;
