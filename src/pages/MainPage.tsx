import { FC, useState, useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import MusicCard from '../components/ColorantCard/ColorantCard.tsx'
import  InputField from '../components/InputField/InputField.tsx'
import { Link } from 'react-router-dom';
import {IColorant,colorants as Colorants} from "../model.tsx"

     // [] в конце указывает, что этот эффект сработает только при монтировании и демонтаже компонента
  
    
  
const MainPage: FC = () => {
    const [loading, setLoading] = useState(true)
    const [music, setMusic] = useState<IColorant[]>([])
    const [currentFilter, setCurrentFilter] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    } // Добавляем состояние для значения поиска

    /*const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFilter(e.target.value)
        };*/
        
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()}
        useEffect(() => {
            window.addEventListener('resize', handleResize);
        
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          }, []);
          const calculateCardsPerRow = () => {
            if (screenWidth < 576) {
              return 1;
            } else if (screenWidth < 768) {
              return 2;
            } else {
              return 4; // Измените на 4 или другое значение по вашему выбору
            }
          };
    useEffect(() => {
const fetchData = async () => {
    try {
      const url = currentFilter
        ? `/api/list_of_colorants?filterValue=${currentFilter}`
        : '/api/list_of_colorants';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
      setMusic(data.Colorants);
      
      setLoading(false);
    } catch (error) {
      console.error('Ошибка:', error);
      // Используем данные из models.tsx в случае ошибки
      setMusic(Colorants);
      setLoading(false);
    }
  };

  fetchData();
}, [currentFilter]);
    return (
        <div className="" style={{  width: '1220px'}}>
            <div className="breadcrumbs" style={{ marginLeft: 0 }}>
        <Link to="/">Каталог</Link>
      </div>
       {/*<div className="containernew">*/}
            
            <div className="filter" >
                <form action="/home" method="get" onSubmit={handleSubmit}>
                <InputField
                value={currentFilter}
                setValue={(value) => setCurrentFilter(value)}
                loading={loading}
            />
         
                    {/*<input type="submit" value="Применить" />*/}
                </form>
            </div>
            <div className="card">
            {/*<Container fluid>
  <Row xs={1} md={3} className="g-4">
    {music.map((item, index) => (
      <Col key={index} xs={12} md={6}>
        <MusicCard {...item} />
      </Col>
    ))}
  </Row>
</Container>*/}


<Container fluid>
    
  {Array.from({ length: Math.ceil(music.length / calculateCardsPerRow()) }).map((_, rowIndex) => (
    <Row key={rowIndex} className="g-4">
      {music.slice(rowIndex * calculateCardsPerRow(), (rowIndex + 1) * calculateCardsPerRow()).map((item, colIndex) => (
        <Col key={colIndex} xs={12} md={12 / calculateCardsPerRow()} className="d-flex align-items-center justify-content-center">
          <MusicCard {...item} />
        </Col>
      ))}
    </Row>
  ))}
</Container>
        </div> </div>/*</div>*/
    )
}


export default MainPage

