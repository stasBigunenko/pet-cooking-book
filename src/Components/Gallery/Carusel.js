import React from 'react'
import Carousel from 'react-grid-carousel'

// Component with the- carousel component (photo gallery)
const Gallery = ({photos, id}) => {


    return (
                <Carousel
                    cols={1}
                    rows={1}
                    gap={5}
                    loop
                >
                    {photos.map(photo => (
                        <Carousel.Item key={photo} >
                            <div style={{display:"flex", justifyContent:"center", textAlign: "center"}}>
                            <img
                                width="40%"
                                src={require("../../Images/Carousel/"+id+"/"+photo)}
                                alt=""
                            />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>

    )
}
export default Gallery;

