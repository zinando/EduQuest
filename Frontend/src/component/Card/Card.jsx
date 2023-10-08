import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CardList = () => {
  // Data for the cards
  const cards = [
    {
      title: 'Exam History',
      content: 'A history of all exams taken',
      actionText: 'View List',
      actionLink: '/examhistory', 
    },
  
    {
      title: 'Upcoming Exams',
      content: 'Check in',
      actionText: 'Check Calendar',
      actionLink: '/scheduler', 
    },
    {
      title: 'Ranking',
      content: 'Overall Position in class.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cards.map((card, index) => (
        <Card key={index} style={{ margin: '16px', minWidth: '250px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {card.content}
            </Typography>
          </CardContent>
          <CardActions>
            {card.actionText && card.actionLink ? (
              <Button size="small" color="primary" component={Link} to={card.actionLink}>
                {card.actionText}
              </Button>
            ) : (
              // Render an empty CardActions when no action is specified
              <div />
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
