import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NavLink } from "react-router-dom";


function BookGenres ({ genres, isLoading }) {
    
    const imageExists = (genre) => {
        try {
          require(`../images/${genre}.webp`);
          return true;
        } catch (error) {
          return false;
        }
    };

    const uniqueGenres = [...new Set(genres)];

    return (
        <div className="bookgenres">
            {!isLoading ? 
            <Swiper
                slidesPerView={'auto'}
                navigation={true}
                cssMode={true}
                modules={[Navigation]}
                spaceBetween={24}
                style={{ paddingLeft: '20px', paddingRight: '20px' }}
                className="bookgenres-swiper"
            >
                <div className="bookgenres-swiper-block-left"></div>
                <div className="bookgenres-swiper-block-right"></div>
                {uniqueGenres?.map(genre => {
                    return <SwiperSlide key={genre}>
                        <NavLink className="no-style-link" to={`/genres/${genre}`}>
                            <div key={genre} className="bookgenres-swiper-slide">
                                <p>{genre}</p>
                                {imageExists(genre) ?
                                    <img alt={genre} src={require(`../images/${genre}.webp`)} /> :
                                    <img alt="placeholder" src={require(`../images/Classics.webp`)} />}
                            </div>
                        </NavLink>
                    </SwiperSlide>
                })}
            </Swiper> : null }
        </div>

    )
}

export default BookGenres