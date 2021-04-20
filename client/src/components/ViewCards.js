import Card from './Card'
import { Container, Row, Col } from 'reactstrap';
const ViewCards = ({ cards,  payBill ,user, getUser}) => {
    return (
         <Container>
         <Row >
         {cards.map((card) => (
              <Col sx = '12' md = '6' lg='6' ><Card key={card.cardNumber} card={card}  payBill={payBill} user={user} getUser={getUser}/></Col>
           ))}
         </Row>
       </Container>
    )
}

export default ViewCards