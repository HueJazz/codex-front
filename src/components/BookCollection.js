import React from "react"
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import BookCollectionSkeleton from "./BookCollectionSkeleton";
import BookCollectionCard from "./BookCollectionCard";

function BookCollection ({ genre }) {

const { bookCollection, collectionLoading } = useSelector((state) => state.book)
const { library } = useSelector((state) => state.library)

  return (
    <div className="bookcollection">
      {!bookCollection[genre] || collectionLoading ? (
        <BookCollectionSkeleton />) : (
        <div className="bookcollection-container">
          <div className="bookcollection-container-header">
            <h1>Trending in {genre}</h1>
          </div>
          <Swiper
            slidesPerView={'auto'}
            navigation={true}
            modules={[Navigation]}
            spaceBetween={24}
            style={{ paddingLeft: '20px', paddingRight: '20px' }}
            className="bookcollection-container-swiper"
          >
            <div className="bookcollection-container-swiper-block-left"></div>
            <div className="bookcollection-container-swiper-block-right"></div>
            {bookCollection[genre].map((book) => (
              <SwiperSlide key={book._id}>
                <BookCollectionCard book={book} isSaved={library.books?.some(item => item._id === book._id)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default BookCollection