import { ListItemsProps } from "../../models/generic.model";
import { v4 as uuidv4 } from "uuid";
import styles from "./ListItems.module.scss";
import { Col, Row } from "../grid";

export const ListItems: React.FC<ListItemsProps> = ({ list, label }) => (
  <Row>
    <Col sm={12} md={4}>
      <span className={styles.title}> {label}</span>:
    </Col>
    <Col sm={12} md={8}>
      {list.length &&
        list.map((item: any) => (
          <p key={uuidv4()} className={styles.item}>
            {item.name}
          </p>
        ))}
    </Col>
  </Row>
);
