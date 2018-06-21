import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';


const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '0 1 auto',
        width: '180px',
    },
    cover: {
        width: '180px',
        height: 140,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function MediaCard(props) {
    const { classes, media, onSelect } = props;

    return (
        <div style={{ marginBottom: '10px' }}>
            <Card className={classes.card} onClick={() => onSelect(media)}>
                <CardMedia
                    className={classes.cover}                    
                    image={"../imgRepo/" + media.thumb}
                    title={media.title}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="headline">{media.title}</Typography>
                        <Typography variant="subheading" color="textSecondary">{media.desc}</Typography>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}

export default withStyles(styles)(MediaCard);
