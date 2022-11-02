import { Row, Col } from "react-bootstrap";
import { ListItemsProps } from "../../models/generic.model";
import { v4 as uuidv4 } from "uuid";
import "./ListItems.scss";

const ListItems: React.FC<ListItemsProps> = (props) => {
  return (
    <Row>
      <Col sm="12" md="4">
        <span className="list-item__title"> {props.label}</span>:
      </Col>
      <Col sm="12" md="8">
        {!!props.list &&
          props.list.map((item: any) => (
            <span key={uuidv4()} className="list-item__item">
              {item.name}
            </span>
          ))}
      </Col>
    </Row>
  );
};

export default ListItems;
