import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import { Avatar, Typography, IconButton } from "@mui/material";
import {YQ_LOGO, CK_LOGO, AOW_LOGO, FK_LOGO, Olea_LOGO, BBM_LOGO, BBM_EVENT } from '../../utils/constant';

export default function RecipeReviewCard(props) {
  const { eventRows, month } = props;

  const sortedItems = eventRows ? [...eventRows].sort((a, b) => a.dayFrom - b.dayFrom) : [];
  // Filter items based on the criteria (e.g., if primary field contains "Brunch")
  const filteredItems = sortedItems?.filter(item => item?.month.includes(month));

  const [expanded, setExpanded] = React.useState(false);

  const getLogoUrl = (department) => {
    switch (department){
        case 'Youth Quake': return YQ_LOGO;
        case 'Faith Kids': return FK_LOGO;
        case 'Army of Woman': return AOW_LOGO;
        case 'Covenant Keepers': return CK_LOGO; 
        case 'Olea-Bond': return Olea_LOGO;
        default: return BBM_LOGO; 
    }
  }

  let dateString  = "";
  return (
    <Card>
    {filteredItems?.map((item) => {
        dateString = (item?.dayFrom) +' '+ ((item?.dayFrom === item?.dayTo) ? "   "  : " - " + (item?.dayTo)) +" "+item?.month+" "+ item?.region
        return (

            <Card sx={{ maxWidth: 330 }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: '#03989E' }} aria-label="recipe">
                        <Avatar height="194" src={getLogoUrl(item?.department)} />
                    </Avatar>}
                    // action={<IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    // </IconButton>}
                    title={item?.name} 
                    subheader={dateString}
                    // subheader={item?.dayFrom +" "+ (item?.dayFrom === item?.dayTo) ? "   "  : " - " + (item?.dayTo) +" "+item?.month+" "+ item?.year}    
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={BBM_EVENT}
                    alt="Paella dish" />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        {item?.department}
                    </Typography>
                </CardContent>
                {/* <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Description of the event:</Typography>
                        <Typography paragraph>
                            This is the event description
                        </Typography>
                    </CardContent>
                </Collapse> */}
            </Card>
        );
    })}
    </Card>
  );
}
