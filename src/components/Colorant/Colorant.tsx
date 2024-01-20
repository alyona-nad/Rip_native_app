import { FC, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import { IColorant, colorants as defaultColorants } from "../../model.tsx"
/*interface Props {
  Name: string;
  Image: string;
  ID_Colorant: number;
  Description: string;
  Properties: string;
  onSubmit: () => void;
}
*/
const Colorants: FC<IColorant> = () => {
  const [colorant, setColorant] = useState<IColorant | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchColorant = async () => {
      try {
        const response = await fetch(`/api/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const colorantData: IColorant = await response.json();
        setColorant(colorantData);
      } catch (error) {
        console.error('Ошибка:', error);
        const defaultColorant = defaultColorants.find((item) => item.ID_Colorant === Number(id));
        if (defaultColorant) {
          setColorant(defaultColorant);
        } else {
          console.error('Цвет не найден в models.tsx');
        }
      }
    };

    if (id) {
      fetchColorant();
    }
  }, [id]);

  /*if (!colorant) {
    return <div></div>;
  }*/
if (colorant!=null) {
  return (
    
      <Card.Body>
        <div className="breadcrumbs">
        <Link to="/">Каталог</Link>/<Link to="/:id'">{colorant.Name}</Link>
      </div>
        <div className="container">
        <h2>{colorant.Name}</h2>
          <div className="image">
            <img src={colorant.Image} alt={colorant.Name} width="400"/>
            <h2>Описание</h2>
            <p>{colorant.Description}</p>
          </div>
          <div className="text">
            <h2>Свойства</h2>
            {colorant.Properties}
          </div>
        </div>
      </Card.Body>
    
  );}
};

export default Colorants;
