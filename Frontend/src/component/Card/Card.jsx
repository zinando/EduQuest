
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const CardList = () => {
  // Sample data for the cards
  const cards = [
    {
      title: 'Exam History',
      content: 'A history of all exams taken',
      actions: 'View List'
    },
    {
      title: 'Results',
      content: 'View result for subjects individually.',
      actions: 'View Result'
    },
    {
      title: 'Upcoming Exams',
      content: 'Check in',
      actions: 'Check Calendar'
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
            <Button size="small" color="primary">
              {card.actions}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
