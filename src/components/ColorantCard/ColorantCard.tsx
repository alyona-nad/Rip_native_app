import { FC } from 'react'
import {  Card } from 'react-bootstrap'
import './ColorantCard.css'
interface Props {
    Name: string
    Image: string
    ID_Colorant: number
    Link:string
    Description:string
}



const MusicCard: FC<Props> = ({ Name, Image, ID_Colorant}) => (
    <Card className="containernew" style={{ width: '300px', height: '400px' }}>
        <div className='card'> 
      <a href={`/${ID_Colorant}`}>
            <img src={Image}  alt="{Name}" className="img-fluid"/>
            <h3>{ Name}</h3>
            </a>    
        </div>
    </Card>
)

export default MusicCard;