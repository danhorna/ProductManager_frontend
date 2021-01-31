import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import imgnotfound from '../../../images/imgnotfound.png';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
    },
    media: {
        height: 140,
    },
});

function InformationBox({ product }) {

    const classes = useStyles();

    function test() {
        console.log(product)
    }
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={imgnotfound}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Acá se puede agregar una descripcion al producto
              </Typography>
            </CardContent>
            <hr className="m-0"/>
            <CardActions>
                <p className="m-2">{product.code}</p>
                <span className="ml-auto">
                    <IconButton aria-label="settings" onClick={test}>
                        <SettingsIcon fontSize="small" />
                    </IconButton>
                </span>
            </CardActions>
        </Card>
    );
}

export default InformationBox;