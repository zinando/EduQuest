import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {Row, Col, Container} from 'react-bootstrap';
import icons from '../../assets/large logo.png'
import queryBackEnd, { userInfo, isObjectEmpty } from '../../pages/queryBackEnd';

const CardList = ({cardItems={}}) => {
  // Data for the cards
  const cardItem =
    {
      title: 'First Term Examination',
      class: 'SS 3',
      classCount: 48,
      passed: 42,
      failed: 6,
    };



  return (
    <>
        <Container >
            <Row>
                <Col sm={12} >
                    <Card style={{maxHeight: "140px"}}>
                        <img src={icons} style={{maxHeight: "140px"}} />
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center" style={{margin: "2px 0px 3px 0px"}}>
            <Col sm={4}>
                <Card className="text-center" style={{backgroundColor: "#0b88b3",
                    color: "#ffffff", paddingTop: "5px", fontWeight: "bolder"}}>
                    <Typography variant="h5" gutterBottom style={{fontWeight: "bolder"}}>
                      CLASS RESULT
                    </Typography>
                </Card>
            </Col>
        </Row>
            {!isObjectEmpty(cardItems) && (
            <Row>
                <Col sm={12}>
                    <Card className="">
                        <Row style={{padding: "5px"}}>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={2}>
                                        <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                                          Title:
                                        </Typography>
                                    </Col>
                                    <Col sm={10}>
                                        <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                                          {cardItems.title}
                                        </Typography>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={3}>
                            </Col>
                            <Col sm={3}>
                                <Row>
                                    <Col sm={5}>
                                        <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                                          Class:
                                        </Typography>
                                    </Col>
                                    <Col sm={7}>
                                        <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                                          {cardItems.class_name}
                                        </Typography>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{padding: "5px"}}>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={5}>
                                        <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                                          Population:
                                        </Typography>
                                    </Col>
                                    <Col sm={7}>
                                        <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                                          {cardItems.class_count}
                                        </Typography>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={6}>
                                        <Row>
                                            <Col sm={5}>
                                                <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                                                  Passed:
                                                </Typography>
                                            </Col>
                                            <Col sm={7}>
                                                <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                                                  {cardItems.passed}
                                                </Typography>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <Row>
                                            <Col sm={5}>
                                                <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                                                  Failed:
                                                </Typography>
                                            </Col>
                                            <Col sm={7}>
                                                <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                                                  {cardItems.failed}
                                                </Typography>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            )}
        </Container>
    </>
  );
};

export default CardList;
