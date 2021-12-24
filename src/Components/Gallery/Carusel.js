import React from 'react'
import Carousel from 'react-grid-carousel'

const Gallery = ({photos, id}) => {
    return (
                <Carousel cols={1} rows={1} gap={5} loop>
                    {photos.map(photo => (
                        <Carousel.Item key={photo}>
                            <img width="100%" src={require("../../Images/Carousel/"+id+"/"+photo)} alt="" />
                        </Carousel.Item>
                    ))}
                </Carousel>

    )
}
export default Gallery;

