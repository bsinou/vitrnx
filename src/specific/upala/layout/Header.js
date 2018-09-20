import React from 'react';

import classes  from './layout.css'

const header = () => (
    <header className={classes.Header}>
        <div className={classes.HeaderTitle}>Un pas après l'autre</div>
        <div className={classes.HeaderSubtitle}>Coaching en santé<br />Marie-Madeleine SINOU</div>
    </header>
);

export default header;
