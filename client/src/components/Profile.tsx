import useChessStore from '@/store/useChessStore';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import cover from '../assets/img/bg.jpg';
import { useNavigate } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate()
    const { user }: any = useChessStore((state) => state)

    return (
        <>
            {user && <div className="flex justify-center items-center h-screen w-screen">
                <Card bg='dark' className="flex justify-center items-center show-top" style={{ width: '28rem', height: '40rem' }}>
                    <Card.Img className="object-cover object-bottom" variant="top" src={cover} />
                    <div className="img-container">
                        <img src={user?.loggedInUser?.avatar} />
                    </div>
                    <Card.Body className="">
                        {/* <Card.Text>
                            <p> Name: {user?.loggedInUser?.userName}</p>
                        </Card.Text> */}
                    </Card.Body>


                    <Card.Body className="w-100 h-50 ">
                        <ListGroup className="mt-10 bg-amber-100">
                            <ListGroup.Item className="">Name  :   {user?.loggedInUser?.userName}</ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white">Match played:  5</ListGroup.Item>
                            <ListGroup.Item className="">Wins: 5</ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white">Loss:  0</ListGroup.Item>
                        </ListGroup>

                        <div className="mt-4 w-100 flex justify-center items-center">
                            <button className="button-50" onClick={() => navigate("/")}>Back</button>
                        </div>

                    </Card.Body>
                </Card>
            </div >}
        </>
    );
}

export default Profile;